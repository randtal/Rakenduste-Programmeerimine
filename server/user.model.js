const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_PRIVATE_KEY = "very-secret-weak-not-so-strong-password"

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    hash: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

/* checks if user exists */
userSchema.statics.login = function({email, password}){
    return new Promise( (resolve, reject) => {
        this.findOne({email}, (err, userDoc) => {
            if (err) return reject(err);
            if (userDoc === null) return reject("User not found");
            bcrypt.compare(password, userDoc.hash, function(err, result){
                if (err) return reject(err);
                resolve({
                    email: userDoc.email,
                    createdAt: userDoc.createdAt,
                    _id: userDoc._id,
                })
                //jwt.sign({foo: 'bar'}, JWT_PRIVATE_KEY, {algorithm: 'RS256'}, function (err, token){
                  //  console.log(token);
                });
            });
        });
    });
};

/*
userSchema.statics.login = function({email, password}){
    return new Promise( (resolve, reject) => {
        this.findOne({email}, (err, doc) => {
            if (err) return reject(err);
            if (doc === null) return reject("User not found");
            bcrypt.compare(password, doc.hash, function(err, result){
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
};
*/

const User = mongoose.model("User", userSchema);

module.exports = User;