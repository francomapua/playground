const fs = require("fs");
const swig = require("swig");

function Webpage(filePath){
    this.filePath = filePath;
}

Webpage.prototype.loadHTML = function(object){
    var template = swig.compile(fs.readFileSync(filePath, 'utf-8'));
    return template(object);
}



module.exports = Webpage;