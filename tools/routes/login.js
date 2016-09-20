const express = require('express');
const router = express.router();
const request = require('request');
const config = require('../../config/environment');
const auth = require('../../auth/auth.service');

router.route('/')
.post((req, res) => {
  let options = {
    url: 'http://test.codinghouse.co/auth/local/',
    body: req.body,
    json: true
  };
  request.post(options, (err, data, body) => {
    console.log('body: ', JSON.parse(body));
    return res.status(err ? 401 : 200).send(err || body);
  });
});

module.exports = router;

// var express = require('express');
// var controller = require('./user.controller');
// var config = require('../../config/environment');
// var auth = require('../../auth/auth.service');
// var request = require('request');
//
// var router = express.Router();
//
// router.get('/', function(req, res, next) {
//   request.get(config.api + '/api/users/me/', function(err, data, body){
//     return res.status(err ? 401 : 200).json(err || body);
//   }).auth(null, null, true, req.headers.authorization.split(' ')[1]);
// });
//
// router.get('/:id', auth.isAuthenticated(), function(req, res, next) {
//   request.get(config.api + '/api/users/' + req.params.id, function(err, data, body){
//     return res.status(err ? 401 : 200).json(err || body);
//   }).auth(null, null, true, req.headers.authorization.split(' ')[1]);
// });
