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
      src = src.replace(multlncmtregex,"\/*8===D*\/").replace(cmtregex,'//8===D');
    } else if (options.matchlength) {
      var priorLastIndex = 0,
      current,
      csource;
      /*
      while ((current = cmtregex.exec(src)) != null ) {
        var len = (current.index - cmtregex.lastIndex);
        var pencomment = '8'+ '='.repeat('len'-2) + 'D';
        if(src['cmtregex.lastIndex']) {
        src = src.slice(0,current.index) + '//' + pencomment + src.slice(cmtregex.lastIndex);
        }
      }
      
      while ((current = cmtregex.exec(src)) != null) {
        csource = csource + src.slice(priorLastIndex, current.index);
        var len = (current.index - cmtregex.lastIndex);
        csource = csource + '8'+ '='.repeat('len'-2) + 'D';
        priorLastIndex = cmtregex.lastIndex;
        console.log(priorLastIndex);
      }
      */
      while ((current = cmtregex.exec(src)) != null) {
        var len = (cmtregex.lastIndex - current.index - 4);
        var pencomment = '';
        if (len > 0) {
          pencomment = '8' + '='.repeat(len) + 'D';
          console.log(pencomment);
        }
        src = src.slice(0,current.index) + '//' + pencomment + src.slice(cmtregex.lastIndex);
        
        var test = src.substring(0,cmtregex.lastIndex);
      }

    } else {
      src = src.replace(multlncmtregex,"\/*penis*\/").replace(cmtregex,'//penis');
    }

    
    
    grunt.file.write(f.dest, src);
    grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};
