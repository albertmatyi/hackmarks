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
        var supportVal = Meteor.user().profile.supportVal || 5;
        return ~~(supportVal / 10);
    }
});

var saveSupportValue = function (supportPerc) {
    var supportVal = supportPerc * 1000;
    supportVal = ~~Math.max(5, Math.min(999, supportVal));
    var userId = Meteor.userId();
    Meteor.users.update(userId, {$set: {'profile.supportVal': supportVal}});
};
var cancelClick;
var incr = 57;

Template.fundRaiser.events({
    'click .progress': function (e) {
        var $bar = $('.progress');
        var progressBarStart = $bar.offset().left;
        var progressBarWidth = $bar.outerWidth();
        var supportPerc = (e.pageX - progressBarStart) / progressBarWidth;
        saveSupportValue(supportPerc);
    },
    'mousedown .progress': function (e) {
        cancelClick = false;
        var $bar = $('.progress');
        var progressBarStart = $bar.offset().left;
        var progressBarWidth = $bar.outerWidth();
        var calc = function (e) {
            cancelClick = true;
            var supportPerc = (e.pageX - progressBarStart) / progressBarWidth;
            saveSupportValue(supportPerc);
        };
        $('body').on('mousemove', calc)
            .one('mouseup', function () {
                $('body').off('mousemove', calc);
            });
    },
    'touchstart .progress': function (e) {
        cancelClick = false;
        var $bar = $('.progress');
        var progressBarStart = $bar.offset().left;
        var progressBarWidth = $bar.outerWidth();
        var calc = function (e) {
            cancelClick = true;
            var supportPerc = (e.originalEvent.touches[0].pageX - progressBarStart) / progressBarWidth;
            saveSupportValue(supportPerc);
        };
        $('body').on('touchmove', calc)
            .one('touchend', function () {
                $('body').off('touchmove', calc);
            });
    },
    'click .support-value .minus': function () {
        var supportVal = ((Meteor.user().profile.supportVal || 5) - incr);
        supportVal = Math.max(5, supportVal);
        Meteor.users.update(Meteor.userId(), {$set: {'profile.supportVal': supportVal}});
    },
    'click .support-value .plus': function () {
        var supportVal = ((Meteor.user().profile.supportVal || 5) + incr);
        supportVal = Math.min(999, supportVal);
        Meteor.users.update(Meteor.userId(), {$set: {'profile.supportVal': supportVal}});
    }
});