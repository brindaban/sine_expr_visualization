var NumNode = function(value){
	this.value = value;
}

NumNode.prototype = {
	process : function(){
		return this.value;
	}
}

module.exports = NumNode;