'use strict';

App.component('error').expose({
    handle: function (errorObj, message) {
        console.log(errorObj);
        if (message) {
            message
            if (Meteor.isClient) {
                alert(message);
            }
        }
    }
});