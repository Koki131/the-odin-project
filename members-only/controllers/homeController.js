
const Article = require("../model/Article");
const User = require("../model/User");
const db = require("../util/queries")
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

require("dotenv").config();


const validateRegister = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username cannot be empty")
        .isLength({max: 15}).withMessage("Username must contain at most 15 characters"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password cannot be empty")
];


const home = async (req, res) => {

    let pageNum = req.query.pageNum;
    let offset = 0;

    if (!pageNum) {
        pageNum = 1;
    }
    offset = (Number.parseFloat(pageNum) - 1) * 10;
    if (offset < 0) offset = 0;

    if (!req.isAuthenticated()) return res.status(401).redirect("/login");
    const currRole = res.locals.currentUser.role;

    let articles = null;
    if (req.isAuthenticated() && currRole === "member") {
        articles = await db.getArticlesWithUser(offset);
        return res.render("members", {len: articles.length, pageNum: pageNum, articles: articles});    
    }
    articles = await db.getArticles(offset);
    return res.render("index", {len: articles.length, pageNum: pageNum, articles: articles});


};

const showLogin = (req, res) => {

    return res.render("login", {errors: []});
};

const showRegister = (req, res) => {

    return res.render("register", {errors: []});
};

const register = [validateRegister, async (req, res) => {

    
    const errors = validationResult(req);
    const errorsArray = errors.array();
    
    if (req.body.password !== req.body.matchingPassword) errorsArray.push({msg: "Passwords must match"});

    const rows = await db.userExists(req.body.username);

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
    req.session.user = new User(req.body.username, password, "regular");
    req.session.tries = 3;


    return res.render("puzzle", {user: req.session.user, tries: req.session.tries});

}];

const submitPuzzle = async (req, res) => {

    const user = req.session.user;
    const sol = req.body.puzzle.trim().toLowerCase();
    
    user.role = "member";
    const comp = await bcrypt.compare(sol, process.env["puzzle.solution"]);
    
    if (!comp) {
        req.session.tries--;
        
        if (req.session.tries <= 0) {
            delete req.session.tries;
            user.role = "regular";
        } else {
            return res.render("puzzle", {user: user, tries: req.session.tries});
        }  
    }
    
    await db.registerUser(user);

    delete req.session.user;

    return res.redirect("/");

};

const showArticleForm = (req, res) => {
    
    if (!req.isAuthenticated()) return res.status(401).redirect("/login");

    return res.render("articleForm", {user: res.locals.currentUser});

};

const saveArticle = async (req, res) => {
    
    if (!req.isAuthenticated()) return res.status(401).redirect("/login");

    const userId = res.locals.currentUser.id;
    const article = new Article(req.body.post, new Date(), userId);

    await db.saveArticle(article);

    return res.redirect("/");

};

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
    showRegister,
    register,
    showLogin,
    submitPuzzle,
    logout,
    showArticleForm,
    saveArticle
};