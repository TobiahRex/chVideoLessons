const express = require('express');
const router = express.Router();
const request = require('request');
const JWT_SECRET = process.env.CHTEST_SECRET;
const JWT = require('jsonwebtoken');

router.route('/')
.post((req, res) => {
  let options = {
    url: 'http://test.codinghouse.co/auth/local/',
    body: req.body,
    json: true
  };
  request.post(options, (err, data, body) => {
    if (!body.token) return res.status(400).send({ Error: 'User not found' });
    JWT.verify(body.token, JWT_SECRET, (err, payload) => {
      if (err) return res.status(401).send({ Error: 'HACKER! You are not authorized.' });
      req.user = payload;
      res.status(err ? 400 : 200).send(err || { user: req.user });
    });
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
