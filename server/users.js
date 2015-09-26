'use strict';

Meteor.publish('users', function () {
    return Meteor.users.find({}, {
        fields: {
            profile: 1,
            'services.twitter.profile_image_url': 1
        }
    });
});