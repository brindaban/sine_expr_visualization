module.exports = {
	'+' : function (left,right) { return left + right;},
	'-' : function (left,right) { return left - right;},
	'*' : function (left,right) { return left * right;},
	'/' : function (left,right) { return left / right;},
	'^' : function (left,right) { return Math.pow(left, right)},
	'sin' : function(left) {return Math.sin(left)},
	'cos' : function(left) {return Math.cos(left);},
	'log' : function(left) { return Math.log(left);},
	'!' : function(left) { 
		var result = 1;
		for(var i = 2;i<=left;i++)
			result *= i;
		return result;
	}
};
