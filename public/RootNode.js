var RootNode = function () {
    this.context = {};
}

RootNode.prototype = {
    execute: function (parseTree) {
        return parseTree.process(this.context);
    }
}
module.exports = RootNode;