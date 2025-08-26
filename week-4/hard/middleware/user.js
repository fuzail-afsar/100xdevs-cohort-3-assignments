const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constant');

const userMiddleware = (req, res, next) => {
    try {
        const token = req.header('authorization');

        if (!token) throw new Error('Token not found!');

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) throw new Error('Invalid token!');

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
}

module.exports = userMiddleware;