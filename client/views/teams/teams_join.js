'use strict';

Router.route('/teams/join', {
    name: 'teamsJoin',
    template: 'teamsJoin',
    data: function () {
        return {
            teams: App.teams.collection.find()
        };
    }
});

Template.teamsJoin.events({
    'click .team': function (e) {
        Session.set('teams.selected', this._id);
    },
    'click .team .join.btn': function () {
        App.teams.join(this._id);
    }
});

Template.teamsJoin.helpers({
    selected: function () {
        return Session.get('teams.selected') == this._id ? 'selected' : null;
    }
});