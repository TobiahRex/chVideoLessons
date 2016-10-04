import express from 'express';
const router = express.Router();
import request from 'request';
const User = require('./user.model');
const auth = require('../../auth/auth.middlewares');

// router.route('/')
// .get((req, res) => User.find({}, res.handle))
// .post((req, res) => User.registerNewUser(req.body, res.handle))
// .put((req, res) => User.updateUserAccount(req.body, res.handle));
//
// router.get('/activeUser', User.authorization(), (req, res) =>  {
//   let activeUser = req.user;
//   res.send(activeUser);
// });
// router.delete('/deleteUser/:userId', (req, res) => User.findByIdAndRemove(req.params.userId, res.handle));

router.route('/cohorts')
.get(auth.isAuthenticated(), (req, res, next) => {
  request.get(`http://test.codinghouse.co/api/cohorts/`, (err, response, body) => {
    return res.status(err ? 400 : 200).send(err || JSON.parse(body));
  }).auth(null, null, true, req.headers.authorization.split(' ')[1]);
});

router.route('/:id')
.get(auth.isAuthenticated(), (req, res, next) => {
  request.get(`http://test.codinghouse.co/api/users/${req.params.id}`, (err, response, body) => {
    return res.status(err ? 400 : 200).send(err || JSON.parse(body));
  }).auth(null, null, true, req.headers.authorization.split(' ')[1]);
});

router.route('/')
.get((req, res) => {
  request.get('http://test.codinghouse.co/api/users/me', (err, response, body) => {
    return res.status(err ? 400 : 200).send(err || body);
  }).auth(null, null, true, req.headers.authorization.split(' ')[1]);
});

module.exports = router;
