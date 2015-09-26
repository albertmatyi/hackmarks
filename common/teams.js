'use strict';

App.component('teams').expose({
    collection: new Meteor.Collection('teams')
});


App.teams.collection.allow({
    insert: function (userId, doc) {
        doc.ownerId = userId;
        doc.memberIds = [userId];
        var idx = App.teams.collection.find().count();
        doc.image = '/images/mood/' + (idx % 30) + '.jpg'
        var existingTeam = App.teams.collection.findOne({name: doc.name});
        if (existingTeam) {
            var reason = 'Team ' + doc.name + ' already exists. Please join it!';
            App.error.handle({}, reason);
            throw new Meteor.Error('Team exists', reason);
        }
        return userId && doc.name;
    },
    update: function (userId, doc, fieldNames, modifiers) {
        var isOwner = doc.ownerId === userId;
        console.log(arguments);
        var wantsToJoin = fieldNames.length == 1 && modifiers.$push.memberIds === userId;
        //return false;
        return isOwner || wantsToJoin;
    },
    remove: function (userId, doc) {
        return doc.ownerId === userId;
    }
});