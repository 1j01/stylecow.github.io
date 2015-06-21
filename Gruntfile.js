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
					'./node_modules/stylecow-core:stylecow'
				],
				browserifyOptions: {
					ignoreMissing: true
				}
			}
		},
		uglify: {
			build: {
				src: 'js/scripts.js',
				dest: 'js/scripts.min.js'
			}
		},
		clean: [
			'js/scripts.js'
		],
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
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-stylecow');

	grunt.registerTask('default', ['browserify', 'uglify', 'clean', 'stylecow']);
};
