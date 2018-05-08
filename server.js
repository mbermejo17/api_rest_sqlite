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


let wss = new WebSocketServer({
    server: httpsServer
  });

wss.on('connection', function connection(ws,req) {
  let ip = req.connection.remoteAddress;
  ws.send('Connected!!!. Your IP '+ip);
  ws.on('message', (data) => {
    console.dir(data);   
    ws.send(`Data received from IP ${ip} : ${data.toString()} `) // echo-server
  })
});
//server.listen(port);