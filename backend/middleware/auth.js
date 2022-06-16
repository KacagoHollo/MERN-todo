const jwt = require('jsonwebtoken');

const auth = ({ block }) => (req, res, next) => {
    const token = req.headers.authorization;
    if (!token && block) return res.sendStatus(401);
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error && block) return res.sendStatus(401);
            // if (block && !user) return res.sendStatus(401);
            res.locals.user = user;
        });
        next();
    }

module.exports = auth;