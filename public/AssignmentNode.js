var AssignmentNode = function (identifier, expression) {
    this.variable = identifier.name;
    this.expression = expression;
}

AssignmentNode.prototype = {
    process : function (context) {
        var evaluatedResult = this.expression.process(context);
        context[this.variable] = evaluatedResult;
        return evaluatedResult;
    }
}

module.exports = AssignmentNode;
