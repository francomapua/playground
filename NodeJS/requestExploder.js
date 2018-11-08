const request = require('request');

class httpClient {

}

var requestCount = 1000;
var delay = 0;

var requestParts = [
    "\\index.html",
    "\\css\\main.css",
    
]
makeRequest(1);

function makeRequest(i) {
    if (i <= requestCount) {

        var requestPart = requestParts[i % requestParts.length];

        //console.log("Firing:", i, requestPart);
        var options = {
            url : 'http://localhost:3001/api/v1/downloadfile',
            headers : {
                password : 'f48144e6b8922600259a72159de18bd',
                fileHash : requestPart
            }
        }
        var hitTrack = i;
        request(options, (err, res, body) => {
            console.log("Hit:", hitTrack);
        });


        i += 1;
        setTimeout(() => {
            makeRequest(i)
        }, delay)
    }
}