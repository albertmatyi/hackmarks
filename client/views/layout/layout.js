'use strict';

var ALLOW_URLS = {
    '/teams/register': true,
    '/teams/join': true
};

var isFunding = function () {
    return !!App.admin.collection.findOne('funding');
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
        } else if (isFunding()) {
            if (url === '/funding') {
                this.next();
            } else {
                Router.go('funding');
            }
        }
        else {
            var hasTeam = user.profile.teamId && App.teams.collection.findOne(user.profile.teamId);
            var isChoosingTeam = ALLOW_URLS[url];
            if (!hasTeam && !isChoosingTeam) {
                Router.go('teamsRegister');
            } else if ((hasTeam && isChoosingTeam) || url === '/funding') {
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