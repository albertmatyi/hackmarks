'use strict';

Router.route('/', {
    name: 'home',
    template: 'home',
    waitOn: function () {
        return [Meteor.subscribe('teams'), Meteor.subscribe('users')];
    },
    data: function () {
        var user = Meteor.user();
        if (user) {
            return {
                user: user,
                team: App.teams.collection.findOne(user.profile.teamId)
            }
        }
    }
});