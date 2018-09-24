const http = require('http');
const port = 3000;


const express = require('express');
const cors = require('cors')
const app = express();

function startExpressServer() {
  var word = "hahahaha!";

  app.get('/', (req, res) => {
    res.send('Hello World! ' + word);
  });

  app.use(cors({origin: '*',optionsSuccessStatus: 200}))
  // Serve a static Folder no
  app.use(express.static("./static"));
  
  

  app.listen(3000, () => console.log(`Server is lisenting on ${port}`));
}


startExpressServer();