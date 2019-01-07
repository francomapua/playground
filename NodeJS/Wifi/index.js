const wifi = require('node-wifi');
const os = require('os');
const player = require('play-sound');
wifi.init();
console.log()

console.log('Scanning');
setInterval(()=>{
    console.log('\n.');
    wifi.scan(handleScan);

}, 3000);


function handleScan(err, networks){
    networks.forEach(network => {
        if(network.ssid.length > 20 && network.ssid.indexOf("Rising") == -1){
            console.log('    FOUND >' + network.mac + " - " + network.ssid);
        }
        
    });
}
