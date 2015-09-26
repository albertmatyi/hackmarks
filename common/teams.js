'use strict';

App.component('teams').expose({
    collection: new Meteor.Collection('teams')
});


App.teams.collection.allow({
    insert: function (userId, doc) {
        doc.ownerId = userId;
        doc.memberIds = [userId];
        return userId && doc.name;
    },
    update: function (userId, doc) {
        return doc.ownerId === userId;
    },
    remove: function (userId, doc) {
        return doc.ownerId === userId;
    }
});