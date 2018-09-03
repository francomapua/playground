const http = require('http');
const port = 3000;


/* Basic HTTPServer using NodeJS Standard Libraries */
function startHttpServer() {
  const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Hello Node.js Server!')
  }
  const server = http.createServer(requestHandler)
  server.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
  })
}

const express = require('express');
const app = express();

// TODO: Resouce
// https://blog.risingstack.com/your-first-node-js-http-server/
// https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
function startExpressServer() {
  var word = "hahahaha!";

  app.get('/', (req, res) => {
    res.send('Hello World! ' + word);
  });

  // Get URL Request Parameters
  app.get('/api/users', function (req, res) {
    var user_id = req.param('id');
    var token = req.param('token');
    var geo = req.param('geo');

    res.send(user_id + ' ' + token + ' ' + geo);
  });

  // Get Post Parameters
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.post('/api/users', function (req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
  });

  // Serve a static Folder 
  app.use(express.static("./public"));

  app.listen(3000, () => console.log(`Server is lisenting on ${port}`));
}


startExpressServer();