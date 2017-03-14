'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context, variableDeclarator, finishMessage) {
  var identifierNode = variableDeclarator.id;

  var leftTypeAnnotation = identifierNode.typeAnnotation;
  var rightTypeAnnotation = variableDeclarator.init && variableDeclarator.init.typeAnnotation;

  if (leftTypeAnnotation || rightTypeAnnotation) {
    return true;
  } else {
    var initNodeType = variableDeclarator.init ? variableDeclarator.init.type : null;
    var checker = checkInitializer[initNodeType];

    if (checker) {
      return checker(context, variableDeclarator.init, finishMessage);
    } else {
      var identifierName = identifierNode.name;

      context.report({
        data: {
          name: (0, _utilities.quoteName)(identifierName)
        },
        message: finishMessage('Missing {{name}}type annotation'),
        node: identifierNode
      });

      return false;
    }
  }
};

var _utilities = require('./../../utilities');

var _checkFunction = require('./checkFunction');

var _checkFunction2 = _interopRequireDefault(_checkFunction);

var _checkLiteral = require('./checkLiteral');

var _checkLiteral2 = _interopRequireDefault(_checkLiteral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkInitializer = {
  ArrowFunctionExpression: _checkFunction2.default,
  FunctionDeclaration: _checkFunction2.default,
  Literal: _checkLiteral2.default
};

module.exports = exports['default'];