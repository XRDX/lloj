var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var answerSchema = new Schema({
    q_id:    {type: String, require: true},
    user_id: {type: Schema.Types.ObjectId, required: true},
    text:    String,
    solved:  Boolean
})

var userSchema = new Schema({
    name:     {type:String, required:true},
    password: {type:String, required:true}
})

var testSchema = new Schema({
    x: Schema.Types.Mixed,
    y: Schema.Types.Mixed
})

var questionSchema = new Schema({
    id: String,
    title: String,
    description: String,
    default_code: String,
    tests: [testSchema],
    hide_tests: [testSchema],
    function_name: String
})

module.exports = {
    User: mongoose.model("user", userSchema),
    Answer: mongoose.model("answer", answerSchema),
    Test: mongoose.model("test", testSchema),
    Question: mongoose.model("question", questionSchema)
}

