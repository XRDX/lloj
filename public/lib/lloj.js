function main(){

var app = new Vue({
    el: '#LLOJ',
    data: {
        id: 0,
        bank: question_bank
    },
    methods: {
        run: function(){
            var data = this.bank[this.id];

            var code = Editor.getValue();
            var f = function(){};
            try {
              eval(code); // Dangerous!!!
              f = eval(data.function_name);
            }
            catch(err) {
              console.log("Error: " + err.message);
            }
            
            var tests = data.tests;
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
            this.bank[this.id].user_code = Editor.getValue();
            this.id += 1;
            var data = this.bank[this.id]
            Editor.setValue(data.user_code || data.default_code);
        },
        previous: function(){
            this.bank[this.id].user_code = Editor.getValue();
            this.id -= 1;
            var data = this.bank[this.id]
            Editor.setValue(data.user_code || data.default_code);
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
