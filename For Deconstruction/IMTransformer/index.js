const fs = require('fs-extra');
const Lesson = require("./Lesson");
const LessonMap = require("./lessonMapping");
const cheerio = require('cheerio');

var inputDirectory = "../IllustrativeMathematics/Raw - Copy/IM/curriculum.illustrativemathematics.org/MS_IM/";
//var outputDirectory = "./output/MS_IM/";
var outputDirectory = "../ChalkMobile/www/curriculum.illustrativemathematics.org/MS_IM/";

var lessonTemplate = fs.readFileSync("./template.html", 'utf-8');

for (var oldLessonNumber in LessonMap) {
    if (oldLessonNumber.indexOf('x') == -1) {
        var oldLson = new Lesson(oldLessonNumber);
        var newLson = new Lesson(LessonMap[oldLessonNumber]);

        if (1 == 1
            //newLson.grade == "6" &&
            //newLson.quarter == "3"
            ){
            // Read Old File
            var oldFileContent = readFilesOfLson(oldLson);
            // Transform and Save
            for (var filePath in newLson.files) {
                var content = oldFileContent[filePath];

                // Replace Previous Lesson 
                var oldLessonString = "Lesson " + oldLson.lessonNumber;
                var newLessonString = "Lesson " + newLson.lessonNumber;
                content = replaceLastInstance(content, oldLessonString, newLessonString)

                var sectionRegex = new RegExp("Leshon", "g");
                content = content.replace(sectionRegex, newLson.lessonNumber);
                content = content.replace("Lesson x", newLessonString);
                content = replaceLastInstance(content, "/students/" + oldLson.lessonPath, "/students/" + newLson.lessonPath);

                // Format Images
                var pageType = filePath.replace("student", "").replace("teacher", "").toLowerCase();
                var $ = cheerio.load(content);
                $("img").map(function(i, e) {
                    $(e).attr("src", pageType + i + ".png");            
                });
                $("main").map(function(i,e){
                    $(e).addClass("im-theme--teal");
                })
                content = $.html();

                var newFilePath = outputDirectory + newLson.files[filePath];
                fs.ensureFileSync(newFilePath);
                fs.writeFileSync(newFilePath, content);
            }
        }
    }
}

function readFilesOfLson(lson) {
    var filesObject = lson.files;
    var fileContent = {};
    for (var filePath in filesObject) {
        var rawRead = fs.readFileSync(inputDirectory + filesObject[filePath], 'utf-8');

        var mainExtract = "<main" + rawRead.split("<main")[1].split("</main>")[0] + "</main>";

        var sectionRegex = new RegExp(">" + oldLson.lessonNumber + "\.", "g");
        mainExtract = mainExtract.replace(sectionRegex, ">Leshon.");
        var mainRegex = new RegExp("<!--mainhere-->", "g");

        content = content

        fileContent[filePath] = lessonTemplate.replace(mainRegex, mainExtract);
    }

    return fileContent;
}

function replaceLastInstance(baseString, oldString, newString) {
    var indexStart = baseString.lastIndexOf(oldString);
    var indexEnd = indexStart + oldString.length;

    if (indexStart == -1) {
        return baseString;
    } else {
        return baseString.substring(0, indexStart) +
            newString +
            baseString.substring(indexEnd, baseString.length);
    }
};

