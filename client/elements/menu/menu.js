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

var MENU = [
    {
        name: 'Feed', icon: 'th-large',
        handler: function () {
            Router.go('feed');
        }
    },
    {
        name: 'Browse', icon: 'search',
        handler: function () {
            Router.go('browse');
        }
    },
    {
        name: 'Team', icon: 'users',
        handler: function () {
            Router.go('home');
        }
    },
    {
        name: 'Logout', icon: 'sign-out',
        handler: function () {
            Meteor.logout();
        }
    }
];

Template.menu.helpers({
    active: function () {
        return Session.get('menu.active') ? 'active' : null;
    },
    elements: function () {
        return MENU;

    }
});