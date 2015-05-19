var stylecow = require('stylecow');

require('codemirror');

//require all dinamic modules for browserify
require('../node_modules/codemirror/mode/css/css');

require('../node_modules/stylecow/node_modules/stylecow-plugin-calc')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-color')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-custom-media')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-custom-selector')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-extend')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-fixes')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-flex')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-matches')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-msfilter-background-alpha')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-msfilter-linear-gradient')(stylecow);
//'./node_modules/stylecow/node_modules/stylecow-plugin-msfilter-transform',
require('../node_modules/stylecow/node_modules/stylecow-plugin-nested-rules')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-prefixes')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-rem')(stylecow);
require('../node_modules/stylecow/node_modules/stylecow-plugin-variables')(stylecow);

stylecow.minSupport({
	explorer: false,
	firefox: false,
	chrome: false,
	safari: false,
	opera: false,
	android: false,
	ios: false
});
