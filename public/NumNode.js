var NumNode = function(value){
	this.expression = value;
}

NumNode.prototype = {
	process : function(){
		return this.expression;
	}
}

module.exports = NumNode;