const express = require('express');
const router = express.Router();
const User = require("./user.model.js");

//Gets all users, {}. 200-OK
router.get("/api/users", (req, res) => {
    User.find({}, (err, docs) => {
        if (err) return handleError(err, res);
        res.status(200).json(docs);
    });
});

//login
router.post("/api/users/login", (req, res) => {
    console.log("body", req.body);
    User.login(req.body)
        .then( user => {
            res.json(user);
        })
        .catch ( err => {
            handleError(err, res);
        });

});

//Creates a new user
router.post("/api/users/signup", (req, res)=>{
    User.signup(req.body)
        .then( user => {
            res.status(200).json(user);
        })
        .catch( err => {
            return handleError(err, res);
        });
});

//Deletes all users
router.delete("/api/users", (req, res) => {
    User.deleteMany({}, (err, docs) => {
        if (err) return handleError(err, res);
        console.log(docs);
        console.log("success delete many users");
        res.send(204);
    });
});

function handleError(err, res) {
    console.log(err);
    res.sendStatus(500);
}

module.exports = router;