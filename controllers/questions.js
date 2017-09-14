var Questions = require("../database/questions");

/* question */
module.exports = {

    all: function(req, res){
        res.status(200).json(Questions);
    },

    get: function(req, res){
        var q_id = req.params["id"];
        res.status(200).json(Questions[q_id]);
    }
}


