'use strict';

Router.route('admin', {
    data: function () {
        return {
            teams: App.teams.collection.find()
        };
    }
});


Template.admin.events({
    'click .team': function (e) {
        Session.set('teams.selected', this._id);
    },
    'click .team .start-funding.btn': function () {
        App.admin.collection.insert({_id: 'funding', teamId: this._id});
    },
    'click .team .stop-funding.btn': function () {
        App.admin.collection.remove({_id: 'funding'});
    }
});

Template.admin.helpers({
    selected: function () {
        return Session.get('teams.selected') == this._id ? 'selected' : null;
    }
});