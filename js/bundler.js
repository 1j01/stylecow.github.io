var stylecow = require('stylecow-core');

require('codemirror');

//require all dinamic modules for browserify
require('../node_modules/codemirror/mode/css/css');

require('stylecow-plugin-calc')(stylecow);
require('stylecow-plugin-color')(stylecow);
require('stylecow-plugin-custom-media')(stylecow);
require('stylecow-plugin-custom-selector')(stylecow);
require('stylecow-plugin-extend')(stylecow);
require('stylecow-plugin-fixes')(stylecow);
require('stylecow-plugin-flex')(stylecow);
require('stylecow-plugin-matches')(stylecow);
require('stylecow-plugin-msfilter-background-alpha')(stylecow);
require('stylecow-plugin-msfilter-linear-gradient')(stylecow);
//require('stylecow-plugin-msfilter-transform')(stylecow);
require('stylecow-plugin-nested-rules')(stylecow);
require('stylecow-plugin-prefixes')(stylecow);
require('stylecow-plugin-rem')(stylecow);
require('stylecow-plugin-variables')(stylecow);

stylecow.minSupport({
	explorer: 8,
	firefox: 30,
	chrome: 35,
	safari: 6,
	opera: 22,
	android: 4,
	ios: 6
});
