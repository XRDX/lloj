var Questions = require("../database/questions.js");

module.exports = {

    index: function(req, res){ 
        res.render("qlist", {title: 'Question List', questions: Questions});         
    },

    get: function(req, res){ 
        var q_id = req.params["id"];
        var title = Questions[q_id].title;
        res.render("lloj", {title: title, q_id: q_id});         
    }
}
