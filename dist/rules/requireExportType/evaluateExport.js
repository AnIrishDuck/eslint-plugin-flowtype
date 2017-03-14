'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context) {
  return function (exportNode) {
    var declaration = exportNode.declaration;

    if (declaration) {
      var check = checkers[declaration.type];

      if (check) {
        check(context, exportNode.declaration, exported);
      } else if (declaration && !declaration.typeAnnotation) {
        context.report({
          message: exported('Missing type annotation'),
          node: declaration
        });
      }
    }
  };
};

var _checkFunction = require('./checkFunction');

var _checkFunction2 = _interopRequireDefault(_checkFunction);

var _checkLiteral = require('./checkLiteral');

var _checkLiteral2 = _interopRequireDefault(_checkLiteral);

var _checkVariable = require('./checkVariable');

var _checkVariable2 = _interopRequireDefault(_checkVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exported = function exported(prefix) {
  return prefix + ' on export.';
};

var ignore = function ignore() {};

var checkers = {
  ArrowFunctionExpression: _checkFunction2.default,
  // TODO - classes are a more complex case, but we'll get there
  ClassDeclaration: ignore,
  FunctionDeclaration: _checkFunction2.default,
  Identifier: ignore,
  InterfaceDeclaration: ignore,
  Literal: _checkLiteral2.default,
  TypeAlias: ignore,
  VariableDeclaration: function VariableDeclaration(context, node, finishMessage) {
    node.declarations.forEach(function (declarator) {
      (0, _checkVariable2.default)(context, declarator, finishMessage);
    });
  }
};

module.exports = exports['default'];