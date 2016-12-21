var operations = require('./operations.js').binary;

var OpNode = function(operator, left, right){
	this.operator = operator;
	this.left = left;
	this.right = right;
}

OpNode.prototype = {
	process : function(context){
		return operations[this.operator](this.left.process(context),this.right.process(context));
	}
}

module.exports = OpNode;