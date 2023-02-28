const jwt = require('jsonwebtoken');
const secKey = 'secret';

const isLogin = (req, res, next) => {
    if (req.headers && req.headers.token) {
            const decoded = jwt.verify(req.headers.token, secKey);
            req.username = decoded.username;
            next();
           
        
    } else {
        return res.status(401).json({
            message: "Token is missing",
        });
    }
};


module.exports ={isLogin}