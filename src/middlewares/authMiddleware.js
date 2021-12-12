var jwt = require("jsonwebtoken");

class AuthMiddleware {
    authenticateUser = async (req, res, next) => {
        try {
            const token = req.header('authorization');
            const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
            if (decodedJwt) {
                next();
            } else {
                res.status(401).send("Token Authentication Failed")
            }
        } catch (err) {
            res.status(401).send(err);
        }
    }
}

module.exports = new AuthMiddleware();