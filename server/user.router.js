const express = require("express");
const router = express.Router();
const User = require("./user.model.js");
const Item = require("./item.model")
const {authMiddleware} = require("./middlewares.js");

router.param("userId", (req, res, next, userId) => {
    User.findById(userId, (err, user) => {
        if(err) return handleError(err, res);
        if(!user) return handleError("user not found", res);

        req.user = user;
        next();
    });
});

router.param("itemId", (req, res, next, itemId) => {
    Item.findById(itemId, (err, item) => {
        if(err) return handleError(err, res);
        if(!item) return handleError("item not found", res);

        req.item = item;
        next();
    });
});

router.get("/:userId", authMiddleware, (req,res) => {
    res.send(req.user);
});

/** Returns an user object*/
router.get("/:userId", authMiddleware, (req,res) => {
    res.send(req.user);
});

/** add an item to a cart */
router.put("/:userId/cart/:itemId", (req, res) => {
    req.user.cart.push(req.item._id.toString());
    req.user.save((err) => {
        if(err) return handleError(err, res);

        res.send(200);
    });
});

/* remove  an item to a cart */
router.delete("/:userId/cart/:itemId", (req, res) => {
    const index = req.user.cart.findIndex(itemId => itemId === req.item._id.toString());
    req.user.cart.splice(index, 1);

    req.user.save((err) => {
        if(err) return handleError(err, res);

        res.send(200);
    });
});

//Gets all users, {}. 200-OK
router.get("/", (req, res) => {
    User.find({}, (err, docs) => {
        if (err) return handleError(err, res);
        res.status(200).json(docs);
    });
});

//Deletes all users
router.delete("/", (req, res) => {
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