const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Item = require("./item.model");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    cart: {type: [String], default: []}
});

//creates a new user
userSchema.statics.signup = function({ email, password }) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) return reject(err);
            const user = new User({ email, hash });
            user.save(err => {
                if (err) return reject(err);
                resolve(user);
            });
        });
    });
};

/* Checks if user exist user */
userSchema.statics.login = function({email, password}) {
    return new Promise((resolve, reject) => {
        this.findOne({email}, (err, userDoc) => {
            if(err) return reject(err);
            if(userDoc === null) return reject("User not found!");

            bcrypt.hash(password, 10, function(err, hash) {
                if(err) return reject(err);
            });

            bcrypt.compare(password, userDoc.hash, function(err, result) {
                if(err) return reject(err);
                if(!result) return reject("Password didn't match!");

                resolve({
                    email: userDoc.email,
                    createdAt: userDoc.createdAt,
                    _id: userDoc._id,
                    cart: userDoc.cart
                });
            });
        });
    });
};


userSchema.methods.getCartAmount = async function() {
    const items = await Item.getItems(this.cart);
    console.log("getCartAmount items", items);
    const amount = items.reduce((acc, item) => acc + item.price, 0);
    return {error: null, amount};
};

userSchema.methods.clearCart = function() {
    return new Promise((resolve, reject) => {
        this.cart = [];
        this.save(err => {
            if(err) {
                console.log("clearCart err", err);
                return reject("Failed to clear cart");
            }
            return resolve("Success");
        });
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;