var app = new Vue({
    el: '#app',
    data: {
        eid: eid,
        token: '',
        username: '',
        password: '',
        reg_name: '',
        reg_phone: '',
        event: [],
        reginfo: [],
        apiUrl: 'http://localhost/drupal7/project_rest/event/',
        showLoginModal: false,
        showAddModal: false,
        name: '',
    },
    mounted: function () {
        this.$http.post('http://localhost/drupal7/project_rest/user/token', {}, {
                headers: {
                    'X-CSRF-Token': this.token
                }
            })
            .then(function (response) {
                this.$set(this, 'token', response.data['token'])
            })
            .catch(function (response) {
                console.log(response)
            });
        this.getEvent(eid);
        this.getReginfo(eid);
    },
    methods: {
        getEvent: function (id) {
            this.$http.get(this.apiUrl + id, {
                    headers: {
                        'X-CSRF-Token': this.token
                    }
                })
                .then(function (response) {
                    this.$set(this, 'event', response.data)
                })
                .catch(function (response) {
                    console.log(response)
                });
        },
        getReginfo: function (id) {
            this.$http.get(this.apiUrl + id + '/reginfo', {
                    headers: {
                        'X-CSRF-Token': this.token
                    }
                })
                .then(function (response) {
                    console.log(response.data)
                    this.$set(this, 'reginfo', response.data)
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
        reg: function (name, phone) {
            var body = {
                "name": name,
                "phone": phone,
            };
            this.$http.post('http://localhost/drupal7/project_rest/event/' + this.eid + '/reg', body, {
                    headers: {
                        'X-CSRF-Token': this.token
                    }
                })
                .then(function (response) {
                    this.showAddModal = false
                })
                .catch(function (response) {
                    console.log(response)
                });
        },
    }
})