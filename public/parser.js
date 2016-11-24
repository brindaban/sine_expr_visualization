var jison = require("jison");
var fs = require("fs");
var bnf = fs.readFileSync("./grammar.jison", "utf8");
var parser = new jison.Parser(bnf);

var parse = function(exp){
    var data = [];
	for(var i = 0; i<10; i++){
		var input = "x="+i+";"+exp;
		data.push({x:i, y:parser.parse(input).evaluate()});
	}

    return data;
	
}

module.exports = parse;