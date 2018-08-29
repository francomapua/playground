var https = require("https");

var Network = {

    httpGetRequest : function(url){
        let data = '';

        https.get(url, (resp) => {
            resp.on('data', (chunk) =>{

            })
        });
    }
}
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
}
Network.httpGetRequest("www.google.com");



module.exports = Network;
