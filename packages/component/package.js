/* jshint camelcase: false */
'use strict';
Package.describe({
	version: '1.0.0',
	summary: 'Provides App global variable and `component` method  ' +
	'to expose methods using dotnotation'
});

Package.on_use(function(api, where) {
	api.use(['underscore'], 'client');
	api.use(['underscore'], 'server');
	api.add_files(['component.js'], 'client');
	api.add_files(['component.js'], 'server');

	if (api.export) {
		// to be used for exposing methods / classes to external libraries
		// has to be reexported
		api.export('App');
		// to be used for exposing methods to other files in the package. Must
		// not be reexported
		api.export('_App');
	}
});
