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
    style: 'ascii',
  });

  var multilineCommentRegex = /\/\*[^]+?\*\//g;
  var commentRegex = /\/\/[^\r\n]*(?=[\r\n]|$)/g;

  this.files.forEach(function(f) {
    var src = grunt.file.read(f.src),
    priorLastIndex = 0,
    current,
    penified = '';

    //process line comments
    while ((current = commentRegex.exec(src)) != null) {
      var penifiedComment = penifyComment(current[0].slice(2), options);
      penified = penified + src.slice(priorLastIndex, current.index) + '//' + penifiedComment;
      priorLastIndex = current.index + (penifiedComment.length + 2);
    }
    penified = penified + src.slice(priorLastIndex);
    src = penified;

    //process multiline comments
    penified = '';
    priorLastIndex = 0;
    current = null;
    while ((current = multilineCommentRegex.exec(src)) != null) {
      var penifiedComment = penifyComment(current[0].slice(2, current[0].length-2), options);
      penified = penified + src.slice(priorLastIndex, current.index) + '/*' + penifiedComment + '*/';
      priorLastIndex = current.index + (penifiedComment.length + 4);
    }
    penified = penified + src.slice(priorLastIndex);
    src = penified;
     
    grunt.file.write(f.dest, src);
    grunt.log.writeln('File "' + f.dest + '" created.');
    });
    
  });
};

var penifyComment = function penifyComment(comment, options) {
  var wordRegex = /[\w]+/g;
  var penifiedComment = '';
  var commentIndex = 0;
  var word;
  while((word = wordRegex.exec(comment)) != null) {
    penifiedComment = penifiedComment + comment.slice(commentIndex, word.index) + penifyWord(word[0], options);
    commentIndex = word.index + word[0].length;
  }
  penifiedComment = penifiedComment + comment.slice(commentIndex);
  return penifiedComment;
};

var penifyWord = function penifyWord(word, options) {
  if (options.style === 'ascii') {
    switch(word.length) {
      case 1:
        return '~';
      case 2:
        return '~~';
      default:
        //max tildes is 3
        var tildes = Math.floor(Math.random()*(word.length < 6 ? word.length-2 : 3));
        return '8' + '='.repeat(word.length-(tildes+2)) + 'D' + '~'.repeat(tildes);
    }
  } else if (options.style === 'text') {
    var newword = '';
    var penis = 'penis';
    for(var i = 0; i < word.length; i++) {
      if(word[i] === word[i].toUpperCase()) {
        newword = newword + penis[i%5].toUpperCase();
      } else {
        newword = newword + penis[i%5];
      }
    }
    return newword;
  } else {
    return word;
  }
};

module.exports.penifyWord = penifyWord;
module.exports.penifyComment = penifyComment;
