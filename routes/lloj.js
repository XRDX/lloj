var router = require('express').Router();
var models = require("../database/models");
var User = models.User;
var Answer = models.Answer;
var Questions = require("../database/questions");

/* GET lloj index. */
router.get("/lloj", function(req, res){ 
    if(!req.session.user){                     
        req.session.error = "请先登录";
        res.redirect("/login");                
    } else {
        res.render("questions", {title: 'Question List', questions: Questions});         
    }
});

/* GET lloj page */
router.get("/lloj/:id", function(req, res){ 
    var q_id = req.params["id"];
    var title = Questions[q_id].title;
    res.render("lloj", {title: title, q_id: q_id});         
});

/* question */
router.get("/question/:id", function(req, res){
    var q_id = req.params["id"];
    res.status(200).json(Questions[q_id]);
})

/* get user code */
router.get("/answer/:id", function(req, res){
    var uname = req.session.user.name;

    User.findOne({name: uname},function(err,user){

        var q_id = req.params["id"];

        Answer.findOne({q_id: q_id, user_id: user._id}, function(err, answer){
            if(err){ 
                req.session.error =  '网络异常错误！';
                res.sendStatus(500);
                console.log(err);
                return;
            }
            
            if(answer){ 
                res.status(200).json(answer);
                return;
            } 

            res.status(200).json(null);
        });
    });
});

/* post user code */
router.post("/answer", function(req, res){
    var user = req.session.user;
    var uname = user.name;

    User.findOne({name: uname}, function(err, user){

        var q_id = req.body.q_id;
        var text = req.body.text;

        Answer.findOne({q_id: q_id, user_id: user._id}, function(err, answer){
            if(err){ 
                req.session.error =  'Network Error';
                res.sendStatus(500);
                console.log(err);
                return;
            }
            
            if(answer){ 
                answer.text = text;
                answer.save();
                res.status(200).json(answer);
                return;
            }  

            Answer.create({q_id: q_id, user_id: user._id, text: text }, function(err, answer){ 
                if (err) {
                    res.sendStatus(500);
                    console.log(err);
                } else {
                    res.status(200).json(answer);
                }
            });
        });
    });
})

module.exports = router;
