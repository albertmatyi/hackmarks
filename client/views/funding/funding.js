'use strict';

var getFundedTeam = function () {
    var funding = App.admin.collection.findOne('funding');
    if (!funding) {
        return null;
    }
    var fundedTeamId = funding.teamId;
    return App.teams.collection.findOne(fundedTeamId);
};

Router.route('funding', {
    data: function () {
        var fundedTeam = getFundedTeam();
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
            //console.log(data);
            return data;
        }
    }
});

Template.fundRaiser.helpers({
    isEnabled: function () {
        var fundedTeam = getFundedTeam();
        return fundedTeam && fundedTeam._id === this.team._id;
    }
});