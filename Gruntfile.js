module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: ["dist/"],

		copy: {
			regular: {
				expand: true,
				cwd: '.',
				src: ['Gruntfile.js', 'package.json', 'css/*', 'js/*', '*.html', '!index.html', '*.md', 'views/*', 
				'views/css/*', 'views/js/*'],
				dest: 'dist/',
				filter: 'isFile'
			}
		},

		imagemin: {
			pics: {
				files: [{
				expand: true,
				cwd: 'img/',
				src: ['*.{png,jpg}'],
				dest: 'dist/img/'},
			{
				expand: true,
				cwd: 'views/images/',
				src: ['pizza.png', 'pizzeria.jpg'],
				dest: 'dist/views/images/'
			}]
			}
			
		},

		critical: {
			inlining: {
				options: {
					base: './',
					width: 320,
					height: 70
				},
				src: 'index.html',
				dest: 'dist/index.html'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-critical');

	grunt.registerTask('default', ['clean', 'imagemin', 'critical', 'copy']);
};