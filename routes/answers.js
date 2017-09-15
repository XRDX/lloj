var answer = require("../controllers/answers.js");
var router = require('express').Router();
var auth = require('../helper/auth.js').auth;

// apis
router.get("/api/:id/get", auth, answer.get);
router.post("/api", auth, answer.post);

module.exports = router;
