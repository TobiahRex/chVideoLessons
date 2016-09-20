const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config/environment');
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
    JWT.verify(body.token, config.secrets.test, (err, payload) => {
      if (err) return res.status(401).send({ Error: 'HACKER! You are not authorized.' });
      req.user = payload;
      req.user.token = body.token;
      res.status(err ? 400 : 200).send(err || { user: req.user });
    });
  });
});

module.exports = router;
