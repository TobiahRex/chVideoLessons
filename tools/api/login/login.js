import express from 'express';
import request from 'request';
import JWT from 'jsonwebtoken';
import config from '../../config/environment';
const router = express.Router();

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

export default router;
