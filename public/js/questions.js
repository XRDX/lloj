var app = new Vue({
    el: '#Questions',
    data: {
        questions:[] 
    },
    created: function(){
        this.getQuestions();
    },
    methods: {
        getQuestions: function(){
            this.$http.get('/question/api/list').then(function(res){
                if(res){
                    if(res.body != null){
                        for(q in res.body){
                            this.questions.push(res.body[q]);
                        }
                    }
                }
            }, function(res){
                console.log(res);
            })
        }
    }
})


