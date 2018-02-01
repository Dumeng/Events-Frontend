Vue.component('card-grid', {
    template: '#card-template',
    props: ['cards-data']
})

var app = new Vue({
    el: '#app',
    data: {
        token:'',
        username:'',
        email:'',
        password:'',
        name:'',
        cardsData: [],
        apiUrl: 'http://localhost/drupal7/project_rest/event',
        showLoginModal: false,
        showRegModal: false,
    },
    mounted: function () {
        this.$http.post('http://localhost/drupal7/project_rest/user/token',{},{method:'POST'})
        .then(function (response) {
            this.$set(this,'token', response.data['token'])
        })
        .catch(function (response) {
            console.log(response)
        });
        this.getEvent(0, 0);
    },
    methods: {
        getEvent: function (themeid, typeid) {
            this.$http.get(this.apiUrl, {
                    headers: {
                        'X-CSRF-Token': this.$token
                    }
                })
                .then(function (response) {
                    console.log(response.data)
                    this.$set(this,'cardsData', response.data)
                })
                .catch(function (response) {
                    console.log(response)
                });
        },
        login: function (usr, pwd) {
            var body = {
                "username": usr,
                "password": pwd,
            };
            this.$http.post('http://localhost/drupal7/project_rest/user/login', body, {
                    headers: {
                        'X-CSRF-Token': this.token
                    }
                })
                .then(function (response) {
                    this.$set(this, 'token', response.data['token'])
                    this.$set(this, 'name', response.data['user']['name'])
                    this.showLoginModal = false
                })
                .catch(function (response) {
                    console.log(response)
                });
        },
        newuser: function(usr, pwd, eml){
            var body = {
                "username": usr,
                "password": pwd,
                "email":eml,
            };
            this.$http.post('http://localhost/drupal7/project_rest/user/register', body, {
                    headers: {
                        'X-CSRF-Token': this.token
                    }
                })
                .then(function (response) {
                    this.$set(this, 'token', response.data['token'])
                    this.$set(this, 'name', response.data['user']['name'])
                    this.showLoginModal = false
                })
                .catch(function (response) {
                    console.log(response)
                });
        },
    }
})