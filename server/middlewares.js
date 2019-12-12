const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if(!bearerHeader) {
        console.log("jwt verify error 1");
        return res.send(401);
    }
    const token = bearerHeader.split(" ")[1];
    if(!token) {
        console.log("jwt verify error 2");
        return res.send(401);
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if(err) {
            console.log("jwt verify error 3", err);
            return res.status(401).send(err);
        }

        console.log("decoded2", decoded);
        next();
    });
};

module.exports = {
    authMiddleware
};