var router = require('express').Router();
var Question = require('../controllers/questions.js');

// APIs
router.get('/:id', Question.get);
router.get('/',    Question.all);

module.exports = router;
