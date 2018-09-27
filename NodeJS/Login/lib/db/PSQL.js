const { Client } = require('pg');

// Singleton Approach
var PSQLDB = {
    clientConfig: {
        host: "localhost",
        user: "postgres",
        password: "postgres",
        database: "testing",
        port : 5432
    },
    runQuery: function (queryString, paramArr, callback) { // SELECT * FROM tbl WHER $1 $2
        console.log("Running Query")
        var client = new Client(this.clientConfig);
        client.query(queryString, (err, res) => {
            console.log("query done");
            if (callback) {
                callback(err, res);
            }
            client.end();
        });
    }

}

console.log("running quuery");
var done = (function wait () { if (!done) setTimeout(wait, 1000) })();

PSQLDB.runQuery("SELECT * FROM public.reel", null, (err, res) =>{
    console.log(err);
    console.log('res :', res);
    done = true;
})

console.log("running quuery");
//module.exports = PSQLDB;