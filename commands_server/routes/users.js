var express = require('express');
var router = express.Router();

const USERS = require('../controllers/users.controller');

/* GET users listing. */
router.post('/create', USERS.createUser);
router.put('/update/:user_id', USERS.updateUser);
router.delete('/delete/:user_id', USERS.deleteUser);
router.post('/bulk-write', USERS.bulkWriteUser);

module.exports = router;
