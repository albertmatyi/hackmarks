'use strict';

Template.user.helpers({
    image: function () {
        return this.services &&
        this.services.twitter &&
        this.services.twitter.profile_image_url ?
            this.services.twitter.profile_image_url : this.profile.image;
    },
    name: function () {
        return this.profile.name;
    }
});