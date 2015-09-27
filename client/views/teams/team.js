'use strict';


Template.team.helpers({
    hideCoins: function () {
        return App.admin.collection.findOne('funding');
    }
});

Router.route('team', {
    path: '/team/:_id',
    template: 'teamPage',
    data: function () {
        return {
            team: App.teams.collection.findOne(this.params._id),
            user: Meteor.user()
        };
    }
});