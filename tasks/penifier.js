/*
* grunt-penifier
* https://github.com/romnempire/grunt-penifier
*
* Copyright (c) 2014 Roman
* Licensed under the MIT license.
*/

'use strict';

//repeats string
String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
};

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('penifier', 'Penify your comments.  Dont use this for anything.', function() {

  // Merge task-specific and/or target-specific options with these defaults.
  var options = this.options({
    visual: false,
    matchlength: false
  });

  var multlncmtregex = /\/\*\w*\*\//g;
  var cmtregex = /\/\/[^\r\n]*(?=[\r\n]|$)/g;

  this.files.forEach(function(f) {
    var src = grunt.file.read(f.src);
    if(options.visual && !options.matchlength) {
    //visual logic
      src = src.replace(multlncmtregex,"\/*8===D*\/").replace(cmtregex,'//8===D');
    } else if (options.matchlength) {
    //variable length logics
      var priorLastIndex = 0,
      current,
      csource = '';

      /* this logic is old and sharty because it manipulates what it iterates through
      //i really should not be manipulating src while iterating through it with exec
      //(the for loop iterable syntax problem)
      while ((current = cmtregex.exec(src)) != null) {
        var len = (cmtregex.lastIndex - current.index - 4);
        var pencomment = '';
        if (len > 0) {
          pencomment = '8' + '='.repeat(len) + 'D';
        }
        src = src.slice(0,current.index) + '//' + pencomment + src.slice(cmtregex.lastIndex);
        
        var test = src.substring(0,cmtregex.lastIndex);
      }
      */

      while ((current = cmtregex.exec(src)) != null) {
        var len = (cmtregex.lastIndex - current.index - 4);
        var pencomment = '8===D';
        if (len > 0) {
          pencomment = '8' + '='.repeat(len) + 'D';
        }
        csource = csource + src.slice(priorLastIndex,current.index) + '//' + pencomment;
        priorLastIndex = cmtregex.lastIndex;
      }
      csource = csource + src.slice(priorLastIndex);
      src = csource;


    } else {
    //default logic
      src = src.replace(multlncmtregex,"\/*penis*\/").replace(cmtregex,'//penis');
    }

    
    
    grunt.file.write(f.dest, src);
    grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
