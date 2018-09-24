const fs = require("fs");
const swig = require("swig");

function Webpage(filePath){
    this.filePath = filePath;
    this.htmlTemplate = fs.readFileSync(filePath, 'utf-8');
}

Webpage.prototype.loadHTML = function(object){
    var template = swig.compile(this.htmlTemplate);
    return template(object);
}



module.exports = Webpage;