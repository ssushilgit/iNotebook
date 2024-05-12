var jwt = require('jsonwebtoken'); // jwt nodejs
JWT_SECRET = "Sushilisagoodbd$boy"


const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log("Decoded JWT data:", data);
        req.user = data.user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};


module.exports = fetchuser;