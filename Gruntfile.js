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
			build: ["build/"]
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
					base: ['dev']
				}
			},
		},

		copy: {
			dev: {
				files: [
					// includes files within path
					{expand: true, flatten: true, src: ['source/assets/**'], dest: 'dev/assets/', filter: 'isFile'}
					//,{expand: true, flatten: true, src: ['source/css/fonts/**'], dest: 'dev/css/fonts/', filter: 'isFile'}
				]
			},
			build: {
				files: [
					// includes files within path
					{expand: true, flatten: true, src: ['source/assets/**'], dest: 'build/assets/', filter: 'isFile'}
					//,{expand: true, flatten: true, src: ['source/css/fonts/**'], dest: 'build/css/fonts/', filter: 'isFile'}
				]
			}
		},

		cssmin: {
			add_banner: {
				options: {
					banner: '/* My minified css file. build version: <%= pkg.version %> */'
				},
				files: {
					'dist/css/app.css': ['source/css/app.css'],
					'dist/css/main.css': ['source/css/main.css']
				}
			}
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

			build: {
				options: {
					style: 'compressed',
					lineNumbers: false
				},
				files: {
					'build/css/main.min.css': ['source/css/main.scss', 'source/css/app.scss']
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
			prod: {
				files: {
					'build/js/app.min.js': [
						'source/components/jquery/dist/jquery.min.js'
						,'source/components/retina.js/src/retina.js'
						,'source/js/main.js'
					]
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

			css: {
				files: '**/*.scss',
				tasks: ['sass'],
				options: {
					livereload: true,
				},
			},

			scripts: {
				files: '**/*.js',
				tasks: '',
				options: {
					livereload: true,
				},
			}
		}



	});

	//Project task(s).
	grunt.registerTask('default', []);

};