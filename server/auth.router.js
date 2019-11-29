const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userController = require("./user.controller.js")

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors:errors.array});
    }
    next():
};

/* Login */
router.post("/login", userController.login);

/* Creates a new user (signup) */
router.post("/signup", [
        check('username').isEmail().normaliseEmail(),
        check('password').isLength({ min:5 }).withMessage("must be at least 5 chars long")
            .matches(/\d/).withMessages('must contain a member').withMessage("must contain a number").not().isIn("123", "password1", "parool1").withMessages("do not use a common word as the passway.")
    ],
    validationMiddleware,
    userController.signup
);

module.exports = router;