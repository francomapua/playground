const mysql = require('mysql');

// Singleton Approach
var MySQLDB = {
    conn: mysql.createConnection({
        host: "localhost",
        user: "someuser",
        password: "somepass",
        database: "bngmailer"
    }),
    runQuery: function (queryString, paramArr, callback) {
        if (this.conn.state == "disconnected") {
            this.conn.connect();
        }
        this.conn.query(queryString, (err, res, fields) => {
            this.conn.end();
            if (callback) {
                callback(err, res);
            }
        });
    },
    login : function (user, callback){
        var query = "SELECT name FROM user WHERE username = ? AND hash_password = ?";
        this.runQuery(query, [user.username, user.password], (err, res) => {
            if(callback) callback(err, res);
        });
    }

}

module.exports = MySQLDB;