const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.cookies.token);
    console.log('check-user');
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.dir(decoded);
        req.userData = decoded;
        next();
    } catch (error) {
        const sessionId = req.cookies.sessionId;
        const Token = req.cookies.token;
        if (sessionId && Token) {
            console.log('cookie: '+ Token);
            next();
        } else {
            res.render("index",{});
        }
    }
};