//const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');
const WebSocketServer = require('ws').Server;


const port = process.env.PORT || 8443;

//const server = http.createServer(app);
let httpsServer = https.createServer({
    key: fs.readFileSync('./certs/ssl.key'),
    cert: fs.readFileSync('./certs/ssl.crt')
}, app).listen(port, function() {
    console.log("https server listening on port " + port + "...");
});

let noop = ()=>{};

let wss = new WebSocketServer({
    server: httpsServer
});
wss.getUniqueID = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};
const interval = setInterval(function sendKeepAlive() {
    wss.clients.forEach(function each(ws) {
        console.log('Client ID ' + ws.id + ' isAlive ' + ws.isAlive);
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.send(JSON.stringify({ 'event': 'KeepAlive', 'message': '' }));
        ws.ping(noop);
    });
}, 30000);

wss.on('connection', function connection(ws, req) {
    ws.isAlive = true;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('HandleID ' + ws._socket._handle.fd);
    ws.id = wss.getUniqueID();
    wss.clients.forEach(function each(client) {
        console.log('Client.ID: ' + client.id);
    });

    //console.dir(req.headers['sec-websocket-key']);
    ws.send(JSON.stringify({ 'event': 'Connected', 'message': `Client ID -> ${ws.id}  Connected!!!. Your IP  ${ip}` }));
    ws.on('message', (data) => {
        let jsonData = JSON.parse(data);
        let eventType = jsonData.event;
        let message = jsonData.message;
        if (eventType === 'KeepAlive') ws.isAlive = true;
        //ws.send(`Data received from IP ${ip} : ${data.toString()} `) // echo-server
    })
    ws.on('pong',()=>{
        ws.isAlive=true;
    });
    ws.on("close", function() {
        console.log("websocket connection closed ID: " + ws.id);
    });
});
//server.listen(port);