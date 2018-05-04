//const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');


const port = process.env.PORT || 8443;

//const server = http.createServer(app);
https.createServer({
    key: fs.readFileSync('./certs/ssl.key'),
    cert: fs.readFileSync('./certs/ssl.crt')
}, app).listen(port, function() {
    console.log("https server listening on port " + port + "...");
});
//server.listen(port);