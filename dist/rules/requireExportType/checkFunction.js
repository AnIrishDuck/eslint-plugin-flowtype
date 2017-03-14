'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, functionDeclaration, finishMessage) {
  var valid = void 0;

  valid = true;
  if (!functionDeclaration.returnType) {
    context.report(functionDeclaration, finishMessage('Missing return type annotation'));
    valid = false;
  }

  _lodash2.default.forEach(functionDeclaration.params, function (identifierNode) {
    var parameterName = (0, _utilities.getParameterName)(identifierNode, context);

    var typeAnnotation = _lodash2.default.get(identifierNode, 'typeAnnotation') || _lodash2.default.get(identifierNode, 'left.typeAnnotation');

    if (!typeAnnotation) {
      context.report({
        data: {
          name: (0, _utilities.quoteName)(parameterName)
        },
        message: finishMessage('Missing {{name}}parameter type annotation'),
        node: identifierNode
      });

      valid = false;
    }
  });

  return valid;
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];