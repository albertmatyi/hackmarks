'use strict';

Meteor.publish('admin', function () {
    return App.admin.collection.find();
});