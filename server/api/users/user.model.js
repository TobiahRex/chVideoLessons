import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import JWT from 'json-web-token';
import moment from 'moment';
const config = require('../../config/environment');

let userSchema = new mongoose.Schema({

});

userSchema.statics.addToToDrink = (reqObj, cb) => {
  User.findById(reqObj._id).exec()
  .then((dbUser) => dbUser.toDrink.push(reqObj.beerData).save())
  .then((savedUser) => cb(null, savedUser))
  .catch((err) => cb({ Error: `@ addToDrink = ${err}` }));
};

userSchema.statics.registerNewUser = (newUserData, cb) => {
  User.findOne({ email: newUserData.email }).exec().then((dbUser) => {
    if (dbUser) return cb({ Error: 'That user already exits.' });
    bcrypt.hash(newUserData.password, 12, (err, hash) => {
      if (err) return cb(err);
      newUserData.password = hash;
    });
    User.create(newUserData);
  })
  .then((newUser) => {
    newUser.password = null;
    return cb(null, newUser);
  })
  .catch((err) => cb({ Error: `register New User Error ${err}` }));
};

userSchema.methods.generateToken = () => {
  let payload = {
    _id: this._id,
    exp: moment().add(7, 'day').unix()
  };
  return JWT.encode(config.secrets.source || config.secrets.test, payload, (err, token) => {
    return err || token;
  });
};
//Version 1 authenticate
// userSchema.statics.authenticate = (loginData, cb) => {
//   User.findOne({ email : loginData.email }).exec()
//   .then((dbUser) => {
//     bcrypt.compare(loginData.password, dbUser.password, (err, isGood) => {
//       if (err || !isGood) return cb(err || { Error: 'Authentication Failed.' });
//       let token = dbUser.generateToken();
//       dbUser.password = null;
//       cb(null, token, dbUser);
//   })
//   .catch((err) => cb(err));
//   });
// };
userSchema.statics.authenticate = (loginData, cb) => {
  User.findOne({ email : loginData.email }).exec()
  .then((dbUser) => cb(null, dbUser))
  .catch((err) => cb(err));
};

userSchema.statics.authorization = () => {
  return (req, res, next) => {
    let token = req.cookies.accessToken;
    JWT.decode(config.secrets.source || config.secrets.test, token, (err, payload) => {
      if (err) return res.status(401).send({ Error: 'Authentication failed.' });
      User.findById(payload._id).exec()
      .then((dbUser) => {
        dbUser.password = null;
        req.user = dbUser;
        next();
      })
      .catch((err) => res.status(401).send({ Error: 'User not found.' }));
    });
  };
};

let User = mongoose.model('User', userSchema);
export default User;
