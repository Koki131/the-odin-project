const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { findUserById, findUserByUsername, registerUser, saveFile } = require("../prisma/queries");
const path = require('path');
const { randomFillSync } = require('crypto');
const os = require("os");
const fs = require("fs");
const busboy = require("busboy");



let uploadDir = "/home/koki/Downloads/Uploads/";

const savePath = async (req, res) => {
    await saveFile(req.body, res.locals.currentUser);
    res.status(200).json({ success: true });
};

const uploadFolder = async (req, res) => {
    const bb = busboy({
        headers: req.headers
    });
    

    bb.on("field", (name, value) => {
        if (name === "relative_path") {
            uploadDir = `/home/koki/Downloads/Uploads/${res.locals.currentUser.id}/` + value;  
        }
    });
    
    bb.on("file", (fieldname, file, info) => {
        
        
        const { filename } = info;
        const p = uploadDir;

        uploadDir = path.join(uploadDir, filename);
    
        fs.mkdirSync(path.dirname(uploadDir), { recursive: true });

        const writeStream = fs.createWriteStream(uploadDir);
        file.pipe(writeStream);

        file.on("error", (err) => {
            console.error("File stream error:", err);
            file.resume();
        });

        file.on("end", () => {
            console.log(`Finished processing file: ${filename}`);
        });

        writeStream.on("error", (err) => {
            console.error("Write stream error:", err);
        });

        writeStream.on("finish", async () => {
            console.log("Saved file:", filename);
        });
    });

    bb.on("close", () => {
        console.log("Upload complete.");
        res.status(200).json({ success: true });
    });

    req.pipe(bb);
};
// const uploadFile = [upload.single('file_upload'), async (req, res) => {

// }];


const validateRegister = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username cannot be empty")
        .isLength({max: 15}).withMessage("Username must contain at most 15 characters"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password cannot be empty")
];


const home = (req, res) => {

    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    
    return res.render("home");
};


const showLogin = (req, res) => {
    
    const errors = [];

    req.session.flash.forEach((message) => {
        errors.push({msg: message["message"]});
    })
    
    return res.render("login", {errors: errors});
};

const showRegister = (req, res) => {

    return res.render("register", {errors: []});
};

const register = [validateRegister, async (req, res) => {

    
    const errors = validationResult(req);
    const errorsArray = errors.array();
    
    if (req.body.password !== req.body.matchingPassword) errorsArray.push({msg: "Passwords must match"});

    const rows = await findUserByUsername(req.body.username);

    if (rows && rows.length > 0) {
        errorsArray.push({msg: "Username already exists"});    
    }

    if (errorsArray.length > 0) {
      return res.status(400).render("register", {
        title: "Register",
        errors: errorsArray
      });
    }
    

    const password = await bcrypt.hash(req.body.password, 10);
    await registerUser({username: req.body.username, password: password});

    return res.redirect("/");

}];

const logout = (req, res) => {

    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        })
    })
    

};

module.exports = {
    home,
    register,
    showLogin,
    showRegister,
    logout,
    uploadFolder,
    savePath
}