'use strict';

Router.route('funding', {
    data: function () {
        var funding = App.admin.collection.findOne('funding');
        if (!funding) {
            return;
        }
        var fundedTeamId = funding.teamId;
        var fundedTeam = App.teams.collection.findOne(fundedTeamId);
        if (!fundedTeam) {
            return;
        }
        var user = Meteor.user();
        if (user) {
            Session.set('menu.title', 'Fundraising session');
            var data = {
                user: user,
                team: fundedTeam
            };
            console.log(data);
            return data;
        }
    }
});