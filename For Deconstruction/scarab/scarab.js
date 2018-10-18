const fs = require('fs-extra');
const dir = require('node-dir');
const cheerio = require('cheerio');

var INPUT_DIR = "../../../../../Workspace/Chalk/app/src/main/assets/www/curriculum.illustrativemathematics.org/MS_IM/teachers";

/*
        READ FILES
*/

dir.readFiles(INPUT_DIR,{
    match : /index.html$/,
    recursive : true,
}, function(err, content, next){
    next();
}, function(err, files){
    iterateOverFiles(files);
});

/*
        PROCESS AND WRITE FILES
*/
function iterateOverFiles(files){
    console.log(files.length);
    
    var fileLibrary = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log("Reading File: " + file);
        
        var fileLength = file.split("\\").length;
        if(fileLength == 19){
            fileLibrary.push(extractPageData(file, fs.readFileSync(file, 'utf8')));    
        }
        
        
        //var newFileContent = etlFile(file, fs.readFileSync(file, 'utf8'));
        
        //fs.writeFileSync(file, newFileContent)
        //console.log();
    };
    fs.writeFileSync("./pageIndex.txt", "var pageIndex = " + JSON.stringify(fileLibrary)+ ";");
    console.log('done!');
}
function etlFile(filePath, fileContent){
    var newContent = fileContent;
    
    // Replace Text
    //newContent = newContent.replace('1/index.html"><span>2nd Quarter</span></a>', '1/index.html"><span>1st Quarter</span></a>')
    var fileData = extractPageData(filePath, newContent);
    //if(fileData.directoryNumber != fileData.lessonNumber){
       // newContent = formatPageWithNewLessonNumber(newContent, fileData.lessonNumber, fileData.directoryNumber);
    //}
    /*newContent = replaceBetweenAnchors(fileContent, 
        '<a class="im-c-dropdown__item" href="../12/index.html"><span> Lesson 12</span></a>',
        '<a class="im-c-dropdown__item" href="../43/index.html"><span> Lesson 43</span></a>', 
        '')
        */
    /*
        for(let i = 33; i <= 43; i++){
        newContent = newContent.replace(
            '<a class="im-c-dropdown__item" href="../'+i+'/index.html"><span> Lesson '+i+'</span></a>',
            ''
        )
    }
    

    newContent = newContent.replace('Grade 6 Home Page', 'Grade 8 Home Page')
    return newContent;
*/
    //return spliceText(newContent, '<a class="im-c-dropdown__item" href="../../3/index.html"><span>3rd Quarter</span></a>', 
    //'<a class="im-c-dropdown__item" href="../../2/index.html"><span>2nd Quarter</span></a>')

    return fileData;
    //var anchor = '</header>'
    //var pathToIndex = getRelativePathToRes(newContent);
    //var formInject =  '<form id="searchForm" method="GET" action="' + pathToIndex +'" style="margin :30px;"><input type="text" name="query" placeholder="Search for a lesson..."  style="border: 1px solid #d1d1d1;    font: 12px Arial,Helvetica,Sans-serif;    color: grey;    width: 400px;    padding: 6px 15px 6px 35px;    -webkit-border-radius: 20px;    -moz-border-radius: 20px;    border-radius: 5px;    text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15) inset;    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15) inset;    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15) inset;    -webkit-transition: all 0.7s ease 0s;    -moz-transition: all 0.7s ease 0s;    -o-transition: all 0.7s ease 0s;    transition: all 0.7s ease 0s;"></form>';
    //newContent = spliceText(newContent, anchor, formInject)
    
    /*
    var relPath = getRelativePathToRes(newContent) + "/icon.png";
    var newContent = spliceText(
        newContent,
        '<div class="im-c-header__container">',
        '<img src="' + relPath + '" class="im-c-header__logo"/>'
    );
    */
    // 1newContent = newContent.replace(/\(Part 1/g, "(Part 1)").replace(/\(Part 2/g, "(Part 2)").replace(/\(Part 3/g, "(Part 3)");
    return newContent;
}
// Util Files
function replaceText(baseText, searchText, newText){
    return baseText.replace(searchText, newText)
}
function replaceBetweenAnchors(baseText, anchor1, anchor2, newText){
    baseText = baseText.replace(/\s+/, "") 
    var index1 = baseText.indexOf(anchor1);
    var baseAnchor = baseText.indexOf(anchor2);
    var index2 = baseAnchor + anchor2.length - 1;
    if(index1 == -1 || baseAnchor == -1){
        return baseText;
    }
    var replaceText = baseText.substr(index1, index2);
    var testTest  = baseText.substr(index2, index2+ 15);
    return baseText.replace(replaceText, newText);
}
function extractPageData(filePath, pageContent){
    var pageData = {
        title : "",
        path : filePath.split("\\").splice(15,19).join("/"),
        //directoryNumber : 1,
        searchWords : []
    }
    //pageData.directoryNumber = parseInt(pageData.path.split('/').splice(-2)[0])
    //pageData.fileName = pageData.path.split('/').splice(-2)[1]
    var $ = cheerio.load(pageContent);
    var relPath;
    $('h1').map(function (i, el) {
        if(i == 0){
            var lessonText = $(this).text().split(" ")[1];
            //pageData.lessonNumber = parseInt(lessonText);
        }
    });

    $('p').map(function (i, el) {
        if(i == 0){
            var title = $(this).text()
            if(title[0] == " "){
                title = title.substr(1, title.length);
            }
            pageData.title = title;
        }
    });
    
    pageData.searchWords = extractSearchWords($.text());
    return pageData

}
function formatPageWithNewLessonNumber(pageText, oldNumber, newNumber){
    //H1
    pageText = pageText.replace(
        "Lesson "+oldNumber+"</h1>",
        "Lesson " + newNumber + "</h1>");

    // Banner
    pageText = pageText.replace(
        "Lesson "+oldNumber+"</span>",
        "Lesson " + newNumber + "</span>");
    
    // . Thing
    pageText = pageText.replace(
        ">"+oldNumber+".1:",
        ">"+newNumber+".1:"
    )

        return pageText;

}
function extractSearchWords(text){
    var searchWords = {};
    text = text.replace(/\t/g, " ").replace(/\s+/g, " ")
    var textArr = text.split(" ");
    for (let i = 0; i < textArr.length; i++) {
        const word = textArr[i];
        if(!searchWords[word]){
            searchWords[word] = 0;
        }
        searchWords[word] += 1; 
    }

    var results = [];
    for(var word in searchWords){
        results.push(word);
    }
    
    return results.join("");;
}
function spliceText(baseText, anchor, newText){
    var index = baseText.indexOf(anchor);
    if(index > -1){
        baseText = baseText.substr(0, index-9) 
            + newText
            + baseText.substr(index-9, baseText.length);
    }
    return baseText;
}
function getRelativePathToRes(fileContent){
    var $ = cheerio.load(fileContent);
    var relPath;
    $('a').map(function (i, el) {
        var self = $(this);
        if(i == 0){
            relPath = self.attr("href").replace("index", "search");
        };
    });
    return relPath;
}
function eliminateHTML(baseText, tag){
    var blackList = [
        "desmos.com/api",
        "desmos/support",
        "cdnjs.cloudflare.com"
    ];

    var $ = cheerio.load(baseText);
    $('script').each(function () {
        var self = $(this);
        blackList.forEach((black) => {
            if(self.attr('src') && self.attr('src').indexOf(black) > -1){
                console.log(self.attr('src'));
                self.replaceWith('');
            };
        })
    });
    newContent = $.html();
}
