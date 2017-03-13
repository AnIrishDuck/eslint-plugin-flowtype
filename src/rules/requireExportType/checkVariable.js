import _ from 'lodash';
import {
    quoteName
} from './../../utilities';
import checkFunction from './checkFunction';
import checkLiteral from './checkLiteral';

const checkInitializer = {
  ArrowFunctionExpression: checkFunction,
  FunctionDeclaration: checkFunction,
  Literal: checkLiteral
};

export default function (context, variableDeclarator, finishMessage) {
  const identifierNode = _.get(variableDeclarator, 'id');

  const typeAnnotation = _.get(identifierNode, 'typeAnnotation');

  if (typeAnnotation) {
    return true;
  } else {
    const initNodeType = variableDeclarator.init ? variableDeclarator.init.type : null;
    const checker = checkInitializer[initNodeType];

    if (checker) {
      return checker(context, variableDeclarator.init, finishMessage);
    } else {
      const identifierName = identifierNode.name;

      context.report({
        data: {
          name: quoteName(identifierName)
        },
        message: finishMessage('Missing {{name}}type annotation'),
        node: identifierNode
      });

      return false;
    }
  }
}