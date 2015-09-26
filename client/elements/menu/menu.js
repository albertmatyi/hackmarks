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
    {name: 'feed', icon: 'feed'},
    {name: 'browse', icon: 'browse'},
    {name: 'team', icon: 'team'},
    {name: 'logout', icon: 'logout'}
];

Template.menu.helpers({
    active: function () {
        return Session.get('menu.active') ? 'active' : null;
    },
    elements: function () {
        return MENU;

    }
});