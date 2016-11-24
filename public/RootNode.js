var RootNode = function(){
	this.parseTree = {};
	this.identifiers = {};
}

RootNode.prototype = {
	setTree : function(parseTree){
		this.parseTree = parseTree;
		return this;
	},
	addIdentifier : function(identifier, node){
		this.identifiers[identifier.name] = node.process(this.identifiers);
		return this;
	},
	evaluate : function(){
		return this.parseTree.process(this.identifiers);
	}
}
module.exports = RootNode;