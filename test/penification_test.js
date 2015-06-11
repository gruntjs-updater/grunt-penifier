'use strict';

var grunt = require('grunt');
var penifier = require('../tasks/penifier.js');

exports.penification = {
  setUp: function(done) {
    done();
  },
  visual_false: function(test) {
    var penified = penifier.penifyComment('The quick brown fox jumps over the lazy dog.', {style:'text'});
    var expected = 'Pen penis penis pen penis peni pen peni pen.';
    test.equal(penified, expected, 'comments should read penis');
    test.done();
  },
  word: function(test) {
    var penified = penifier.penifyWord('anchovy', {style:'text'});
    var expected = 'penispe';
    test.equal(penified, expected, 'words should be turned into penis');
    test.done();
  }
};
