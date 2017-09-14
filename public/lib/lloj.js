function main(){

var app = new Vue({
    el: '#LLOJ',
    data: {
        q_id: 0,
        question: question_bank[0]
    },
    created: function(){
        this.q_id = 0;
        this.question = question_bank[this.q_id];
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
        next: function(){
            this.q_id += 1;
            this.question = question_bank[this.q_id];
            Editor.setValue(this.question.default_code);
            this.getUserCode();
        },
        previous: function(){
            this.q_id -= 1;
            this.question = question_bank[this.q_id];
            Editor.setValue(this.question.default_code);
            this.getUserCode();
        },
        getUserCode: function(){
            $.ajax({ 
                url:'/oj/' + this.q_id,
                type:'get',
                success: function(res, status){ 
                    if(res && res.text)
                        Editor.setValue(res.text);
                },
                error: function(res, status){ 
                    console.log(res);
                }
            });
        },
        postUserCode: function(){
            var code = Editor.getValue();
            var data = {"q_id": this.q_id, "text": code};
            $.ajax({ 
                url:'/oj',
                type:'post',
                data: data,
                error: function(res, status){ 
                    console.log(res);
                }
            });
 
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
