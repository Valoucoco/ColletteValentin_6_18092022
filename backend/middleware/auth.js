const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv').config();

console.log("coucou");
console.log("le mot de passe est", `${process.env.secretKey}`);

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = process.env.decodedToken;
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
	next();
    } catch(error) {
        res.status(401).json({ error: 'invalid token' });
    }
};