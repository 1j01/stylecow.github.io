module.exports = function(grunt) {
	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					'js/scripts.js': ['./js/bundler.js']
				}
			},
			options: {
				require: [
					'./node_modules/codemirror/lib/codemirror:codemirror',
					'./node_modules/stylecow:stylecow',
					'./node_modules/stylecow/node_modules/stylecow-plugin-calc:stylecow-plugin-calc',
					'./node_modules/stylecow/node_modules/stylecow-plugin-color:stylecow-plugin-color',
					'./node_modules/stylecow/node_modules/stylecow-plugin-custom-media:stylecow-plugin-custom-media',
					'./node_modules/stylecow/node_modules/stylecow-plugin-custom-selector:stylecow-plugin-custom-selector',
					'./node_modules/stylecow/node_modules/stylecow-plugin-extend:stylecow-plugin-extend',
					'./node_modules/stylecow/node_modules/stylecow-plugin-fixes:stylecow-plugin-fixes',
					'./node_modules/stylecow/node_modules/stylecow-plugin-flex:stylecow-plugin-flex',
					'./node_modules/stylecow/node_modules/stylecow-plugin-matches:stylecow-plugin-matches',
					'./node_modules/stylecow/node_modules/stylecow-plugin-msfilter-background-alpha:stylecow-plugin-msfilter-background-alpha',
					'./node_modules/stylecow/node_modules/stylecow-plugin-msfilter-linear-gradient:stylecow-plugin-msfilter-linear-gradient',
					//'./node_modules/stylecow/node_modules/stylecow-plugin-msfilter-transform:stylecow-plugin-msfilter-transform',
					'./node_modules/stylecow/node_modules/stylecow-plugin-nested-rules:stylecow-plugin-nested-rules',
					'./node_modules/stylecow/node_modules/stylecow-plugin-prefixes:stylecow-plugin-prefixes',
					'./node_modules/stylecow/node_modules/stylecow-plugin-rem:stylecow-plugin-rem',
					'./node_modules/stylecow/node_modules/stylecow-plugin-variables:stylecow-plugin-variables',
				]
			}
		},
		uglify: {
			build: {
				src: 'js/scripts.js',
				dest: 'js/scripts.min.js'
			}
		},
		stylecow: {
			options: require('./stylecow.json'),
			dist: {
				files: {
					'css/styles.min.css': ['./css/styles.css'],
					'css/styles-online.min.css': ['./css/styles-online.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-stylecow');

	grunt.registerTask('default', ['browserify', 'uglify', 'stylecow']);
};
