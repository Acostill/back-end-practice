var express = require('express');
var router = express.Router();
var db = require ('../db/queries.js')
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// route to add a new user
router.patch('/:id/edit', db.editUser)

//USER AUTH FUNCTIONS
router.post('/login', passport.authenticate('local'), (req,res)=>res.json(req.user))
router.post('/new', db.registerUser)
router.get('/logout', db.logoutUser)
//loginRequired

module.exports = router;
