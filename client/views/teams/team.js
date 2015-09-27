'use strict';


Template.team.helpers({
    hideCoins: function () {
        return App.admin.collection.findOne('funding');
    }
});