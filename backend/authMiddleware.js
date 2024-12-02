const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer

    if (!token) return res.status(401).json({ message: 'Token chýba. Prístup zamietnutý.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Neplatný token.' });
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
