const fs = require('fs-extra');
const Lesson = require("./Lesson");
const LessonMap = require("./lessonMapping");
const download = require('download-file');
const request = require('sync-request');
const cheerio = require('cheerio');
const async = require('async');

const url = require('url');

const baseURL = "http://curriculum.illustrativemathematics.org/MS_IM/";
const baseDir = "./img/"
var filePaths = ["teacherIndex", "teacherPractice", "teacherPreparation", "studentIndex", "studentPractice"];

var lessonPairs = [];
for (var oldLessonNumber in LessonMap) {
    var oldLson = new Lesson(oldLessonNumber);
    var newLson = new Lesson(LessonMap[oldLessonNumber]);
    lessonPairs.push([oldLson, newLson]);
}
async.eachSeries(lessonPairs, function (lessonPair, cb1) {
    var oldLson = lessonPair[0];
    var newLson = lessonPair[1];
    async.forEachSeries(filePaths, function (filePath, cb2) {
        // Continue filter
        
        if ( 
            1 != 1
         //   parseInt(newLson.grade) != 6 
         //     || parseInt(newLson.quarter) != 2 
         //parseInt(newLson.lessonNumber) < 16
        ) {
            //console.log("Skipping");
            cb2();
        } else {
            console.log(oldLson.lessonString + " -> " + newLson.lessonString);
            var localPath = baseDir + newLson.files[filePath].replace(".html", "") //+ newLson.lessonPath.replace(/\//g, '-');
            localPath = localPath.split("/");
            var filePrefix = localPath.pop();
            var downloadPath = localPath.join("/") + "/";
            var downloadURL = baseURL + oldLson.files[filePath];
            fs.ensureDirSync(downloadPath);
            var stuffToDL = [];

            var body = request('GET', downloadURL).getBody('utf-8');
            var $ = cheerio.load(body);
            var reqUrl = url.parse(downloadURL);

            $('img').map(function (i, e) {
                var srcUrl = url.parse($(e).attr('src'));
                var imgURL = url.format(srcUrl);
                if (!srcUrl.host) {
                    imgURL = url.resolve(reqUrl, srcUrl);
                }
                var fileName = filePrefix + i + ".png";
                var options = {
                    imgURL: imgURL,
                    directory: downloadPath,
                    filename: fileName
                }
                stuffToDL.push(options);
            });

            async.eachSeries(stuffToDL, function (options, cb3) {
                console.log("downloading");
                download(options.imgURL, options, function (err) {
                    console.log("downloaded " + options.filename);
                    if (err)
                        console.log("Error " + err)
                    cb3();
                })
            }, function (err) {
                cb2();
            })
        }



    }, function (err) {
        cb1();
    })
});