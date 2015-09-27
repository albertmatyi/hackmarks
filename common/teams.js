'use strict';
var DEFAULT_SUMMARY = '\nOur awesome project\n========================\n\nI could write pages about it but will instead just summarize it in this short and frank sentence. How cool is that?\n\nPrerequisites\n-------------\n\n    1. Install `node`\n1. Install `grunt`\n`$> sudo npm install -g grunt-cli`\n\n1. Clone the project by\n`git clone http://from.github.lol/`\n\n    Usage\n---------\n\n    Do some stuff\n\n1. Checkout project\n1. `$> cd PROJECT_DIR`\n1. `$> npm install`\n1. `$> grunt` will launch a rocket\n\n\n## Bam it\'s on Baby! We RoCI{\n';

App.component('teams').expose({
    collection: new Meteor.Collection('teams')
});

App.teams.collection.allow({
    insert: function (userId, doc) {
        doc.ownerId = userId;
        doc.memberIds = [userId];
        doc.summary = DEFAULT_SUMMARY;
        doc.tags = ['mobile-shopping', 'javascript', 'payback'];
        doc.funds = 0;
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
