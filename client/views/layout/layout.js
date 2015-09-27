'use strict';

var ALLOW_URLS = {
    '/teams/chooser': true,
    '/teams/register': true,
    '/teams/join': true
};

Router.configure({
    layoutTemplate: 'layout',
    waitOn: function () {
        return [Meteor.subscribe('teams'), Meteor.subscribe('users'), Meteor.subscribe('admin')];
    },
    onBeforeAction: function () {
        var user = Meteor.user();
        var url = Router.current().url;
        if (!user) {
            this.render('login');
        } else if (App.admin.isAdmin(Meteor.userId())) {
            if (url === '/admin') {
                this.next();
            } else {
                Router.go('admin');
            }
        } else {
            var hasTeam = user.profile.teamId && App.teams.collection.findOne(user.profile.teamId);
            var isChoosingTeam = ALLOW_URLS[url];
            if (!hasTeam && !isChoosingTeam) {
                Router.go('teamsChooser');
            } else if (hasTeam && isChoosingTeam) {
                Router.go('home');
            } else {
                this.next();
            }
        }
    }
});


//,
//waitOn: function () {
//    return [Meteor.subscribe('teams')]
//}