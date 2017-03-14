'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context) {
  return function (programNode) {
    var nodePairs = programNode.body.map(getLocalNames);
    var exportMap = new Map(_lodash2.default.flatten(nodePairs));

    programNode.body.forEach(function (node) {
      if (node.type === 'VariableDeclaration') {
        node.declarations.forEach(function (declarator) {
          var name = declarator.id.name;
          var specifier = exportMap.get(name);

          if (specifier) {
            if (!(0, _checkVariable2.default)(context, declarator, requiredBelow)) {
              reportExport(context, specifier, node.loc.start.line);
            }
          }
        });
      } else if (node.type === 'FunctionDeclaration') {
        var name = node.id ? node.id.name : null;
        var specifier = exportMap.get(name);

        if (specifier && !(0, _checkFunction2.default)(context, node, requiredBelow)) {
          reportExport(context, specifier, node.loc.start.line);
        }
      }
    });
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('./../../utilities');

var _checkFunction = require('./checkFunction');

var _checkFunction2 = _interopRequireDefault(_checkFunction);

var _checkVariable = require('./checkVariable');

var _checkVariable2 = _interopRequireDefault(_checkVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLocalNames = function getLocalNames(node) {
  if (node.type === 'ExportNamedDeclaration') {
    return node.specifiers.map(function (specifier) {
      return [specifier.local.name, specifier];
    });
  } else if (node.type === 'ExportDefaultDeclaration') {
    if (node.declaration.type === 'Identifier') {
      return [[node.declaration.name, node.declaration]];
    } else {
      return [];
    }
  } else {
    return [];
  }
};

var requiredBelow = function requiredBelow(prefix) {
  return prefix + ', required by export below.';
};

var reportExport = function reportExport(context, specifier, priorLine) {
  context.report({
    data: {
      name: (0, _utilities.quoteName)(specifier.name || specifier.local.name),
      priorLine
    },
    message: 'Missing or incomplete type annotation on prior {{name}}declaration at line {{priorLine}}.',
    node: specifier
  });
};

module.exports = exports['default'];