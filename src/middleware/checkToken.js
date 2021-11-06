const jwt = require('jsonwebtoken');
const configEnv = require('../config/config');
module.exports = function(req,res,next){
    
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send('Debe proveer el token');
    }

    jwt.verify(token, configEnv.JWT_SECRET, (err, value) => {
        if (err) return res.status(500).send('Fallo la autenticacion con token');

        req.user = value;
        next();
    });
}