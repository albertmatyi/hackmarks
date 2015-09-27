'use strict';

Meteor.publish('admin', function () {
    return App.admin.collection.find();
});

Meteor.methods({
    'admin.stopFunding': function (teamId) {
        if (App.admin.isAdmin(this.userId)) {
            App.admin.collection.remove({_id: 'funding'});
            var score = 0;
            Meteor.users.find({}).forEach(function (user) {
                var sv = user.profile.supportVal;
                sv = parseInt(sv);
                sv = Math.min(999, Math.max(5, sv));
                score += sv;
            });
            App.teams.collection.update(teamId, {$set: {funds: score}});
        } else {
            throw new Meteor.Error('AUTH_EXCEPTION', 'User not authorized');
        }
    },
    'admin.startFunding': function (teamId) {
        if (App.admin.isAdmin(this.userId)) {
            App.admin.collection.insert({_id: 'funding', teamId: teamId});
            Meteor.users.update({}, {$set: {'profile.supportVal': 5}}, {multi: true});
        } else {
            throw new Meteor.Error('AUTH_EXCEPTION', 'User not authorized');
        }
    }
});
