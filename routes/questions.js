var router = require('express').Router();
var Question = require('../controllers/questions.js');

// Page
router.get('/', Question.index);
router.get('/:id/show', Question.show);
router.get('/:id/edit', Question.edit)

// APIs
router.get('/api/:id/get', Question.get)
router.get('/api/list', Question.list)
router.post('/api/:id/save', Question.update);

module.exports = router;
