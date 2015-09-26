'use strict';

App.component('error').expose({
    handle: function (errorObj, message) {
        console.log(errorObj);
        if (message) {
            console.log('Error: ' + message);
            if (Meteor.isClient) {
                alert(message);
            }
        }
    }
});