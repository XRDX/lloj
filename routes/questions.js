var router = require('express').Router();
var Question = require('../controllers/questions.js');

// APIs
router.get('/js/:id', Question.get_js);
router.get('/js',    Question.all_js);

router.get('/:id', Question.get);

router.get('/:id/edit', Question.edit)
router.post('/:id/save', Question.post);

module.exports = router;
