module.exports = {

    auth: function(req, res, next){
        if(!req.session.user){
            return res.redirect("/login");
        }
        next();
    },

    admin: function(req, res, next){
        next();
    }

}
