/*
    Callbacks
*/
asyncOperation(callbackFunction);

function asyncOperation(callback){
    // Do something asyncronously
    var err = null;
    var res = "response";
    
    if(callback){
        callback(err, res);
    }
}
var callbackFunction = function(err, res){
    if (err) {
        console.log('err :', err);
    }
    else{
        console.log('res :', res);
    }
}

/*
    Promises
*/
// TODO: Resource
// https://developer.ibm.com/node/2016/08/24/promises-in-node-js-an-alternative-to-callbacks/
var message = "";
var promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += "my";
        resolve(message);
    }, 2000)
})
var promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += " first";
        resolve(message);
    }, 2000)
})
var promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += " promise";
        resolve(message);
    }, 2000)
})
function promiseMaker(name){
    return new Promise(function(resolve, reject) {
       // Do the Async thing here
       var err = null;
       var res = "response " + name; 
       if(err){
           reject(err);
       }
       else{
           resolve(res);
       }
    });
}
function printResult(result){
    console.log('result :', result);
    console.log('message :', message);
}

Promise.all([promise1, promise2, promise3]).then(printResult);
Promise.all([promise2, promise1, promise3]).then(printResult);
Promise.all([promise3, promise2, promise1]).then(printResult);
