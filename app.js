const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ApiRoutes = require("./routes/api");
const userRoutes = require('./routes/user');
const MntRoutes = require('./routes/mnt');
const fileUpload = require('express-fileupload');
const path = require('path');

app.use(morgan("dev"));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.use(fileUpload());

// Header settings
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("X-Powered-By", "Custom Engine");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes handle requests
/* app.get('/', function(req, res,next) {
    let cookie = req.cookies.sessionId;
    console.log('cookie: '+ cookie);
    if (cookie === undefined) {
        res.render('index', { title: 'Logon', message: '' });
    }else{
        console.log('hola');
        res.render('dashboard', { title: 'Dashboard', message: '' });
    }  
});
 */
app.use("/", userRoutes);
app.use("/api", ApiRoutes);
app.use("/mnt",MntRoutes);


// Error handle requests
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;