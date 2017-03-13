import _ from 'lodash';
import {isFlowFile, quoteName} from './../../utilities';
import evaluateExport from './evaluateExport';
import evaluateFunction from './evaluateFunction';
import evaluateVariable from './evaluateVariable';

const isExport = (node) => {
  return node.type === 'ExportNamedDeclaration';
};

const requiredBelow = (prefix) => {
  return prefix + ', required by export below.';
};

const reportExport = function (context, specifier, priorLine) {
  context.report({
    data: {
      name: quoteName(specifier.local.name),
      priorLine
    },
    message: 'Missing or incomplete type annotation on prior {{name}}declaration at line {{priorLine}}.',
    node: specifier
  });
};

export default (context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return {};
  }

  return {
    ExportDefaultDeclaration: evaluateExport(context),
    ExportNamedDeclaration: evaluateExport(context),
    Program: (programNode) => {
      const exportNodes = programNode.body.filter(isExport);
      const nodePairs = exportNodes.map((node) => {
        return node.specifiers.map((specifier) => {
          return [specifier.local.name, specifier];
        });
      });
      const exportMap = new Map(_.flatten(nodePairs));

      programNode.body.forEach((node) => {
        if (node.type === 'VariableDeclaration') {
          node.declarations.forEach((declarator) => {
            const name = declarator.id.name;
            const specifier = exportMap.get(name);

            if (specifier) {
              if (!evaluateVariable(context, declarator, requiredBelow)) {
                reportExport(context, specifier, node.loc.start.line);
              }
            }
          });
        } else if (node.type === 'FunctionDeclaration') {
          const name = node.id ? node.id.name : null;
          const specifier = exportMap.get(name);

          if (specifier && !evaluateFunction(context, node, requiredBelow)) {
            reportExport(context, specifier, node.loc.start.line);
          }
        }
      });
    }
  };
};
