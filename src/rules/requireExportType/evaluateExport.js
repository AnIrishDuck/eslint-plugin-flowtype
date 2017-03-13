import evaluateFunction from './evaluateFunction';
import evaluateVariable from './evaluateVariable';

const exported = (prefix) => {
  return prefix + ' on export.';
};

const evaluators = {
  FunctionDeclaration: evaluateFunction,
  VariableDeclaration: (context, node, finishMessage) => {
    node.declarations.forEach((declarator) => {
      evaluateVariable(context, declarator, finishMessage);
    });
  }
};

export default function (context) {
  return (exportNode) => {
    const declaration = exportNode.declaration;

    if (declaration) {
      const evaluate = evaluators[declaration.type];

      if (evaluate) {
        evaluate(context, exportNode.declaration, exported);
      }
    }
  };
}
