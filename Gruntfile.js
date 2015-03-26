var _ = require('lodash');
var path = require('path');
var remapify = require('remapify');
var loadGruntTasks = require('load-grunt-tasks');
var nodeResolve = require('resolve');

var extraVendorIds = [
];

function getNPMPackageIds() {
  var pkg = {};

  try {
    var pkg = require('./package.json');

  } catch (e) {
    // There is no package.json.
  }

  return _.keys(pkg.dependencies) || [];
}

module.exports = function(grunt) {
  loadGruntTasks(grunt);

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      src: {
        files: ['./src/js/**/*.js'],
        tasks: ['browserify:app']
      }
    },

    browserify: {
      vendor: {
        src: './src/js/vendor.js',
        dest: './static/js/vendor.js',
        options: {
          preBundleCB: function(b) {
            getNPMPackageIds()
              .concat(extraVendorIds)
              .forEach(function (id) {
                b.require(nodeResolve.sync(id), { expose: id });
              });
          }
        }
      },

      app: {
        src: './src/js/core/app.js',
        dest: './static/js/app.js',
        options: {
          transform: [
            [ 'babelify', { experimental: true } ],
            [ 'reactify', { es6: true } ]
          ],

          preBundleCB: function(b) {
            getNPMPackageIds()
              .concat(extraVendorIds)
              .forEach(function (id) {
                b.external(id);
              });

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

  grunt.registerTask('build', ['browserify:vendor', 'browserify:app']);
  grunt.registerTask('default', ['build', 'watch']);
};
