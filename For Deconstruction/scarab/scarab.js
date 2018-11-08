const fs = require('fs-extra');
const dir = require('node-dir');
const cheerio = require('cheerio');
const path = require('path');

var INPUT_DIR = "D:\/Repos\/chalk\/app\/src\/main\/assets\/www\/curriculum.illustrativemathematics.org\/MS_IM";

INPUT_DIR = path.resolve(INPUT_DIR);

console.log('INPUT_DIR :', INPUT_DIR);

/*help

        READ FILES
*/

dir.readFiles(INPUT_DIR, {
    match: /.html$/,
    recursive: true,
}, function (err, content, next) {
    next();
}, function (err, files) {
    iterateOverFiles(files);
});

/*
        PROCESS AND WRITE FILES
*/
function iterateOverFiles(files) {
    console.log(files.length);

    var fileLibrary = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log("Reading File: " + file);

        /*
        //  For PageIndex Writing    
        var fileLength = file.split("\\").length;
        if(fileLength == 19){
            fileLibrary.push(extractPageData(file, fs.readFileSync(file, 'utf8')));    
        }
        */


        // ---  FileOverwriting
        var fileContent = fs.readFileSync(file, 'utf8')
        var newFileContent = etlFile(file, fileContent);
        if (fileContent.length != newFileContent.length) {
            fs.writeFileSync(file, newFileContent)
        }

    };
    //fs.writeFileSync("./pageIndex.txt", "var pageIndex = " + JSON.stringify(fileLibrary)+ ";");
    console.log('done!');
}

