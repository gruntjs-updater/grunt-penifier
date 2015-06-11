/*
 * grunt-penifier
 * https://github.com/romnempire/grunt-penifier
 *
 * Copyright (c) 2014 Roman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    penifier: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing']
        }
      },
      ascii_mode: {
        options: {
          style: 'ascii'
        },
        files: {
          'tmp/ascii_mode': ['test/fixtures/testing']
        }
      },
      text_mode: {
        options: {
          style: 'text'
        },
        files: {
          'tmp/text_mode': ['test/fixtures/testing']
        }
      },
      
      matchlength_true: {
        options: {
          style: 'text'
        },
        files: {
          'tmp/matchlength_true': ['test/fixtures/varlengthtesting']
        }
      },
      
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'penifier', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
