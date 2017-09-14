var router = require('express').Router();
var models = require("../database/models");
var User = models.User;
var Answer = models.Answer;

/* GET / */
router.get('/', function(req, res) {
    if(!req.session.user){                     
        res.redirect('/login');
    } else {
        res.redirect('/lloj');
    }
});

/* GET login page. */
router.get("/login", function(req, res){    
    res.render("login", {title:'User Login'});
});

router.post("/login", function(req,res){                        
    var uname = req.body.uname;                
    User.findOne({name: uname},function(err,user){   
        if(err){                                         
            res.sendStatus(500);
            console.log(err);
        }else if(!user){                                 
            req.session.error = '用户名不存在';
            res.sendStatus(404);                            

        }else{ 
            if(req.body.upwd != user.password){     
                req.session.error = "密码错误";
                res.sendStatus(404);

            }else{                                     
                req.session.user = user;
                res.sendStatus(200);

            }
        }
    });
});

/* GET register page. */
router.get("/register", function(req,res){    
    res.render("register",{title:'User register'});
})

router.post("/register", function(req,res){ 
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,user){   
        if(err){ 
            req.session.error =  '网络异常错误！';
            res.sendStatus(500);
            console.log(err);
        }else if(user){ 
            req.session.error = '用户名已存在！';
            res.sendStatus(500);
        }else{ 
            User.create({                             
                name: uname,
                password: upwd,
            },function(err,user){ 
                if (err) {
                    res.sendStatus(500);
                    console.log(err);
                } else {
                    req.session.user = user;
                    req.session.error = '用户名创建成功！';
                    res.sendStatus(200);
                }
            });
        }
    });
});

/* GET lloj page. */
router.get("/lloj", function(req, res){ 
    if(!req.session.user){                     
        req.session.error = "请先登录";
        res.redirect("/login");                
    } else {
        res.render("lloj", {title: 'LLOJ'});         
    }
});

/* GET logout page. */
router.get("/logout",function(req,res){    
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});

router.get("/oj/:id", function(req, res){
    var user = req.session.user;
    var uname = user.name;

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

router.post("/oj", function(req, res){
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
