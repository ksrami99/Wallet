const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decoded.username;
        next();
    } catch (error) {
        res.josn({
            message: "authorization Failed!",
        });
    }
};


module.exports = {authMiddleware};