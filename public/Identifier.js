var Identifier = function(name){
	this.name = name;
}
Identifier.prototype = {
	process : function(localVars){
		return localVars[this.name];
	}
}
module.exports = Identifier;