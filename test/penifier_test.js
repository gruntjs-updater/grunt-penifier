'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.penifier = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'comments should read penis.');

    test.done();
  },
  visual_true: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/visual_true');
    var expected = grunt.file.read('test/expected/visual_true');
    test.equal(actual, expected, 'comments should read 8===D.');

    test.done();
  },
  
  matchlength_true: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/matchlength_true');
    var expected = grunt.file.read('test/expected/matchlength_true');
    test.equal(actual, expected, 'comments should read 8===D.');

    test.done();   
  },
  
};
