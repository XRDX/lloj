var router = require('express').Router();

/* GET home page. */
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
    var User = global.dbHandle.getModel('user');  
    var uname = req.body.uname;                
    User.findOne({name:uname},function(err,doc){   
        if(err){                                         
            res.sendStatus(500);
            console.log(err);
        }else if(!doc){                                 
            req.session.error = '用户名不存在';
            res.sendStatus(404);                            

        }else{ 
            if(req.body.upwd != doc.password){     
                req.session.error = "密码错误";
                res.sendStatus(404);

            }else{                                     
                req.session.user = doc;
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
    var User = global.dbHandle.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,doc){   
        if(err){ 
            req.session.error =  '网络异常错误！';
            res.sendStatus(500);
            console.log(err);
        }else if(doc){ 
            req.session.error = '用户名已存在！';
            res.sendStatus(500);
        }else{ 
            User.create({                             
                name: uname,
                password: upwd
            },function(err,doc){ 
                if (err) {
                    res.sendStatus(500);
                    console.log(err);
                } else {
                    req.session.user = doc;
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

module.exports = router;
