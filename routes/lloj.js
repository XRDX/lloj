var router = require('express').Router();
var lloj = require("../controllers/lloj.js");

router.get("/", lloj.index);
router.get("/:id", lloj.get);

module.exports = router;
