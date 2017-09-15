var app = new Vue({
    el: '#LLOJ',
    data: {
        q_id: 0,
        question: {}
    },
    created: function(){
        this.q_id = document.getElementById("q_id").innerText;
        this.getQuestion();
    },
    methods: {
        run: function(){
            this.postQuestion();
        },
        postQuestion: function(){
            this.question.default_code = Editor.getValue();
            console.log(this.question);
            this.$http.post('/question/api/' + this.question.id + "/save", 
                    this.question).then(function(res){
                // success
            }, function(res){
                console.log(res);
            })
        },
        makeArray: function(name, item, length){
            while(name.length < length){
                var a = {x: null, y:null};
                name.push(a);
            }
        },
        getQuestion: function(){
            this.$http.get('/question/api/' + this.q_id + '/get').then(function(res){
                if(res){
                    if(res.body == null){
                        this.question = {};
                    } else {
                        this.question = res.body;
                    }
                    var q = this.question;

                    q.id = q.id || 0;
                    q.title = q.title || "";

                    q.description = q.description || "";
                    q.tests = q.tests || [];
                    q.hide_tests = q.hide_tests || [];

                    console.log(q.description);

                    this.makeArray(q.tests, {}, 4);
                    this.makeArray(q.hide_tests, {}, 5);

                    q.default_code = q.default_code || "";

                    Editor.setValue(q.default_code);
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
