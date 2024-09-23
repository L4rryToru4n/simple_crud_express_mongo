var express = require('express');
var router = express.Router();

const USERS = require('../controllers/users.controller');

/* GET users listing. */
router.get('/search', USERS.findUser);
router.get('/', USERS.getUsers);
router.get('/:user_id', USERS.getUser);

module.exports = router;