function etlFile(filePath, fileContent) {
    //var fileData = extractPageData(filePath, fileContent);
    //newContent = replaceBetweenAnchors(newContext, anchor1, anchor2, newText)
    //console.log(spliceAtBottomOfClass(newContent, "im-c-container", "hue"));

    //console.log(spliceAtBottomOfClass(fileContent, "im-c-header__logo", "lol"));

    /*
        Remove upper Logo
    */
    var imcHeaderIndex = fileContent.indexOf('<a class="im-c-header__logo"');
    if (imcHeaderIndex > -1) {
        // Logo Found
        var logoSubstring = fileContent.substring(imcHeaderIndex, fileContent.length);
        var endOfLogoIndex = imcHeaderIndex + logoSubstring.indexOf("</a>") + 4;
        var logoString = fileContent.substring(imcHeaderIndex, endOfLogoIndex);
        fileContent = replaceText(fileContent, logoString, "");
    }





    return fileContent;
    /*
        Attach logo at bottom of page
    
    var anchorString = '<div class="im-c-footer__container">'
    var logoText = '<a><svg class="im-c-logo" height="36" viewBox="0 0 306.02 67.98"> <title>IM Logo</title> <g class="im-c-logo__mark"> <polygon points="35.51 26.91 35.51 67.98 50.21 67.98 35.51 26.91"></polygon> <polygon points="80.19 26.91 67.21 67.98 80.19 67.98 80.19 26.91"></polygon> <polygon points="47.85 0.4 58.77 42.8 69.61 0.4 47.85 0.4"></polygon> <rect height="42.38" width="18.33" y="25.6"></rect> <path d="M1.62,8.43a8.43,8.43,0,1,1,8.43,8.44A8.43,8.43,0,0,1,1.62,8.43Z"></path> </g> <g class="im-c-logo__type" style="fill:silver"> <path d="M97.2,31.17V5.63h5.41V31.17Z"></path> <path d="M111.8,31.17h-5.33V4h5.33Z"></path> <path d="M120.57,31.17h-5.33V4h5.33Z"></path> <path d="M137.85,31.17l-.72-2.5h-.28a5.67,5.67,0,0,1-2.42,2.11,8.41,8.41,0,0,1-3.59.74,6.83,6.83,0,0,1-5.18-1.84,7.41,7.41,0,0,1-1.75-5.31V11.64h5.33V23.05a5.49,5.49,0,0,0,.75,3.17,2.74,2.74,0,0,0,2.39,1.05,3.58,3.58,0,0,0,3.23-1.49c.67-1,1-2.65,1-5V11.64h5.33V31.17Z"></path> <path d="M159,25.37A5.39,5.39,0,0,1,156.92,30c-1.4,1-3.48,1.57-6.25,1.57a19.74,19.74,0,0,1-3.63-.29,13.13,13.13,0,0,1-2.81-.85V26a17.88,17.88,0,0,0,3.34,1.17,13.25,13.25,0,0,0,3.28.47c1.93,0,2.9-.56,2.9-1.67a1.42,1.42,0,0,0-.39-1A5.75,5.75,0,0,0,152,24c-.62-.33-1.46-.71-2.51-1.16a16.11,16.11,0,0,1-3.31-1.74,4.87,4.87,0,0,1-1.54-1.85,6.06,6.06,0,0,1-.48-2.56,4.63,4.63,0,0,1,2-4,9.8,9.8,0,0,1,5.72-1.43,16.29,16.29,0,0,1,6.86,1.54l-1.6,3.84c-1-.42-1.9-.76-2.75-1a8.82,8.82,0,0,0-2.6-.4c-1.57,0-2.36.43-2.36,1.28a1.52,1.52,0,0,0,.76,1.24,20.38,20.38,0,0,0,3.33,1.55A15.68,15.68,0,0,1,156.92,21a5.09,5.09,0,0,1,1.58,1.85A5.81,5.81,0,0,1,159,25.37Z"></path> <path d="M169.24,27.27a11.54,11.54,0,0,0,3.36-.61v4a12.05,12.05,0,0,1-4.9.89q-3.19,0-4.65-1.62a7,7,0,0,1-1.46-4.84V15.64H159V13.39L162,11.61l1.53-4.13h3.41v4.16h5.47v4h-5.47v9.42a2.06,2.06,0,0,0,.64,1.67A2.49,2.49,0,0,0,169.24,27.27Z"></path> <path d="M185.3,11.27a9,9,0,0,1,1.8.16l-.41,5a5.9,5.9,0,0,0-1.57-.18,5.66,5.66,0,0,0-4,1.31,4.75,4.75,0,0,0-1.43,3.67v9.94H174.4V11.64h4l.79,3.28h.26a7.31,7.31,0,0,1,2.45-2.64A6.06,6.06,0,0,1,185.3,11.27Z"></path> <path d="M200.9,31.17l-1-2.66h-.14A7.82,7.82,0,0,1,197,30.86a8.9,8.9,0,0,1-3.71.66,6,6,0,0,1-4.43-1.61,6.14,6.14,0,0,1-1.62-4.57,5.15,5.15,0,0,1,2.18-4.59c1.45-1,3.63-1.53,6.56-1.63l3.38-.11v-.85q0-3-3-3a13.89,13.89,0,0,0-5.51,1.41L189,13a16,16,0,0,1,7.48-1.76,9.32,9.32,0,0,1,6,1.71,6.33,6.33,0,0,1,2.1,5.21v13Zm-1.58-9-2.06.07a6.6,6.6,0,0,0-3.45.84,2.62,2.62,0,0,0-1.14,2.34q0,2.25,2.58,2.25a4.11,4.11,0,0,0,3-1.06,3.78,3.78,0,0,0,1.1-2.83Z"></path> <path d="M216.18,27.27a11.54,11.54,0,0,0,3.36-.61v4a12,12,0,0,1-4.89.89q-3.21,0-4.66-1.62a7,7,0,0,1-1.46-4.84V15.64H206V13.39l2.94-1.78,1.53-4.13h3.41v4.16h5.47v4h-5.47v9.42a2.06,2.06,0,0,0,.64,1.67A2.49,2.49,0,0,0,216.18,27.27Z"></path> <path d="M221.11,6.59c0-1.73,1-2.6,2.9-2.6s2.9.87,2.9,2.6a2.51,2.51,0,0,1-.73,1.93,3,3,0,0,1-2.17.69C222.08,9.21,221.11,8.34,221.11,6.59Zm5.55,24.58h-5.32V11.64h5.32Z"></path> <path d="M234.75,31.17l-7.44-19.53h5.58l3.77,11.13a19.42,19.42,0,0,1,.78,4h.11a17.75,17.75,0,0,1,.78-4l3.76-11.13h5.57l-7.44,19.53Z"></path> <path d="M257.15,31.52a10.1,10.1,0,0,1-7.37-2.6q-2.66-2.61-2.66-7.37,0-4.92,2.46-7.59a8.72,8.72,0,0,1,6.78-2.69,8.63,8.63,0,0,1,6.45,2.36,8.92,8.92,0,0,1,2.3,6.52v2.58H252.52a5.13,5.13,0,0,0,1.35,3.55,4.7,4.7,0,0,0,3.52,1.27,14.93,14.93,0,0,0,3.34-.36A17.33,17.33,0,0,0,264,26v4.12a12.37,12.37,0,0,1-3,1A18.7,18.7,0,0,1,257.15,31.52Zm-.75-16.45a3.37,3.37,0,0,0-2.66,1.07,5,5,0,0,0-1.1,3.05h7.48a4.45,4.45,0,0,0-1-3.05A3.48,3.48,0,0,0,256.4,15.07Z"></path> <path d="M108,67.33l-6.15-20h-.16q.33,6.11.33,8.15V67.33H97.2V41.8h7.37l6,19.52h.11l6.41-19.52h7.37V67.33h-5V55.25q0-.86,0-2t.23-5.94h-.16l-6.58,20Z"></path> <path d="M140.76,67.33l-1-2.65h-.14A7.93,7.93,0,0,1,136.82,67a9,9,0,0,1-3.71.65,6,6,0,0,1-4.43-1.61,6.18,6.18,0,0,1-1.61-4.57,5.17,5.17,0,0,1,2.17-4.59q2.17-1.47,6.56-1.63l3.39-.1v-.86q0-3-3-3a13.76,13.76,0,0,0-5.5,1.42l-1.77-3.6a15.85,15.85,0,0,1,7.48-1.77,9.34,9.34,0,0,1,6,1.71,6.37,6.37,0,0,1,2.09,5.21v13Zm-1.57-9-2.06.07a6.67,6.67,0,0,0-3.46.84,2.65,2.65,0,0,0-1.14,2.34c0,1.51.87,2.26,2.59,2.26a4.1,4.1,0,0,0,3-1.07,3.74,3.74,0,0,0,1.11-2.83Z"></path> <path d="M156.05,63.44a11.76,11.76,0,0,0,3.35-.61v4a11.87,11.87,0,0,1-4.89.89q-3.19,0-4.65-1.61a7,7,0,0,1-1.46-4.85V51.8h-2.55V49.55l2.93-1.78,1.54-4.12h3.4V47.8h5.47v4h-5.47v9.42a2.11,2.11,0,0,0,.64,1.68A2.54,2.54,0,0,0,156.05,63.44Z"></path> <path d="M179.23,67.33H173.9V55.93q0-4.23-3.14-4.23a3.58,3.58,0,0,0-3.23,1.52,9.2,9.2,0,0,0-1,4.93v9.18H161.2V40.15h5.33v5.54c0,.43,0,1.44-.12,3l-.12,1.57h.27a6.18,6.18,0,0,1,5.66-2.86,6.91,6.91,0,0,1,5.23,1.85,7.37,7.37,0,0,1,1.78,5.31Z"></path> <path d="M191.41,67.68a10.07,10.07,0,0,1-7.38-2.6c-1.77-1.74-2.65-4.19-2.65-7.37s.82-5.8,2.45-7.59a8.74,8.74,0,0,1,6.79-2.68,8.55,8.55,0,0,1,6.44,2.36,8.9,8.9,0,0,1,2.31,6.51V58.9H186.78a5.07,5.07,0,0,0,1.34,3.54,4.75,4.75,0,0,0,3.53,1.28,14.93,14.93,0,0,0,3.34-.37,16.26,16.26,0,0,0,3.28-1.17V66.3a12.45,12.45,0,0,1-3,1A18.59,18.59,0,0,1,191.41,67.68Zm-.76-16.45A3.38,3.38,0,0,0,188,52.3a5,5,0,0,0-1.1,3.05h7.47a4.4,4.4,0,0,0-1-3.05A3.5,3.5,0,0,0,190.65,51.23Z"></path> <path d="M219,67.33h-5.33V55.93a5.75,5.75,0,0,0-.7-3.17,2.5,2.5,0,0,0-2.23-1.06,3.23,3.23,0,0,0-3,1.5,9.83,9.83,0,0,0-.93,4.95v9.18h-5.32V47.8h4.07l.71,2.5h.3a5.38,5.38,0,0,1,2.27-2.1,7.32,7.32,0,0,1,3.41-.76q4.38,0,5.93,2.86h.48A5.22,5.22,0,0,1,221,48.19a7.74,7.74,0,0,1,3.45-.75,6.78,6.78,0,0,1,5,1.7c1.14,1.14,1.7,3,1.7,5.46V67.33h-5.34V55.93a5.74,5.74,0,0,0-.71-3.17,2.47,2.47,0,0,0-2.22-1.06A3.33,3.33,0,0,0,220,53.1a7.88,7.88,0,0,0-1,4.43Z"></path> <path d="M246.94,67.33l-1-2.65h-.14A7.93,7.93,0,0,1,243,67a9.08,9.08,0,0,1-3.71.65,6,6,0,0,1-4.43-1.61,6.14,6.14,0,0,1-1.62-4.57,5.18,5.18,0,0,1,2.18-4.59c1.45-1,3.63-1.52,6.56-1.63l3.38-.1v-.86q0-3-3-3a13.8,13.8,0,0,0-5.51,1.42l-1.76-3.6a15.85,15.85,0,0,1,7.48-1.77,9.31,9.31,0,0,1,6,1.71,6.34,6.34,0,0,1,2.1,5.21v13Zm-1.58-9-2.06.07a6.63,6.63,0,0,0-3.45.84,2.65,2.65,0,0,0-1.14,2.34c0,1.51.86,2.26,2.59,2.26a4.1,4.1,0,0,0,3-1.07,3.73,3.73,0,0,0,1.1-2.83Z"></path> <path d="M262.22,63.44a11.88,11.88,0,0,0,3.36-.61v4a11.87,11.87,0,0,1-4.89.89q-3.21,0-4.66-1.61a7.06,7.06,0,0,1-1.46-4.85V51.8H252V49.55L255,47.77l1.53-4.12h3.41V47.8h5.47v4H259.9v9.42a2.08,2.08,0,0,0,.64,1.68A2.49,2.49,0,0,0,262.22,63.44Z"></path> <path d="M267.15,42.76c0-1.74,1-2.61,2.9-2.61s2.9.87,2.9,2.61a2.53,2.53,0,0,1-.73,1.93,3,3,0,0,1-2.17.69C268.12,45.38,267.15,44.5,267.15,42.76Zm5.55,24.57h-5.32V47.8h5.32Z"></path> <path d="M284.08,67.68q-9.12,0-9.12-10,0-5,2.48-7.6c1.65-1.76,4-2.63,7.11-2.63a13.51,13.51,0,0,1,6.08,1.33l-1.57,4.12c-.84-.34-1.62-.62-2.34-.83a7.47,7.47,0,0,0-2.17-.33q-4.16,0-4.16,5.91,0,5.73,4.16,5.73A9.67,9.67,0,0,0,287.4,63,10.42,10.42,0,0,0,290,61.67v4.56a8.73,8.73,0,0,1-2.61,1.14A14.72,14.72,0,0,1,284.08,67.68Z"></path> <path d="M306,61.53a5.38,5.38,0,0,1-2.09,4.58q-2.08,1.58-6.24,1.57a19,19,0,0,1-3.64-.29,13.71,13.71,0,0,1-2.81-.84v-4.4a19.57,19.57,0,0,0,3.35,1.17,13.74,13.74,0,0,0,3.27.47c1.93,0,2.9-.56,2.9-1.68a1.41,1.41,0,0,0-.38-1,5.66,5.66,0,0,0-1.33-.89c-.63-.33-1.47-.72-2.52-1.16a16.32,16.32,0,0,1-3.31-1.75,5,5,0,0,1-1.53-1.84,6.12,6.12,0,0,1-.48-2.56,4.65,4.65,0,0,1,2-4,9.85,9.85,0,0,1,5.72-1.42A16.32,16.32,0,0,1,305.81,49l-1.61,3.85a27.42,27.42,0,0,0-2.74-1,8.56,8.56,0,0,0-2.6-.41c-1.58,0-2.36.43-2.36,1.28a1.49,1.49,0,0,0,.76,1.24,20,20,0,0,0,3.33,1.55,15.93,15.93,0,0,1,3.35,1.73A5.18,5.18,0,0,1,305.51,59,5.62,5.62,0,0,1,306,61.53Z"></path> </g> </svg></a>';
    if (fileContent.indexOf("fill:silver") == -1) {
        fileContent = spliceText(fileContent, anchorString, logoText, true);
    }
    return fileContent;
    /**/

    //newContent = newContent.replace('1/index.html"><span>2nd Quarter</span></a>', '1/index.html"><span>1st Quarter</span></a>')
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
function replaceText(baseText, searchText, newText) {
    return baseText.replace(searchText, newText)
}

function replaceBetweenAnchors(baseText, anchor1, anchor2, newText) {
    baseText = baseText.replace(/\s+/, "")
    var index1 = baseText.indexOf(anchor1);
    var baseAnchor = baseText.indexOf(anchor2);
    var index2 = baseAnchor + anchor2.length - 1;
    if (index1 == -1 || baseAnchor == -1) {
        return baseText;
    }
    var replaceText = baseText.substr(index1, index2);
    var testTest = baseText.substr(index2, index2 + 15);
    return baseText.replace(replaceText, newText);
}

function extractPageData(filePath, pageContent) {
    var pageData = {
        title: "",
        path: filePath.split("\\").splice(15, 19).join("/"),
        //directoryNumber : 1,
        searchWords: []
    }
    //pageData.directoryNumber = parseInt(pageData.path.split('/').splice(-2)[0])
    //pageData.fileName = pageData.path.split('/').splice(-2)[1]
    var $ = cheerio.load(pageContent);
    var relPath;
    $('h1').map(function (i, el) {
        if (i == 0) {
            var lessonText = $(this).text().split(" ")[1];
            //pageData.lessonNumber = parseInt(lessonText);
        }
    });

    $('p').map(function (i, el) {
        if (i == 0) {
            var title = $(this).text()
            if (title[0] == " ") {
                title = title.substr(1, title.length);
            }
            pageData.title = title;
        }
    });

    pageData.searchWords = extractSearchWords($.text());
    return pageData

}

function formatPageWithNewLessonNumber(pageText, oldNumber, newNumber) {
    //H1
    pageText = pageText.replace(
        "Lesson " + oldNumber + "</h1>",
        "Lesson " + newNumber + "</h1>");

    // Banner
    pageText = pageText.replace(
        "Lesson " + oldNumber + "</span>",
        "Lesson " + newNumber + "</span>");

    // . Thing
    pageText = pageText.replace(
        ">" + oldNumber + ".1:",
        ">" + newNumber + ".1:"
    )

    return pageText;

}

function extractSearchWords(text) {
    var searchWords = {};
    text = text.replace(/\t/g, " ").replace(/\s+/g, " ")
    var textArr = text.split(" ");
    for (let i = 0; i < textArr.length; i++) {
        const word = textArr[i];
        if (!searchWords[word]) {
            searchWords[word] = 0;
        }
        searchWords[word] += 1;
    }

    var results = [];
    for (var word in searchWords) {
        results.push(word);
    }

    return results.join("");;
}

function spliceText(baseText, anchor, newText, isAfter = false) {
    var index = baseText.indexOf(anchor);
    if (index > -1) {
        if (isAfter) {
            index = index + anchor.length;
        }
        baseText = baseText.substr(0, index) +
            newText +
            baseText.substr(index, baseText.length);
    }
    return baseText;
}

function getRelativePathToRes(fileContent) {
    var $ = cheerio.load(fileContent);
    var relPath;
    $('a').map(function (i, el) {
        var self = $(this);
        if (i == 0) {
            relPath = self.attr("href").replace("index", "search");
        };
    });
    return relPath;
}

function spliceAtBottomOfClass(baseText, className, text) {
    var $ = cheerio.load(baseText);
    if (className.indexOf(".") == -1) {
        className = "." + className;
    }
    var counter = 0;
    $("a").each(function () {
        var self = $(this);
        if (self.attr("class") && self.attr("class").indexOf("im-c-header__logo") > -1) {

            counter++;
        }
    });

    return counter;
    //newContent = $.html();
}


function eliminateHTML(baseText, tag) {
    var blackList = [
        "desmos.com/api",
        "desmos/support",
        "cdnjs.cloudflare.com"
    ];

    var $ = cheerio.load(baseText);
    $('script').each(function () {
        var self = $(this);
        blackList.forEach((black) => {
            if (self.attr('src') && self.attr('src').indexOf(black) > -1) {
                console.log(self.attr('src'));
                self.replaceWith('');
            };
        })
    });
    newContent = $.html();
}