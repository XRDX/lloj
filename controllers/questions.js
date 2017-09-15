var Question = require("../database/models.js").Question;

/* question */
module.exports = {

    // pages
    index: function(req, res){
        res.render("questions");
    },

    show: function(req, res){
        var q_id = req.params["id"];
        Question.findOne({id: q_id}, function(err, qstn){
            res.render("question", {title: qstn.title, q_id: q_id});         
        });
    },

    edit: function(req, res){
        var q_id = req.params["id"];
        res.render("question_edit", {title: "修改问题", q_id: q_id})
    },

        // apis
    list: function(req, res){
        Question
            .find({})
            .exec(function(err, qstns){
                res.status(200).json(qstns);
            })
    },

    get: function(req, res){
        var q_id = req.params["id"];
        Question.findOne({id: q_id}, function(err, qstn){
            res.status(200).json(qstn);
        });
    },

    update: function(req, res){
        var qstn = req.body;
        Question
            .findOne({id: qstn.id}, function(err, q){
                if(q){
                    q.title = qstn.title || q.title;
                    q.description = qstn.description || q.description;
                    q.default_code = qstn.default_code || q.default_code;
                    q.tests = qstn.tests || q.tests;
                    q.function_name = qstn.function_name || q.function_name;
                    q.hide_tests = qstn.hide_tests || q.hide_tests;
                    q.save(function(err, status){
                        if(err){
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    })
                } else {
                    Question.create(qstn, function(err, qstn){
                        if(err){
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    })
                }
            })
    }
}


