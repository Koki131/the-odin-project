const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const { log } = require("console");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const messages = [];

messages.push({name: "John", text: "Hello, everyone!", time: new Date()});
messages.push({name: "Kaitlyn", text: "Hello back!", time: new Date()});
messages.push({name: "Trevor", text: "Hi, guys!", time: new Date()});

app.get("/new", (req, res) => {
    res.render('messageForm', {message: {name: "", text: "", error: ""}});
});

app.get("/(:pageNum)?", (req, res) => {
  
    try {

        const messagesToDisplay = [];
        let pageCount = Math.ceil(messages.length / 10);
    
        let num = Number(req.params.pageNum);
        let pageNum = (isNaN(num) || num < 1 || num > Number(pageCount)) ? 1 : num;
        
        
        let i = (pageNum - 1) * 10;

        let from = pageNum == 1 ? messages.length - 1 : (messages.length - i) - 1;
        let to = from - 10 < 0 ? 0 : pageNum == 1 ? messages.length - 10 : from - 9;

        
        
        while (from >= to) {
            messagesToDisplay.push(messages[from--]);
        }

        res.render('index', {messages: messagesToDisplay, pageNum: pageNum, pageCount: Number(pageCount)});

    } catch (err) {
        res.status(500).send("Internal Server Error" + err);
    }

});



app.post("/saveMessage", (req, res) => {

    const body = req.body;
    if (body.name.trim() === "" && body.text.trim() === "") {
        res.render('messageForm', {message: {name: "", text: "", error: "both"}});
    } else if (body.name.trim() === "") {
        res.render('messageForm', {message: {name: "", text: body.text, error: "name"}})
    } else if (body.text.trim() === "") {
        res.render('messageForm', {message: {name: body.name, text: "", error: "text"}});
    } else {
        messages.push({name: req.body.name, text: req.body.text, time: new Date()});
        
        res.redirect("/");
    }
    
});

app.listen("3000", () => {
    console.log("App running on http://127.0.0.1:3000");
})