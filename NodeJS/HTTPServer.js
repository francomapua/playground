const http = require('http');
const port = 3000;


/* Basic HTTPServer using NodeJS Standard Libraries */
function startHttpServer(){
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
function startExpressServer(){
  var word = "hahahaha!";
  
  app.get('/', (req, res) => {
    res.send('Hello World! ' + word);
  });

  app.listen(3000, () => console.log(`Server is lisenting on ${port}`));
}

startExpressServer();