const crypto = require("crypto");
const DBConnection = require("../db/MySQL");


function User(username, password){
    this.username = username;
    this.password = hashPassword(password);
    this.firstname = null;
    this.lastname = null;

    function hashPassword(password){
        password = password += password.substr(0,2);
        return crypto.createHmac('sha256', password).digest('hex').substr(0,12);
    }
}

User.prototype.login = function(callback){
    var self = this;

    if(self.username == "someuser"){
        self.firstname = "John";
        self.lastname = "Doe";
    }
    

    if(callback)callback();
    /*
    DBConnection.login(this, (err, res) => {
        
    })
    */
}
module.exports = User;