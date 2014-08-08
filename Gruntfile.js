module.exports = function(grunt) {

	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);

	// require it at the top and pass in the grunt instance
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({

		//to access to the package.json config
		pkg: grunt.file.readJSON('package.json'),

		//clean
		clean: {
			dev: ["dev/"],
			dist: ["dist/"]
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: '0.0.0.0',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: ['dev/']
				}
			},
		},

		copy: {
			index: {
				files: [
					{src: 'source/index.html', dest: 'dev/index.html'}
				]
			},
			dev: {
				files: [
					// includes files within path
					{expand: true, flatten: true, src: ['source/assets/**'], dest: 'dev/assets/', filter: 'isFile'},
					//,{expand: true, flatten: true, src: ['source/css/fonts/**'], dest: 'dev/css/fonts/', filter: 'isFile'}
				]
			},
			dist: {
				files: [
					// includes files within path
					{expand: true, flatten: true, src: ['source/assets/**'], dest: 'dist/assets/', filter: 'isFile'},
					{src: 'source/index.html', dest: 'dist/index.html'}
					//,{expand: true, flatten: true, src: ['source/css/fonts/**'], dest: 'dist/css/fonts/', filter: 'isFile'}
				]
			}
		},

		cssmin: {
			add_banner: {
				options: {
					banner: '/* My minified css file. dist version: <%= pkg.version %> */'
				},
				files: {
					'dist/css/app.min.css': ['dist/css/app.css'],
					'dist/css/main.min.css': ['dist/css/main.css']
				}
			}
		},

		processhtml: {
			dist: {
				files: [{
					expand: true,
					cwd: 'source/',
					src: ['**/*.html'],
					dest: 'dist/',
					ext: '.html'
				}]
			}
		},

		open : {
			path: 'http://127.0.0.1:9000',
			app: 'Google Chrome'
		},

		sass: {
			dev: {
				options: {
					style: 'expanded',
					lineNumbers: true
				},
				files: {
					'dev/css/app.css': 'source/css/app.scss',
					'dev/css/main.css': 'source/css/main.scss'
				}
			},

			dist: {
				options: {
					style: 'compressed',
					lineNumbers: false
				},
				files: {
					'dist/css/app.css': 'source/css/app.scss',
					'dist/css/main.css': 'source/css/main.scss'
				}
			}
		},

		uglify: {
			dev: {
				files: {
					'dev/js/app.js': [
						'source/components/jquery/dist/jquery.min.js'
						,'source/components/retina.js/src/retina.js'
						,'source/js/main.js'
					]
				}
			},
			dist: {
				files: {
					'dist/js/app.min.js': [
						'source/components/jquery/dist/jquery.min.js'
						,'source/components/retina.js/src/retina.js'
						,'source/js/main.js'
					]
				}
			}
		},

		uncss: {
			dist: {
				files: {
					'dist/css/main.min.css': ['dist/index.html'],
					'dist/css/app.min.css': ['dist/index.html'],
				}
			}
		},

		//watch
		watch: {
			options: {
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
				},
			},

			configFiles: {
				files: ['Gruntfile.js', 'package.json'],
				options: {
					reload: true
				}
			},

			html: {
				files: 'source/*.html',
				tasks: 'copy:index',
				options: {
					livereload: true
				}
			},

			css: {
				files: '**/*.scss',
				tasks: 'sass',
				options: {
					livereload: true
				}
			},

			scripts: {
				files: 'source/*.js',
				tasks: 'uglify',
				options: {
					livereload: true
				}
			}
		}
	});

	//Project task(s).
	grunt.registerTask('default', []);

	grunt.registerTask('serve', [
		'clean:dev',
		'copy:dev',
		'copy:index',
		'sass:dev',
		'uglify:dev',
		'connect',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'copy:dist',
		'sass:dist',
		'cssmin',
		'uncss',
		'uglify:dist',
		'processhtml'

	]);

};