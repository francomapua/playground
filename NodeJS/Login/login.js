/*
  MODULES
*/
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const User = require("./lib/models/User");
const Webpage = require('./lib/models/Webpage');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}))

/*
    --- ROUTES
*/
const indexHTML = new Webpage('./static/index.html');
const redirectHTML = new Webpage('./static/redirect.html');
const mainpageHTML = new Webpage('./static/mainpage.html');

app.get('/', (req, res, next) => {
    var webpage = indexHTML;
    var parseObj = {}

    if (req.session.user) {
        webpage = mainpageHTML;
        parseObj = req.session.user
    }

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(webpage.loadHTML(parseObj));
});
app.post('/login', (request, response, next, body = request.body) => {
    console.log("POST :/login");
    let username = body.username;
    let password = body.password;
    var user = new User(username, password);
    user.login((err, res) => {
        if (err) {
            reportError(err, res);
        } else {

            var webpage = indexHTML;
            var parseObj = {
                error: "Invalid Login"
            }

            if (user.firstname) {
                webpage = redirectHTML;
                parseObj = {
                    path: "mainpage"
                };
                request.session.user = user;
            }

            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end(webpage.loadHTML(parseObj));
        }
    })
});
app.get('/logout', (req, res, next) => {
    req.session.destroy(function (err) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(redirectHTML.loadHTML({
            path: "/"
        }));
    })
});
app.get('/mainpage', (req, res, next) => {
    var webpage = indexHTML;
    var parseObj = {
        error: "Invalid Login"
    }

    if (req.session.user) {
        webpage = mainpageHTML;
        parseObj = req.session.user
    }

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(webpage.loadHTML(parseObj));
});


app.use(express.static("./static"));
app.listen(3000, () => console.log(`Server is lisenting on 3000`));

function reportError(err, res) {
    res.writeHead(500, {
        'Content-Type': 'text/html'
    });
    res.end(err);
}