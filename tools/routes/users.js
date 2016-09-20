const express = require('express');
const router = express.Router();
const async = require('async');
const User = require('../models/user');

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

router.route('/', )

module.exports = router;
