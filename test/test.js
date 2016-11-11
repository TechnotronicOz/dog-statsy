
var assert = require('assert');
var statsy = require('..');
var Trace = require('../lib/trace');
var args;

beforeEach(function(){
  stats = statsy();
  stats.send = function(){
    args.push([].slice.call(arguments));
  };
  args = [];
});

describe('write', function(){
  it('should include global tags', function(){
    stats.tags = ['tag:global'];
    stats.write('key:1|c');
    assert.deepEqual(args, [
      ['key:1|c|#tag:global']
    ]);
  });

  it('should include local tags', function(){
    stats.write('key:1|c', ['tag:local']);
    assert.deepEqual(args, [
      ['key:1|c|#tag:local']
    ]);
  });

  it('should combine local and global tags', function(){
    stats.tags = ['tag:global'];
    stats.write('key:1|c', ['tag:local']);
    assert.deepEqual(args, [
      ['key:1|c|#tag:global,tag:local']
    ]);
  });
});

describe('incr', function(){
  it('should write incr without tags or increments', function(){
    stats.incr('key');
    assert.deepEqual(args, [
      ['key:1|c']
    ]);
  });

  it('should write incr with an increment', function(){
    stats.incr('key', 2);
    assert.deepEqual(args, [
      ['key:2|c']
    ]);
  });

  it('should write incr with tags', function(){
    stats.incr('key', 1, ['tag:local']);
    assert.deepEqual(args, [
      ['key:1|c|#tag:local']
    ]);
  })
});

describe('decr', function(){
  it('should write decr without tags or increments', function(){
    stats.decr('key');
    assert.deepEqual(args, [
      ['key:-1|c']
    ]);
  });

  it('should write decr with an increment', function(){
    stats.decr('key', 2);
    assert.deepEqual(args, [
      ['key:-2|c']
    ]);
  });

  it('should write incr with tags', function(){
    stats.decr('key', 1, ['tag:local']);
    assert.deepEqual(args, [
      ['key:-1|c|#tag:local']
    ]);
  })
});

describe('trace', function(){
  it('should throw an error if the trace name is not specified', function(){
    assert.throws(stats.trace, Error, 'createing a trace with no name should throw an error');
  });

  it('should write an empty trace', function(){
    var trace = stats.trace('key', ['hello:world'], new Date(1000));
    trace.complete(new Date(2000));
    assert.deepEqual(args, [
      ['key.seconds:1|h|#hello:world,step:request'],
      ['key.count:1|c|#hello:world']
    ]);
  });

  it('should write a trace with a couple of stats', function(){
    var trace = stats.trace('key', ['hello:world'], new Date(1000));
    trace.step('A', ['tag:a'], new Date(1100));
    trace.step('B', ['tag:b'], new Date(1300));
    trace.step('C', ['tag:c'], new Date(1600));
    trace.complete(new Date(2000));
    assert.deepEqual(args, [
      ['key.seconds:0.1|h|#hello:world,tag:a,step:A'],
      ['key.seconds:0.2|h|#hello:world,tag:b,step:B'],
      ['key.seconds:0.3|h|#hello:world,tag:c,step:C'],
      ['key.seconds:1|h|#hello:world,step:request'],
      ['key.count:1|c|#hello:world']
    ]);
  });

  it('should write a trace with default tags and date', function(){
    Trace.now = function() { return new Date(1000) };
    var trace = stats.trace('key');

    Trace.now = function() { return new Date(1100) };
    trace.step('A');

    Trace.now = function() { return new Date(1300) };
    trace.step('B');

    Trace.now = function() { return new Date(1600) };
    trace.step('C');

    Trace.now = function() { return new Date(2000) };
    trace.complete();

    assert.deepEqual(args, [
      ['key.seconds:0.1|h|#step:A'],
      ['key.seconds:0.2|h|#step:B'],
      ['key.seconds:0.3|h|#step:C'],
      ['key.seconds:1|h|#step:request'],
      ['key.count:1|c|#'],
    ]);
  });
});
