'use strict';

var ALLOW_URLS = {
    '/teams/chooser': true,
    '/teams/register': true,
    '/teams/join': true
};

Router.configure({
    layoutTemplate: 'layout',
    waitOn: function () {
        return Meteor.subscribe('users');
    },
    onBeforeAction: function () {
        var user = Meteor.user();
        if (!user) {
            this.render('login');
        } else if (!user.profile.teamId && !ALLOW_URLS[Router.current().url]) {
            Router.go('teamsChooser');
        } else {
            this.next();
        }
    }
});


//,
//waitOn: function () {
//    return [Meteor.subscribe('teams')]
//}