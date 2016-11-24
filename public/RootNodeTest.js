var assert = require('assert');
var RootNode = require('./RootNode.js')
var OpNode = require('./OpNode.js');
var NumNode = require('./NumNode.js')
var Identifier = require('./Identifier.js')



describe('RootNode',function(){
	it('should be able to evaluate the statement @2+3 and returns 5',function(){
		var root = new RootNode();
		root.setTree(new OpNode('+', new NumNode(2), new NumNode(3)));

		var expected = 5;
		assert.equal(expected, root.evaluate());
	});

	it('should be able to evaluate the statement @(2*3)+3 and returns 9',function(){
		var root = new RootNode();
		root.setTree(new OpNode('+', new OpNode('*', new NumNode(2), new NumNode(3)), new NumNode(3)));

		var expected = 9;
		assert.equal(expected, root.evaluate());
	});

	it('should be able to evaluate the statement @x=2;x; and returns 2',function(){
		var root = new RootNode();
		root.addIdentifier(new Identifier('x'),new NumNode(2));
		root.setTree(new Identifier('x'));

		var expected = 2;
		assert.equal(expected, root.evaluate());
	});

	it('should be able to evaluate the statement @x=2;x+4; and returns 6',function(){
		var root = new RootNode();
		root.addIdentifier(new Identifier('x'),new NumNode(2));
		root.setTree(new OpNode('+', new Identifier('x'), new NumNode(4)));

		var expected = 6;
		assert.equal(expected, root.evaluate());
	});

	it('should be able to evaluate the statement @x=2;y=x+4;y-4; and returns 6',function(){
		var root = new RootNode();
		root.addIdentifier(new Identifier('x'),new NumNode(2));
		root.addIdentifier(new Identifier('y'),new OpNode('+', new Identifier('x'), new NumNode(4)));
		root.setTree(new OpNode('-', new Identifier('y'), new NumNode(4)));

		var expected = 2;
		assert.equal(expected, root.evaluate());
	});

	it('should be able to evaluate the statement @x=10;y=20;z=30;(x^2)+(y^2)-(z^2); and returns 6',function(){
		var root = new RootNode();
		root.addIdentifier(new Identifier('x'),new NumNode(10));
		root.addIdentifier(new Identifier('y'),new NumNode(20));
		root.addIdentifier(new Identifier('z'),new NumNode(30));

		var powerOf2 = function(identifier){
			return new OpNode('^' , new Identifier(identifier), new NumNode(2));
		}
		root.setTree(new OpNode('-', new OpNode('+', powerOf2('x'), powerOf2('y')), powerOf2('z'))); //(x^2)+(y^2)-(z^2);
		var expected = -400;
		assert.equal(expected, root.evaluate());
	});

	it('should be able to evaluate the statement @sin 2*2; and returns 6',function(){
		var root = new RootNode();
		root.setTree(new OpNode('sin', new NumNode(4), new NumNode())); //(x^2)+(y^2)-(z^2);
		var expected = -0.7568024953079282;
		assert.equal(expected, root.evaluate());
	});
});