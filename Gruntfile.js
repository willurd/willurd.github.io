var path = require('path');
var remapify = require('remapify');
var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt) {
  loadGruntTasks(grunt);

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      src: {
        files: ['./src/**/*.js'],
        tasks: ['browserify']
      }
    },

    browserify: {
      dist: {
        src: './src/core/app.js',
        dest: './public/js/app.js',
        options: {
          transform: [
            [ 'babelify', { experimental: true } ],
            [ 'reactify', { es6: true } ]
          ],

          preBundleCB: function(b) {
              b.plugin(remapify, [{
                src: './src/js/**/*.js',
                filter: function(alias, dirname, basename) {
                  return path.join(dirname, basename).replace(/src\/js\/(.*)\.js$/, '$1');
                }
              }]);
          }
        }
      }
    }
  });

  grunt.registerTask('build', ['browserify']);
  grunt.registerTask('default', ['build', 'watch']);
};
