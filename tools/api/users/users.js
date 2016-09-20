const express = require('express');
const router = express.Router();
const async = require('async');
const User = require('./user.model');
const request = require('request');
const auth = require('../../auth/auth.middlewares');

// router.route('/')
// .get((req, res) => User.obtainUsers(res.handle))
// .post((req, res) => User.registerNewUser(req.body, res.handle))
// .put((req, res) => User.updateUserAccount(req.body, res.handle));
//
// router.get('/activeUser', User.authorization(), (req, res) =>  {
//   let activeUser = req.user;
//   res.send(activeUser);
// });
// router.delete('/deleteUser/:userId',(req, res) =>  {
//   User.deleteUserAccount(req.params.userId,(error) =>  {
//     if (error) res.status(400).send(error);
//     res.send('The user has been deleted');
//   });
// });

router.route('/')
.get((req, res) => {
  request.get('http://test.codinghouse.co/api/users/me', (err, body, data) => {
    return res.status(err ? 400 : 200).send(err || body);
  }).auth(null, null, true, req.headers.authorization.split(' ')[1]);
});

router.route('/:id')
.get(auth.isAuthenticated(), (req, res, next) => {

  request.get(`http://test.codinghouse.co/api/users/${req.params.id}`, (err, data, body) => {
    return res.status(err ? 400 : 200).send(err || JSON.parse(body));
  }).auth(null, null, true, req.headers.authorization.split(' ')[1]);
});

module.exports = router;
