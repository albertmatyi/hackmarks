'use strict';

var ALLOW_URLS = {
    '/teams/chooser': true,
    '/teams/register': true,
    '/teams/join': true
};

Router.configure({
    layoutTemplate: 'layout',
    waitOn: function () {
        return [Meteor.subscribe('teams'), Meteor.subscribe('users')];
    },
    onBeforeAction: function () {
        var user = Meteor.user();
        if (!user) {
            this.render('login');
        } else {
            var hasTeam = user.profile.teamId && App.teams.collection.findOne(user.profile.teamId);
            var isChoosingTeam = ALLOW_URLS[Router.current().url];
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