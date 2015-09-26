'use strict';

// globally available / accessible
App = {};
// available only to dependents
_App = {};

var component = function(name) {
	var parts = name.split(/\./);
	var pkg = this;
	_.each(parts, function(part) {
		if (typeof pkg[part] === 'undefined') {
			pkg[part] = {};
		}
		pkg = pkg[part];
	});
	return {
		expose: function(methods) {
			_.extend(pkg, methods);
			return pkg;
		}
	};
};

App.component = component;
_App.component = component;
