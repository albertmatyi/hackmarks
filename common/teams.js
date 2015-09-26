'use strict';

App.component('teams').expose({
    collection: new Meteor.Collection('teams')
});


App.teams.collection.allow({
    insert: function (userId, doc) {
        doc.ownerId = userId;
        doc.memberIds = [userId];
        var existingTeam = App.teams.collection.findOne({name: doc.name});
        if (existingTeam) {
            var reason = 'Team ' + doc.name + ' already exists. Please join it!';
            App.error.handle({}, reason);
            throw new Meteor.Error('Team exists', reason);
        }
        return userId && doc.name;
    },
    update: function (userId, doc) {
        return doc.ownerId === userId;
    },
    remove: function (userId, doc) {
        return doc.ownerId === userId;
    }
});