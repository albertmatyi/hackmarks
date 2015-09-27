'use strict';

Template.projectEditor.events({
    'click .project-summary .edit.btn': function (e) {
        Session.set('project.summary.edit', true);
    },
    'submit .summary-edit.form': function (e) {
        e.preventDefault();
        var summary = $('.summary.form-control').val();
        App.teams.collection.update(this._id, {$set: {summary: summary}}, function (err) {
            if (err) {
                App.error.handle(err, 'Could not save summary');
                $('.summary.form-control').val(summary);
            } else {
                return Session.set('project.summary.edit', false);
            }
        });
    }
});

Template.projectEditor.helpers({
    summaryEdit: function () {
        return Session.get('project.summary.edit');
    }
});