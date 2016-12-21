var jison = require("jison");
var fs = require("fs");
var bnf = fs.readFileSync("./grammar.jison", "utf8");
var parser = new jison.Parser(bnf);

var parse = function(exp){
    var data = [];
	for(var i = 0; i<10; i++){
		var input = "x="+i+";"+exp;
		var splittedInput = input.split(";");
		splittedInput = splittedInput.slice(0,splittedInput.length-1)
		splittedInput.forEach(function(eachExp){
			currentResult = parser.parse(eachExp+";");
		})
		data.push({x:i,y:currentResult});
	}
    return data;
}

module.exports = parse;