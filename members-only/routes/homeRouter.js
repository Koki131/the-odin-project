const Router = require("express");
const { home, showRegister, register, showLogin, submitPuzzle, logout, showArticleForm, saveArticle } = require("../controllers/homeController");
const passport = require("passport");

const homeRouter = Router();


homeRouter.get("/", home);
homeRouter.get("/login", showLogin)
homeRouter.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
);
homeRouter.get("/register", showRegister);
homeRouter.post("/register", register);
homeRouter.post("/submitPuzzle", submitPuzzle);
homeRouter.get("/articleForm", showArticleForm);
homeRouter.post("/saveArticle", saveArticle);
homeRouter.post("/logout", logout);

module.exports = homeRouter;