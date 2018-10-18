var fs = require("fs");
var cheerio = require("cheerio");
var download = require('download-file')

// Config
var _DIR_INPUT = "./_input/";
var _DIR_OUTPUT = "./_output/";
var _DIR_OUTPUT_SRC = _DIR_OUTPUT + "src/";
var _DIR_OUTPUT_RES = _DIR_OUTPUT + "res/";
var _DIR_OUTPUT_IMG = _DIR_OUTPUT + "img/";
var _WRAPPER_TOP = fs.readFileSync("./wrapper_openresource_top_custom.txt");
var _WRAPPER_BOTTOM = fs.readFileSync("./wrapper_openresource_bottom.txt");

// LOAD WRAPPER CODE
// READ INPUT DIR FILES
var htmlFiles = getFilesWithExtension(_DIR_INPUT, "html");
//var htmlFiles = [htmlFiles[0]];
console.log(htmlFiles.length + " files identified");



// FOR EACH FILE IN INPUT DIR
htmlFiles.forEach(function(htmlFile, index){
    var htmlString = fs.readFileSync(htmlFile, 'utf8');
    var text = extractInnerHtml(htmlString, "main"); //have it get the main tag as well
    var newHTML = acquireImages(text);
    var built = _WRAPPER_TOP + newHTML + _WRAPPER_BOTTOM;
    built = copyTagClass("body", htmlString, built);
    built = copyTagClass("main", htmlString, built);
    fs.writeFile(_DIR_OUTPUT_SRC + htmlFile.split("/").pop(), built, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
})


// Functions
function getFilesWithExtension(dir, ext){
    var files = fs.readdirSync(dir);
    var foundFiles = [];
    for(var i = 0; i < files.length; i++){
        var file = files[i];
        if(file.indexOf(ext) > -1){
            foundFiles.push(dir + file);
        }
    }
    return foundFiles;
}
function extractInnerHtml(htmlString, id){
    var $ = cheerio.load(htmlString);
    if(id[0] != "#"){
        id = "#" + id;
    }
    var innerHTML = $(id).html();
    //var tag = $(id).first();
    //var tagName = $(id)[0].name;
    //var className = tag.attr("class");
    //var id = tag.attr("id");
    //var fullTag = "<" + tagName + " class=\""+ className + "\" id=\"" + id + "\"> " + innerHTML + "</"+tagName+">";
    return innerHTML;
}
function acquireImages(htmlString){
    var imageLinks = filterLinksOpenResource(htmlString);
    console.log(imageLinks);
    
    for(var link in imageLinks){
        var options = {
            directory: _DIR_OUTPUT_IMG,
            filename: imageLinks[link] 
        }
        download(link, options, function(err){
            if (err)
            console.log(err)
        }) 
        var imgPath = "../img/" + imageLinks[link] ;
        htmlString = htmlString.split(link).join(imgPath);
    }
    var repositionFiles = new RegExp('\"\.\/.*?\_files', 'g');
    return htmlString.replace(repositionFiles, "\"../res");
}
function copyTagClass(tag, fromHTML, toHTML){
    var from$ = cheerio.load(fromHTML);
    var to$ = cheerio.load(toHTML);
    var className = from$(tag)[0].attribs.class;
    to$(tag).addClass(className);
    return to$.html();
}
function filterLinksOpenResource(htmlString){
    var regex = new RegExp("src=\"https:\/\/cms.*?\"", "g");
    var results = (htmlString.match(regex));
    var imageLinks = {}; 
    if(results == null){
        return;
    }
    results.forEach(function(image){
        var link = image.substring(
            image.indexOf("\"") + 1, 
            image.lastIndexOf("\"")
        );
        console.log(link);
        var fileName = link.split("/").pop();
        imageLinks[link] = fileName;
    })
    return imageLinks;
}
function filterLinksLearnzillion(htmlString){
    var quotelessString = htmlString.replace(/(&quot\;)/g,"");
    var regex = new RegExp("url\\(https:\\/\\/www.fs.*?\\);", "g");
    var results = (quotelessString.match(regex));
    var imageLinks = {}; 
    results.forEach(function(image){
        var link = image.substring(
            image.lastIndexOf("(") + 1, 
            image.lastIndexOf(")")
        );
        var fileName = link.split("/").pop().substring(0,8).toLowerCase() + ".jpg";
        imageLinks[link] = fileName;
    })
    return imageLinks;
}


