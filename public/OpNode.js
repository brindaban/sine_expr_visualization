var operations = require('./operations.js');

var OpNode = function(operator, left, right){
	this.operator = operator;
	this.left = left;
	this.right = right;
}

OpNode.prototype = {
	process : function(localVars){
		return operations[this.operator](this.left.process(localVars),this.right.process(localVars));
	}
}

module.exports = OpNode;