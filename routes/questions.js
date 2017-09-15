var router = require('express').Router();
var Question = require('../controllers/questions.js');
var auth = require('../helper/auth.js').auth;

// Page
router.get('/', auth, Question.index);
router.get('/:id/show', auth, Question.show);
router.get('/:id/edit', auth, Question.edit)

// APIs
router.get('/api/:id/get', auth, Question.get)
router.get('/api/list', auth, Question.list)
router.post('/api/:id/save', auth, Question.update);

module.exports = router;
