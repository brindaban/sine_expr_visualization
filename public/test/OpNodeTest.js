var assert = require('assert');
var OpNode = require('../OpNode.js');
var UnaryOpNode = require('../UnaryOpNode.js');
var Identifier = require('../Identifier.js');
var NumNode = require('../NumNode.js');

describe('OpNode', function () {
    it('should be able to evaluate the parse tree', function () {
        var parseTree = new OpNode('+', new OpNode('-', new NumNode(50), new NumNode(40)), new NumNode(10));
        var expected = 20;

        assert.equal(expected, parseTree.process());
    });

    it('should be able to evaluate evaluate factorial of number', function () {
        var parseTree = new UnaryOpNode('!', new NumNode(5));
        var expected = 120;

        assert.equal(expected, parseTree.process());
    });

    it('should be able to evaluate by getting value of identifier', function () {
        var parseTree = new OpNode('+', new Identifier('x'), new NumNode(5));
        var context = {x: 5};

        var expected = 10;
        assert.equal(expected, parseTree.process(context));
    });

    it('should fail with wrong expectation', function () {
        var parseTree = new OpNode('+', new OpNode('-', new NumNode(50), new NumNode(40)), new NumNode(10));

        assert.notEqual('not expected', parseTree.process());
    })
});
