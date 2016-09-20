const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('json-web-token');
const moment = require('moment');
const config = '../../config/environment';

let userSchema = new mongoose.Schema({

});

userSchema.statics.addToToDrink = (toUpdateWith, callback) => {
  User.findById(toUpdateWith._id, (error, databaseUser) => {
    if (error || !databaseUser) return callback(error || { error: 'There is no user' });
    databaseUser.toDrink.push(toUpdateWith.beerData);
    databaseUser.save((error, savedUser) => {
      callback(error, savedUser);
    });
  });
};
userSchema.statics.obtainUsers = (callback) => {
  User.find({}, (error, userList) => {
    if (error || !userList) return callback(error || { error: 'There are no users' });
    return callback(null, userList);
  });
};
userSchema.statics.registerNewUser = (newUserData, callback) => {
  User.findOne({ email: newUserData.email }, (error, databaseUser) => {
    if (error || databaseUser) return callback(error || {error: 'The email is already registered to a user.'});
    bcrypt.hash(newUserData.password, 12, (error, hash) => {
      if (error) return callback(error);
      newUserData.password = hash;
      User.create(newUserData, (error, savedUser) => {
        if (savedUser) savedUser.password = null;
        return callback(error, savedUser);
      });
    });
  });
};
userSchema.statics.deleteUserAccount = (userId, callback) => {
  User.findByIdAndRemove(userId, (error) => {
    callback(error);
  });
};
userSchema.methods.generateToken = () => {
  let payload = {
    _id: this._id,
    exp: moment().add(7, 'day').unix()
  };
  return JWT.encode(config.secrets.source || config.secrets.test, payload, (error, token) => {
    console.log('Error: ', error);
    console.log('Token: ', token);
    return error || token;
  });
};
//Version 1 authenticate
// userSchema.statics.authenticate = function (loginData, callback) {
//     User.findOne({ email : loginData.email }, function (error, databaseUser) {
//         if (error || !databaseUser) return callback(error || { error: 'Authentication failed.'});
//         bcrypt.compare(loginData.password, databaseUser.password, function (error, isGood) {
//             if (error || !isGood) return callback(error || { error: 'Authentication Failed.' });
//             let token = databaseUser.generateToken();
//             databaseUser.password = null;
//             callback(null, token, databaseUser);
//         });
//     });
// };
userSchema.statics.authenticate = (loginData, callback) => {
  User.findOne({ email : loginData.email }, (error, databaseUser) => {
    if (error) return callback(error);
    if(!databaseUser) {
      User.create({email: loginData.email}, (error, savedUser) => {
        return callback(error, savedUser);
      });
    } else {
      return callback(null, databaseUser);
    }
  });
};
userSchema.statics.authorization = () => {
  return (request, response, next) => {
    let token = request.cookies.accessToken;
    JWT.decode(config.secrets.source || config.secrets.test, token, (error, payload) => {
      if (error) return response.status(401).send({ error: 'Authentication failed.' });
      User.findById(payload._id, (error, user) => {
        if (error) return response.status(401).send({ error : 'User not found.' });
        user.password = null;
        request.user = user;
        next();
      });
    });
  };
};

let User = mongoose.model('User', userSchema);
module.exports = User;