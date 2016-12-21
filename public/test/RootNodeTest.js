var assert = require('assert');
var RootNode = require('../RootNode.js');
var OpNode = require('../OpNode.js');
var NumNode = require('../NumNode.js');
var AssignmentNode = require('../AssignmentNode.js');
var Identifier = require('../Identifier.js');


describe('RootNode', function () {
    it('should be able to evaluate the statement @2+3 and returns result', function () {
        var root = new RootNode();
        var statement = new OpNode('+', new NumNode(2), new NumNode(3));

        assert.equal(5, root.execute(statement));
    });

    it('should be able to evaluate the statement @(2*3)+3 and returns result', function () {
        var root = new RootNode();
        var statement = new OpNode('+', new OpNode('*', new NumNode(2), new NumNode(3)), new NumNode(3));

        assert.equal(9, root.execute(statement));
    });

    it('should be able to evaluate the statement @x=2; and return 2', function () {
        var root = new RootNode();
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));

        assert.equal(2, root.execute(xEquals2));
    });

    it('should be able to evaluate the statement @x=2;x; and returns result', function () {
        var root = new RootNode();
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));

        assert.equal(2, root.execute(xEquals2));
        assert.equal(2, root.execute(new Identifier('x')));
    });

    it('should be able to evaluate the statement @x=2;x+4; and returns the result', function () {
        var root = new RootNode();
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));

        var xPlus4 = new OpNode('+', new Identifier('x'), new NumNode(4));

        assert.equal(2, root.execute(xEquals2));
        assert.equal(6, root.execute(xPlus4));
    });

    it('should be able to evaluate the statement @x=2;y=x+4;y-4; and returns the result', function () {
        var root = new RootNode();
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));
        var yEqualsXPlus4 = new AssignmentNode(new Identifier('y'), new OpNode('+', new Identifier('x'), new NumNode(4)));
        var yMinus4 = new OpNode('-', new Identifier('y'), new NumNode(4));

        assert.equal(2, root.execute(xEquals2));
        assert.equal(6, root.execute(yEqualsXPlus4));
        assert.equal(2, root.execute(yMinus4));
    });

    it('should be able to evaluate the statement @x=10;y=20;z=30;(x^2)+(y^2)-(z^2); and returns the result', function () {
        var root = new RootNode();
        var xEquals10 = new AssignmentNode(new Identifier('x'), new NumNode(10));
        var yEquals20 = new AssignmentNode(new Identifier('y'), new NumNode(20));
        var zEquals30 = new AssignmentNode(new Identifier('z'), new NumNode(30));

        var powerOf2 = function (identifier) {
            return new OpNode('^', new Identifier(identifier), new NumNode(2));
        }
        var expression = new OpNode('-', new OpNode('+', powerOf2('x'), powerOf2('y')), powerOf2('z')); //(x^2)+(y^2)-(z^2);

        assert.equal(10, root.execute(xEquals10));
        assert.equal(20, root.execute(yEquals20));
        assert.equal(30, root.execute(zEquals30));
        assert.equal(-400, root.execute(expression));
    });

    it('should throw exception when variable is diclared later @2*x;x=3;', function () {
        var root = new RootNode();

        var xTimes2 = new OpNode('*', new NumNode(2), new Identifier('x'));
        var xEquals3 = new AssignmentNode(new Identifier('x'), new NumNode(3));

        try {
            root.execute(xTimes2);
            root.execute(xEquals3);
        } catch (err) {
            assert.equal("x is not diclared.", err)
        }
    });

    it('should be able to evaluate the statement @x=2;x=2^5;x; and returns the result', function () {
        var root = new RootNode();
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));
        var xPower5 = new AssignmentNode(new Identifier('x'), new OpNode('^', new Identifier('x'), new NumNode(5)));
        var x = new Identifier('x');

        assert.equal(2, root.execute(xEquals2));
        assert.equal(32, root.execute(xPower5));
        assert.equal(32, root.execute(x));
    });

    it('should be able to evaluate the statement @x=2;x=2^5;x; and returns the result', function () {
        var root = new RootNode();
        var xEquals2 = new AssignmentNode(new Identifier('x'), new NumNode(2));
        var xPower5 = new AssignmentNode(new Identifier('x'), new OpNode('^', new Identifier('x'), new NumNode(5)));
        var x = new Identifier('x');

        assert.equal(2, root.execute(xEquals2));
        assert.equal(32, root.execute(xPower5));
        assert.equal(32, root.execute(x));
    });
});