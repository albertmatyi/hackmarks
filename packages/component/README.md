# Component


## About

This is a base package that creates the `App` global variable and where all
other components/modules register themselves.


## API

### `App.component(packageName)`

It creates the objectpath in App based on the packageName.
Basically from the string `a.b.c.d` will create the object path
`App.a.b.c.d` = {} - taking care of already existing items in the path.

In general it should be used like:

	App.component('media.file').expose({
		maxSize: '5M',
		upload: function () { /* CODE */ }
	});

And then the exposed things will be accessible for example at:
`App.media.file.upload(...)`

#### Parameters

* `packageName` - the name of the package to be created (using dot notation)

#### Returns

An object that should be used for chaining commands having the following method:

* `expose` - a method with the signature `expose(propsAndMethods)`,
where `propsAndMethods` should contain all properties and methods a component
wishes to expose

