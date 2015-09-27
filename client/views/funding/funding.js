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

var SUPPORT_STRINGS = {
    0: 'Well that\'s also something',
    10: 'You can do better',
    50: 'Show them some support',
    100: 'We\'re getting there',
    200: 'Cool idea huh?',
    400: 'Bangin team!',
    600: 'The real deal',
    800: 'You are getting a beer for this',
    990: 'I am the #1 fan of the project'
};

Template.fundRaiser.helpers({
    isEnabled: function () {
        var fundedTeam = getFundedTeam();
        return fundedTeam && fundedTeam._id === this.team._id;
    },
    supportValue: function () {
        return Meteor.user().profile.supportVal || 5;
    },
    supportString: function () {
        var supportString;
        var supportVal = Meteor.user().profile.supportVal || 5;
        _.each(SUPPORT_STRINGS, function (str, val) {
            val = parseInt(val);
            if (supportVal > val) {
                supportString = str;
            }
        });
        return supportString;
    },
    supportPerc: function () {
        return ~~(Session.get('funding.supportPerc') * 100);
    }
});

var saveSupportValue = function (supportPerc) {
    Session.set('funding.supportPerc', supportPerc);
    var supportVal = supportPerc * 1000;
    supportVal = ~~Math.max(5, Math.min(999, supportVal));
    var userId = Meteor.userId();
    Meteor.users.update(userId, {$set: {'profile.supportVal': supportVal}});
};

Template.fundRaiser.onRendered(function () {
    saveSupportValue(0.01);
});

Template.fundRaiser.events({
    'click .progress': function (e) {
        var $bar = $('.progress');
        var progressBarStart = $bar.offset().left;
        var progressBarWidth = $bar.outerWidth();
        var supportPerc = (e.pageX - progressBarStart) / progressBarWidth;
        saveSupportValue(supportPerc);
    }
});