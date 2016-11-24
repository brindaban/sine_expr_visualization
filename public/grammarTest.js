var assert = require('assert');
var jison = require("jison");
var fs = require("fs");

describe('grammar', function(){
	var parser;
	beforeEach(function(){
		var bnf = fs.readFileSync("./grammar.jison", "utf8");
		parser = new jison.Parser(bnf);
	});

	it('@evaluate x=10;5+x*2;', function(){
		var  input = 'x=10;5+x*2;'
		var expected = 25;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=10;y=20;z=30;(x^2)+(y^2)-(z^2);', function(){
		var  input = 'x=10;y=20;z=30;x^2+y^2-z^2;'
		var expected = -400;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=12;y=10;z=x*12+y/5;z;', function(){
		var  input = 'x=12;y=10;z=x*12+y/5;z;'
		var expected = 146;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=2;sin(x*2) + 4;', function(){
		var  input = 'x=2;sin(x*2) + 4;'
		var expected = 3.2431975046920716;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=2;cos(x+2);', function(){
		var  input = 'x=2;cos(x+2);'
		var expected = -0.6536436208636119;
		assert.equal(expected, parser.parse(input).evaluate());
	});
	 
	it('@evaluate x=2;cos(x+2)^2 + sin(x+2)^2; returns 1', function(){
		var  input = 'x=2;cos(x+2)^2 + sin(x+2)^2;'
		var expected = 1;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=4;x!; returns 24', function(){
		var  input = 'x=4;x!;'
		var expected = 24;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=4;x! + (2*3!); returns 36', function(){
		var  input = 'x=4;x! + (2*3!);'
		var expected = 36;
		assert.equal(expected, parser.parse(input).evaluate());
	});

	it('@evaluate x=4;log(x+2); returns 1.791759469228055', function(){
		var  input = 'x=4;log(x+2);'
		var expected = 1.791759469228055;
		assert.equal(expected, parser.parse(input).evaluate());
	});
});