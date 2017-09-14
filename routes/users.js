var router = require('express').Router();
var users = require('../controllers/users.js');

router.get('/',          users.index);

router.get('/login',     users.getLogin);
router.post('/login',    users.login)

router.get('/register',  users.getRegister);
router.post('/register', users.register);

router.get('/logout',    users.logout);

module.exports = router;
