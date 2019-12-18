const User = require("./user.model.js");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    console.log("body", req.body);
    User.login(req.body)
        .then(user => {
            jwt.sign(user, process.env.JWT_KEY, function(err, token) {
                if (err) {
                    console.log("err", err);
                    return res.status(500);
                }
                res.status(200).send({
                    user,
                    token
                });
            });
        })
        .catch(err => {
            console.log("err", err);
            res.send(401);
        });
};

exports.signup = (req, res) => {
    User.signup(req.body)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log("err", err);
            res.sendStatus(500);
        });
};