var operations = require('./operations.js').unary;

var UnaryOpNode = function(operator, expression) {
    this.operator = operator;
    this.expression = expression;
}

UnaryOpNode.prototype = {
    process : function (context) {
        return operations[this.operator](this.expression.process(context));
    }
}
module.exports = UnaryOpNode;
