'use strict';

Meteor.publish('teams', function () {
    console.log('publishing teams');

    return App.teams.collection.find();
});
