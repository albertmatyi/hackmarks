'use strict';

Router.route('/login', {});

Session.set('login.register', false);

var getData = function () {
    return {
        email: $('.email.form-control').val(),
        password: $('.password.form-control').val(),
        profile: {
            name: $('.name.form-control').val(),
            image: '/images/user.png'
        }
    };
};
var login = function () {
    var user = getData();
    Meteor.loginWithPassword(user.email, user.password, function (err) {
        if (err) {
            App.error.handle(err, err.message);
        } else {
            Router.go('home');
        }
    });
};
var register = function () {
    var user = getData();
    Accounts.createUser(user, function (err) {
        if (err) {
            App.error.handle(err, err.message);
        } else {
            Router.go('home');
        }
    });
};
Template.login.events({
    'click .register.btn': function (e) {
        Session.set('login.register', true);
    },
    'click .cancel-register.btn': function (e) {
        Session.set('login.register', false);
    },
    'submit .login.form': function (e) {
        e.preventDefault();
        if (Session.get('login.register')) {
            register();
        } else {
            login();
        }
    }
});

Template.login.helpers({
    register: function () {
        return Session.get('login.register');
    }
});