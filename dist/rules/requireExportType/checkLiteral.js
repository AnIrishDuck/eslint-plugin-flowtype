'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, literalNode, finishMessage) {
  var typeAnnotation = literalNode.typeAnnotation;

  if (typeAnnotation) {
    return true;
  } else {
    context.report({
      message: finishMessage('Missing type annotation'),
      node: literalNode
    });

    return false;
  }
};

module.exports = exports['default'];