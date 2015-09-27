'use strict';

Template.menu.events({
    'click .trigger.btn': function (e) {
        Session.set('menu.active', true);
    },
    'click .xlose.btn': function (e) {
        Session.set('menu.active', false);
    },
    'click .pane-wrapper': function (e) {
        if (!e.defaultPrevented) {
            Session.set('menu.active', false);
        }
    },
    'click .pane': function (e) {
        e.stopPropagation();
    }
});

var MENU = {
    feed: {
        _id: 'feed',
        name: 'Feed', icon: 'th-large',
        handler: function () {
            alert('Two hamsters are still coding on the basement on this feature');
            Router.go('feed');
        }
    },
    browser: {
        _id: 'browser',
        name: 'Browse teams', icon: 'search',
        handler: function () {
            Router.go('browser');
            //alert('Two hamsters are still coding up this feature');
        }
    },
    team: {
        _id: 'team',
        name: 'My Team', icon: 'users',
        handler: function () {
            Router.go('home');
        }
    },
    logout: {
        _id: 'logout',
        name: 'Logout', icon: 'sign-out',
        handler: function () {
            Meteor.logout();
        }
    }
};

Template.menu.helpers({
    active: function () {
        return Session.get('menu.active') ? 'active' : null;
    },
    elements: function () {
        return _.map(MENU, _.identity);
    },
    title: function () {
        return Session.get('menu.title');
    }
});

Template.menuElement.events({
    'click .element': function (e) {
        e.preventDefault();
        var menuEl = MENU[this._id];
        menuEl.handler(e);
        Session.set('menu.active', false);
        Session.set('menu.title', menuEl.name);
    }
});