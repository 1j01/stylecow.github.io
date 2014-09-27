module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			build: {
				src: 'js/bundle.js',
				dest: 'js/bundle.min.js'
			}
		},
		browserify: {
			dist: {
				files: {
					'js/bundle.js': ['./js/main.js']
				}
			},
			options: {
				require: [
					'./js/main',
					'stylecow-plugin-color',
					'stylecow-plugin-fixes',
					'stylecow-plugin-flex',
					'stylecow-plugin-initial',
					'stylecow-plugin-linear-gradient',
					'stylecow-plugin-matches',
					'stylecow-plugin-nested-rules',
					'stylecow-plugin-prefixes',
					'stylecow-plugin-rem',
					'stylecow-plugin-variables'
				]
			}
		},
		stylecow: {
			options: {
				"support": {
					"explorer": 10,
					"firefox": 30,
					"chrome": 35,
					"safari": 6,
					"opera": 22,
					"android": 4,
					"ios": 6
				},
				"plugins": [
					"color",
					"fixes",
					"flex",
					"import",
					"initial",
					"linear-gradient",
					"matches",
					"nested-rules",
					"prefixes",
					"rem",
					"variables"
				],
				"code": "normal"
			},
			dist: {
				files: {
					'css/styles.min.css': ['./css/styles.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-stylecow');

	grunt.registerTask('default', ['browserify', 'uglify', 'stylecow']);
};
