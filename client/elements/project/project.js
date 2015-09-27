'use strict';

var sanitize = function (tagName) {
    return tagName
        .trim()
        .replace(/[^a-z1-9 \-]/gi, '')
        .replace(/\s+/, '-').toLowerCase();
};
Template.project.events({
    'click .project-summary .edit.btn': function () {
        Session.set('project.summary.edit', true);
    },
    'submit .summary-edit.form': function (e) {
        e.preventDefault();
        var summary = $('.summary.form-control').val();
        App.teams.collection.update(this._id,
            {$set: {summary: summary}}, function (err) {
                if (err) {
                    App.error.handle(err, 'Could not save summary');
                    $('.summary.form-control').val(summary);
                } else {
                    return Session.set('project.summary.edit', false);
                }
            });
    },
    'click .remove-tag.btn': function (e) {
        var tagName = this;
        var teamId = $(e.currentTarget).data('team-id');
        App.teams.collection.update(teamId, {$pull: {tags: tagName}}, function (err) {
            if (err) {
                App.error.handle(err, 'Could not remove tag.');
            }
        });
    },
    'submit .tag-form': function (e) {
        e.preventDefault();
        var $tag = $('.tag-form .tag-input.form-control');
        var tagName = $tag.val();
        tagName = sanitize(tagName);
        if (!tagName || (this.tags && this.tags.indexOf(tagName) > -1)) {
            App.error.handle({}, 'Invalid tag. Empty or already exists.');
            return;
        }
        App.teams.collection.update(this._id, {$push: {tags: tagName}}, function (err) {
            if (err) {
                App.error.handle(err, 'Could not assign tag.');
            } else {
                $tag.val('');
            }
        });

    }
});

Template.project.onRendered(function () {
    Session.set('project.summary.edit', false);
});

Template.project.helpers({
    summaryEdit: function () {
        return Session.get('project.summary.edit');
    },
    canEdit: function (ctx) {
        ctx = ctx || this;
        return ctx.memberIds.indexOf(Meteor.userId()) > -1;
    }
});