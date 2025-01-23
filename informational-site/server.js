const {createServer} = require("node:http");
const url = require("url");
const fs = require("fs");

const hostName = "127.0.0.1";
const port = 3000;


const server = createServer((req, res) => {

    const q = url.parse(req.url, true);
    const pathName = q.pathname;
    const fileName = `.${pathName === "/" ? "/index" : pathName}.html`;

    fs.readFile(fileName, (err, data) => {
        
        if (err || pathName === "/index") {
            res.writeHead(404, {"Content-Type": "text/html"});
            fs.readFile("./404.html", (err1, data1) => {
                res.write(data1);
                return res.end();
            });
            return;
        }
        if (pathName === "/" || pathName === "/about" || pathName === "/contact-me") {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        }


    });

});

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
})