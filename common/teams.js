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
        var isMember = doc.memberIds.indexOf(userId) !== -1;
        console.log(arguments);
        var oneField = fieldNames.length === 1;
        var wantsToJoin = oneField && (modifiers.$push && modifiers.$push.memberIds === userId);
        var editSummary = oneField && (modifiers.$set && modifiers.$set.summary);
        var addTag = oneField && (modifiers.$push && modifiers.$push.tags);
        var removeTag = oneField && (modifiers.$pull && modifiers.$pull.tags);
        return wantsToJoin || (isMember && (editSummary || addTag || removeTag));
    },
    remove: function (userId, doc) {
        return doc.ownerId === userId;
    }
});