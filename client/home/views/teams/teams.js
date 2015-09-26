'use strict';

Template.teamsChooser.events({
    'click .join.btn': function (e) {
        e.preventDefault();

    }
});

Router.route('/teams/chooser', {
    name: 'teamsChooser',
    template: 'teamsChooser'
});

Template.teamsRegister.events({
    'submit .register.form': function (e) {
        e.preventDefault();
        var teamName = $('.team-name').val();

        if (!teamName || teamName.trim()) {
            alert('Please provide a valid name');
        }

        var teamId;
        teamId = App.teams.collection.insert({name: teamName});

        Meteor.users.update(userId, {$set: {'profile.teamId': teamId}});

        Router.go('/');
    }
});

Router.route('/teams/register', {
    name: 'teamsRegister',
    template: 'teamsRegister'
});
Router.route('/teams/join', {
    name: 'teamsJoin',
    template: 'teamsJoin'
});
