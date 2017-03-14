'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('./../../utilities');

var _evaluateExport = require('./evaluateExport');

var _evaluateExport2 = _interopRequireDefault(_evaluateExport);

var _evaluateProgram = require('./evaluateProgram');

var _evaluateProgram2 = _interopRequireDefault(_evaluateProgram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context) {
  var checkThisFile = !_lodash2.default.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || (0, _utilities.isFlowFile)(context);

  if (!checkThisFile) {
    return {};
  }

  return {
    ExportDefaultDeclaration: (0, _evaluateExport2.default)(context),
    ExportNamedDeclaration: (0, _evaluateExport2.default)(context),
    Program: (0, _evaluateProgram2.default)(context)
  };
};

module.exports = exports['default'];