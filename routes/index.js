var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res) {
    if(!req.session.user){                     
        res.render('index', {title: 'LLOJ'});
    } else {
        res.render("home", {title: 'Home'});         
    }
});

/* GET login page. */
router.get("/login", function(req, res){    
    res.render("login", {title:'User Login'});
});

router.post("/login", function(req,res){                        
    console.log("here");
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
            res.sendStatus(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){ 
            res.sendStatus(500);
            req.session.error = '用户名已存在！';
        }else{ 
            User.create({                             
                name: uname,
                password: upwd
            },function(err,doc){ 
                if (err) {
                    res.sendStatus(500);
                    console.log(err);
                } else {
                    res.sendStatus(200);
                    req.session.error = '用户名创建成功！';
                }
            });
        }
    });
});

/* GET home page. */
router.get("/home", function(req, res){ 
    if(!req.session.user){                     
        req.session.error = "请先登录";
        res.redirect("/login");                
    } else {
        res.render("home", {title: 'Home'});         
    }
});

/* GET logout page. */
router.get("/logout",function(req,res){    
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});

module.exports = router;
