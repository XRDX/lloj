var answer = require("../controllers/answers.js");
var router = require('express').Router();

// apis
router.get("/api/:id/get",  answer.get);
router.post("/api",    answer.post);

module.exports = router;
