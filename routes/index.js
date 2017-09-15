var users = require("./users.js");
var answer = require("./answers.js");
var question = require("./questions.js");

module.exports = function(app){

    app.use("/answer", answer);
    app.use("/question", question);

    app.use(users);
}

