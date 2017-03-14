import checkFunction from './checkFunction';
import checkLiteral from './checkLiteral';
import checkVariable from './checkVariable';

const exported = (prefix) => {
  return prefix + ' on export.';
};

const ignore = () => {};

const checkers = {
  ArrowFunctionExpression: checkFunction,
  // TODO - classes are a more complex case, but we'll get there
  ClassDeclaration: ignore,
  FunctionDeclaration: checkFunction,
  Identifier: ignore,
  InterfaceDeclaration: ignore,
  Literal: checkLiteral,
  TypeAlias: ignore,
  VariableDeclaration: (context, node, finishMessage) => {
    node.declarations.forEach((declarator) => {
      checkVariable(context, declarator, finishMessage);
    });
  }
};

export default function (context) {
  return (exportNode) => {
    const declaration = exportNode.declaration;

    if (declaration) {
      const check = checkers[declaration.type];

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
}
