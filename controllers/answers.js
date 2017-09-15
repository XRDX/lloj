var models = require("../database/models");
var User = models.User;
var Answer = models.Answer;

module.exports = {

    get: function(req, res){
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
    },

    post: function(req, res){
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
    }
}


