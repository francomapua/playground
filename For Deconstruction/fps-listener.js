const fs = require("fs");
const lineReader = require("line-reader");
const roundTo = require("round-to");
// adb logcat -v threadtime "ph.com.migo.androidplayer" | grep Excellent > GrandPrimePlus.txt

var sourceDir = "./logprocessing/";
var files = fs.readdirSync(sourceDir);

var FPSLog = function(logString){
    let arr = logString.split(" ");
    var dateTime = new Date(arr[0] + " " + arr[1]);
    this.minute = dateTime.getMinutes();
    this.second = dateTime.getSeconds() + dateTime.getMilliseconds();
    this.fps = roundTo.down(parseFloat(arr[arr.length - 2]), 0);
    this.isComplete = this.minute && this.second && this.fps;
}


for (let i = 0; i < files.length; i++) {
    const filePath = sourceDir + files[i];
    var logs = [];
    console.log(filePath);
    if(filePath.indexOf("results") == -1){
        lineReader.eachLine(filePath, function(line, last) {
            //console.log(line);
            var fps = new FPSLog(line);
            if(fps.isComplete){
                logs.push(new FPSLog(line));
                //console.log(`PUSH ${logs.length}`);
            }
            
            
            if(last){
                console.log('logs.length :', logs.length);
                logs = logs.slice(logs.length-(720), logs.length);
                processLog(logs, filePath);
            }
        });
    }
    
}


function processLog(logs, filePath){
    var results = {
        pass : true,
        samples : logs.length,
        median : 0,
        mean : 0,
        fpsStability : 0,
        highestFPS : 0,
        lowestFPS : 0
    }

    // Get Median and Mean
    var sum = 0;
    var fpsMap = {};
    for (let i = 0; i < logs.length; i++) {
        const fps = logs[i].fps;
        
        // Lowest Frame
        if(results.highestFPS == 0 || results.highestFPS < fps){
            results.highestFPS = fps;
        }
        if(results.lowestFPS == 0 || results.lowestFPS > fps){
            results.lowestFPS = fps;
        }
        sum += fps;
        if(!fpsMap[fps]){
            fpsMap[fps] = 0;
        }
        fpsMap[fps] += 1;
    }
    results.mean = sum / logs.length;

    var highsetCount = 0;
    for(var fps in fpsMap){
        if (fpsMap[fps] > highsetCount){
            highsetCount = fpsMap[fps]
            results.median = parseFloat(fps);
        } 
    }

    var radius = results.median * 0.2;
    var upperRange = results.median + radius;
    var lowerRange = results.median - radius;

    var stable = 0
    for (let i = 0; i < logs.length; i++) {
        const fps = logs[i].fps;
        if(fps < upperRange && fps > lowerRange){
            stable += 1;
        }
    }

    results.fpsStability = stable / logs.length;
    results.logs = logs;
    fs.writeFileSync(filePath + "-results.txt", JSON.stringify(results, 0, 1));
    

}