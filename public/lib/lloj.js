function main(){

var app = new Vue({
    el: '#LLOJ',
    data: {
        q_id: 0,
        question: {}
    },
    created: function(){
        this.q_id = document.getElementById("q_id").innerText;
        this.getQuestion();
        this.getUserCode();
    },
    methods: {
        run: function(){
            var code = Editor.getValue();
            this.postUserCode();
            var f = function(){};
            try {
              eval(code); // Dangerous!!!
              f = eval(this.question.function_name);
            }
            catch(err) {
              console.log("Error: " + err.message);
            }
            
            var tests = this.question.tests;
            var index = 0;

            // Asynchronous
            function update(){
                var test = tests[index];
                test.ret = f(test.x1, test.x2);
                index++;
            }

            for(var i=0; i<tests.length; i++){
                tests[i].ret = "running";
                setTimeout(update, i*666);
            }
        },
        getUserCode: function(){
            this.$http.get( '/answer/' + this.q_id).then(function(res){ 
                if(res && res.body && res.body.text)
                    Editor.setValue(res.body.text);
            }, function(res){
                console.log(res);
            });
        },
        postUserCode: function(){
            var code = Editor.getValue();
            var data = {"q_id": this.q_id, "text": code};
            this.$http.post('/answer', data).then(function(res){
                // success
            }, function(res){
                console.log(res);
            })
        },
        getQuestion: function(){
            this.$http.get('/question/' + this.q_id).then(function(res){
                if(res){
                    this.question = res.body;
                    Editor.setValue(this.question.default_code);
                }
            }, function(res){
                console.log(res);
            })
        }
    }
})

var Editor = CodeMirror.fromTextArea(document.getElementById("Editor"), {
    lineNumbers: true,
    styleActiveLine: true,
    indentUnit: 4,
    theme: "ambiance",
    
    mode: {name: "javascript", globalVars: true},
    
    extraKeys: {"Tab": "autocomplete"},
    gutters: ["CodeMirror-lint-markers"],
    lint: true

});

Editor.setSize('auto', 640);

}
