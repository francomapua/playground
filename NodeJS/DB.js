
/*
    MYSQL
*/
const mysql = require   ('mysql');

function MySQLDB(){
    this.conn = mysql.createConnection({
        host: "localhost",
        user: "someuser",
        password: "somepass",
        database : "bngmailer"
    });
}
MySQLDB.prototype.runQuery = function(queryString, callback){
    if(this.conn.state == "disconnected"){
        this.conn.connect();
    }
    this.conn.query(queryString, (err, res, fields) => {
        if(callback){
            callback(err, res);
        }
    });
};