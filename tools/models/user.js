"use strict";

let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("json-web-token");
let moment = require("moment");

let JWT_SECRET = process.env.JWT_SECRET;


let userSchema = new mongoose.Schema({

});


userSchema.statics.addToToDrink = function (toUpdateWith, callback) {
    User.findById(toUpdateWith._id, function (error, databaseUser) {
        if (error || !databaseUser) return callback(error || { error: "There is no user" });
        databaseUser.toDrink.push(toUpdateWith.beerData);
        databaseUser.save(function (error, savedUser) {
            callback(error, savedUser);
        });
    });
};


userSchema.statics.obtainUsers = function (callback) {
    User.find({}, function (error, userList) {
        if (error || !userList) return callback(error || { error: "There are no users" });
        return callback(null, userList);
    });
};


userSchema.statics.registerNewUser = function (newUserData, callback) {
    User.findOne({ email: newUserData.email }, function (error, databaseUser) {
        if (error || databaseUser) return callback(error || {error: "The email is already registered to a user."});
        bcrypt.hash(newUserData.password, 12, function (error, hash) {
            if (error) return callback(error);
            newUserData.password = hash;
            User.create(newUserData, function (error, savedUser) {
                if (savedUser) savedUser.password = null;
                return callback(error, savedUser);
            });
        });
    });
};


userSchema.statics.deleteUserAccount = function (userId, callback) {
    User.findByIdAndRemove(userId, function (error) {
        callback(error);
    });
};




userSchema.methods.generateToken = function () {
    let payload = {
        _id: this._id,
        exp: moment().add(7, "day").unix()
    };
    return jwt.encode(JWT_SECRET, payload, function (error, token) {
        console.log("Error: ", error);
        console.log("Token: ", token);
        return error || token;
    });
};

//Version 1 authenticate
// userSchema.statics.authenticate = function (loginData, callback) {
//     User.findOne({ email : loginData.email }, function (error, databaseUser) {
//         if (error || !databaseUser) return callback(error || { error: "Authentication failed."});
//         bcrypt.compare(loginData.password, databaseUser.password, function (error, isGood) {
//             if (error || !isGood) return callback(error || { error: "Authentication Failed." });
//             let token = databaseUser.generateToken();
//             databaseUser.password = null;
//             callback(null, token, databaseUser);
//         });
//     });
// };

userSchema.statics.authenticate = function (loginData, callback) {
    User.findOne({ email : loginData.email }, function (error, databaseUser) {
        if (error) return callback(error);
        if(!databaseUser) {
            User.create({email: loginData.email}, function (error, savedUser) {
                return callback(error, savedUser);
            });
        } else {
            return callback(null, databaseUser);
        }
    });
};

userSchema.statics.authorization = function () {
    return function (request, response, next) {
        let token = request.cookies.accessToken;
        jwt.decode(JWT_SECRET, token, function (error, payload) {
            if (error) return response.status(401).send({ error: "Authentication failed." });
            User.findById(payload._id, function (error, user) {
                if (error) return response.status(401).send({ error : "User not found." });
                user.password = null;
                request.user = user;
                next();
            });
        });
    };
};



let User = mongoose.model("User", userSchema);


module.exports = User;