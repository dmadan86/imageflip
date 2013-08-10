module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    '../output/jquery.imageFlip.min.js': ['../src/jquery.imageFlip.js']
                }
            }
        },
        clean: ['../output']
    });
    grunt.registerTask('default', ['clean', 'uglify']);
};