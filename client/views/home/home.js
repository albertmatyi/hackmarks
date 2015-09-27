'use strict';

Router.route('/', {
    name: 'home',
    template: 'home',
    waitOn: function () {
        return [Meteor.subscribe('teams'), Meteor.subscribe('users')];
    },
    data: function () {
        var user = Meteor.user();
        Session.set('menu.title', 'My team');
        if (user) {
            return {
                user: user,
                team: App.teams.collection.findOne(user.profile.teamId)
            }
        }
    }
});

Template.teamMembers.helpers({
    teamMembers: function () {
        var userIds = this.memberIds;
        return Meteor.users.find({_id: {$in: userIds}});
    }
});
