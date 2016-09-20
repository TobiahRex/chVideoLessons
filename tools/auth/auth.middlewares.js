const JWT = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const compose = require('composable-middleware');
const config = require('../config/environment');
const validateJWT = expressJWT({ secret: 'codinghouse-secret' });
const middleWares = {

  // creates req.user if authenticated. Else returns '403'
  isAuthenticated() {
    // Validate JWT
    return compose()
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJWT(req, res, next);
    });
  },

  // Checks if the user role meets the minimum requirements of the route
  hasRole(roleRequired, permissionRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');
    return compose()
    .use(this.isAuthenticated())
    .use((req, res, next) => { // check to see if user meets 'role' requirements.
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        if (permissionRequired) {
          let authorized = false;
          for (let i = 0; i < permissionRequired.length; i++) {
            // changed from req.user.permissions - permissions attached directly to req.user
            if(req.user[permissionRequired[i]]) {
              authorized = true;
              break;
            }
          }
          if (authorized) {
            next();
          } else {
            res.status(403).send({ messages: 'You are FORBIDDEN access.' });
          }
        } else {
          next();
        }
      }
      else {
        res.status(403).send({ messages: 'You are FORBIDDEN access.' });
      }
    });
  },

  // returns a JWT token signed by the app secret.
  signToken(id) {
    return JWT.sign({ _id: id }, (config.secrets.session || config.secrets.test), { expiresInMinutes: 60*5 });
  },

  // Sets token cookie directly for oAuth strategies
  setTokenCookie(req, res) {
    if (!req.user) return res.status(404).send({ message: 'Something went wrong, please try again.'});
    let token = this.signToken(req.user._id, req.user.role);
    res.cookie('codinghousetoken', JSON.stringify(token));
    res.redirect('/');
  }
};

module.exports = middleWares;
