'use strict';

Router.route('browser', {
    data: function () {
        var selector = {};
        var st = Session.get('browser.searchTerm');
        if (st) {
            selector = {
                $or: [{
                    name: new RegExp(st)
                }, {
                    tags: new RegExp(st)
                }]
            };
        }
        return {
            teams: App.teams.collection.find(selector, {sort: {funds: -1}})
        };
    }
});

Template.browser.events({
    'click .team': function (e) {
        Router.go('team', this);
    },
    'keyup .searchbar .form-control': function (e) {
        var searchTerm = $(e.currentTarget).val();
        searchTerm = searchTerm.trim();
        Session.set('browser.searchTerm', searchTerm);
    }
});

