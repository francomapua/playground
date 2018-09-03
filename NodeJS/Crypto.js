const crypto = require("crypto");

function sha256(content){
    return crypto.createHmac('sha256', content).digest('hex');
}