'use strict';

Router.route('browser', {
    data: function () {
        return {
            teams: App.teams.collection.find({}, {sort: {funds: -1}})
        };
    }
});

Template.browser.events({
    'click .team': function (e) {
        Router.go('team', this);
    }
});