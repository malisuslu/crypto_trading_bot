// cyripto is a global module
const cyrpto = require('crypto');

// xmlhttprequest is NOT a global module, so installed by "npm install xmlhttprequest --save" and activated by following command
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Buy order
let burl = 'https://api.binance.com/api/v3/';
let query = 'order/test'; 
let symbol = 'FTMBUSD'; 
let side = 'BUY'; 
let type = 'LIMIT';     
let timeInForce = 'GTC';
let quantity = '35';
let price = 0.38;
let recvWindow = '60000';
let timestamp = Date.now();
let sign_str = '';
let order_url = '';

let keys = {
    'apiKey': '',
    'secretKey': ''
}


let buy = function() {

sign_str = 'symbol=' + symbol + '&side=' + side + '&type=' + type + '&timeInForce=' + timeInForce + '&quantity=' + quantity + '&price=' + price + '&recvWindow=' + recvWindow + '&timestamp=' + timestamp;

order_url = burl + query + '?' + sign_str;

let signature = cyrpto.createHmac('sha256', keys.secretKey).update(sign_str).digest('hex'); // HMAC SHA256 signature of the request URL with the secret key as the key (base64 encoded) 
let url = order_url + '&signature=' + signature; 

let myRequest = new XMLHttpRequest(); 
myRequest.open('POST', url, false);   // false for synchronous request
myRequest.setRequestHeader('X-MBX-APIKEY', keys.apiKey); 
myRequest.onload = function() {
    console.log(myRequest.responseText);
};
myRequest.send();
};


let WebSocket = require('ws');
let ws = new WebSocket('wss://stream.binance.com:9443/ws/ftmbusd@trade');
let buy_price = 0.38;
ws.onmessage = function(event) {
    let data = JSON.parse(event.data);

    if (data.e == 'trade') {
        console.log(eval(data.p));
    }

    if (eval(data.p) < buy_price) {
        ser_time_func;
        timestamp = ser_time;
        console.log(Date.now());
        price = (eval(data.p)*1.005).toFixed(4);
        buy();
        buy_price = (buy_price/0.955).toFixed(4);
        console.log(order_url);
        console.log('buy order placed at ' + eval(data.p).toFixed(4));
        console.log('buy price is now ' + price);
        console.log(timestamp);
    }
};



let https = require('https');
let ser_time = 0;
let ser_time_func = https.get('https://api.binance.com/api/v3/time', (res) => {

    let data = '';

    res.on('data', (d) => {
        data += d;
    });

    res.on('end', () => {
        ser_time = JSON.parse(data).serverTime;
        console.log(ser_time);
        return
    });
})
.on('error', (e) => {
    console.error(e);
});

