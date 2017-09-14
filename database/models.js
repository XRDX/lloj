var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    q_id:    {type: String, require: true},
    user_id: {type: Schema.Types.ObjectId, required: true},
    text:    String
})

var userSchema = new Schema({
    name:     {type:String, required:true},
    password: {type:String, required:true}
})

module.exports = {
    User: mongoose.model("user", userSchema),
    Answer: mongoose.model("answer", answerSchema)
}

