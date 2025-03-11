const Router = require("express");
const { home, showRegister, register, showLogin, logout, uploadFolder, savePath } = require("../controllers/homeController");
const passport = require("passport");
const bodyParser = require("body-parser");

const homeRouter = Router();

homeRouter.use(bodyParser.json());
homeRouter.use(bodyParser.urlencoded({ extended: true }));


homeRouter.get("/", home);
homeRouter.get("/login", showLogin)
homeRouter.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
      failureFlash: true
    })
);
homeRouter.get("/register", showRegister);
homeRouter.post("/register", register);
homeRouter.post("/logout", logout);
homeRouter.post("/savePath", savePath);
homeRouter.post("/uploadFolder", uploadFolder);

module.exports = homeRouter;