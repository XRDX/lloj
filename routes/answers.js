var Answer = require("../controllers/answers.js");
var router = require('express').Router();

router.get("/:id",  Answer.get);
router.post("/",    Answer.post);

module.exports = router;
