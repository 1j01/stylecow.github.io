var stylecow = require('stylecow');
require('codemirror');
require('../node_modules/codemirror/mode/css/css');

stylecow
	.loadPlugin('calc')
	.loadPlugin('color')
	.loadPlugin('custom-media')
	.loadPlugin('custom-selector')
	.loadPlugin('extend')
	.loadPlugin('fixes')
	.loadPlugin('flex')
	.loadPlugin('matches')
	.loadPlugin('msfilter-background-alpha')
	.loadPlugin('msfilter-linear-gradient')
	//.loadPlugin('msfilter-transform')
	.loadPlugin('nested-rules')
	.loadPlugin('prefixes')
	.loadPlugin('rem')
	.loadPlugin('variables')
	.minSupport({
		explorer: false,
		firefox: false,
		chrome: false,
		safari: false,
		opera: false,
		android: false,
		ios: false
	});
