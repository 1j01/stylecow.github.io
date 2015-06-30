require('stylecow-core')
	.use(require('stylecow-plugin-calc'))
	.use(require('stylecow-plugin-color'))
	.use(require('stylecow-plugin-custom-media'))
	.use(require('stylecow-plugin-custom-selector'))
	.use(require('stylecow-plugin-extend'))
	.use(require('stylecow-plugin-fixes'))
	.use(require('stylecow-plugin-flex'))
	.use(require('stylecow-plugin-matches'))
	.use(require('stylecow-plugin-msfilter-background-alpha'))
	.use(require('stylecow-plugin-msfilter-linear-gradient'))
	.use(require('stylecow-plugin-msfilter-transform'))
	.use(require('stylecow-plugin-nested-rules'))
	.use(require('stylecow-plugin-prefixes'))
	.use(require('stylecow-plugin-rem'))
	.use(require('stylecow-plugin-variables'))
	.use(require('stylecow-plugin-webkit-gradient'))
	.minSupport({
		explorer: 8,
		firefox: 30,
		chrome: 35,
		safari: 6,
		opera: 22,
		android: 4,
		ios: 6
	});

require('codemirror');

//require dinamic modules for browserify
require('codemirror/mode/css/css');
