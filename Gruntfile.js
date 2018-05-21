var _ = require('lodash');
var path = require('path');
var remapify = require('remapify');
var loadGruntTasks = require('load-grunt-tasks');
var nodeResolve = require('resolve');

var extraVendorIds = [
  'babelify/polyfill'
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

module.exports = function (grunt) {
  loadGruntTasks(grunt);

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      js: {
        files: ['./src/js/**/*.js'],
        tasks: ['browserify:app']
      },

      css: {
        files: ['./src/css/**/*.styl'],
        tasks: ['stylus:app']
      }
    },

    browserify: {
      vendor: {
        src: './src/js/vendor.js',
        dest: './static/js/vendor.js',
        options: {
          preBundleCB: function (b) {
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
            ['babelify', { experimental: true }],
            ['reactify', { es6: true }]
          ],

          preBundleCB: function (b) {
            getNPMPackageIds()
              .concat(extraVendorIds)
              .forEach(function (id) {
                b.external(id);
              });

            b.plugin(remapify, [{
              src: './src/js/**/*.js',
              filter: function (alias, dirname, basename) {
                console.log(path.join(dirname, basename));
                console.log(path.join(dirname, basename).replace(/src\/js\/(.*)\.js$/, '$1'));
                return path.join(dirname, basename).replace(/src\/js\/(.*)\.js$/, '$1');
              }
            }]);
          }
        }
      }
    },

    stylus: {
      app: {
        files: {
          './static/css/app.css': ['./src/css/**/*.styl']
        }
      }
    },

    uglify: {
      vendor: {
        files: {
          './static/js/vendor.js': ['./static/js/vendor.js']
        }
      },

      app: {
        files: {
          './static/js/app.js': ['./static/js/app.js']
        }
      }
    }
  });

  grunt.registerTask('build', ['stylus', 'browserify', 'uglify']);
  grunt.registerTask('default', ['build', 'watch']);
};
