const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv').config();

console.log(process.env.decodedTokenTwo);

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.decodedTokenTwo);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
	next();
    } catch(error) {
        res.status(401).json({ error: 'invalid token' });
    }
};