'use strict';

App.component('admin').expose({
    collection: new Meteor.Collection('admin'),
    isAdmin: function (userId) {
        var user = Meteor.users.findOne(userId);
        return user &&
            user.emails &&
            user.emails[0] &&
            user.emails[0].address === 'admin@super.com';
    }
});

App.admin.collection.allow({
    insert: function (userId) {
        return App.admin.isAdmin(userId);
    },
    update: function (userId) {
        return App.admin.isAdmin(userId);
    },
    remove: function (userId) {
        return App.admin.isAdmin(userId);
    }
});