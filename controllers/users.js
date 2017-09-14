var router = require('express').Router();
var models = require("../database/models");
var User = models.User;

module.exports = {

    /* GET / */
    index : function(req, res) {
        if(!req.session.user){                     
            res.redirect('/login');
        } else {
            res.redirect('/lloj');
        }
    },

    /* GET login page. */
    getLogin: function(req, res){    
        res.render("login", {title:'User Login'});
    },

    login: function(req,res){                        
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
    },

        /* GET register page. */
    getRegister: function(req,res){    
        res.render("register",{title:'User register'});
    },

        /* POST register */
    register: function(req,res){ 
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
    },

        /* GET logout page. */
    logout: function(req,res){    
        req.session.user = null;
        req.session.error = null;
        res.redirect("/");
    }
}
