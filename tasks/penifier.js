/*
 * grunt-penifier
 * https://github.com/romnempire/grunt-penifier
 *
 * Copyright (c) 2014 Roman
 * Licensed under the MIT license.
 */

 'use strict';

 module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('penifier', 'Penify your comments.  Dont use this for anything.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

this.files.forEach(function(f) {
  var src = grunt.file.read(f.src).replace(/\/\*\w*\*\//g,"\/*penis*\/").replace(/\/\/\w*\n/,"\/\/8=======D");
  grunt.file.write(f.dest, src);
  grunt.log.writeln('File "' + f.dest + '" created.');
}
);

});
};
