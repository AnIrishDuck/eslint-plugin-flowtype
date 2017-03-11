import _ from 'lodash';
import {
    quoteName
} from './../../utilities';

export default function (context, variableDeclarator, finishMessage) {
  const identifierNode = _.get(variableDeclarator, 'id');

  const typeAnnotation = _.get(identifierNode, 'typeAnnotation');

  if (typeAnnotation) {
    return true;
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
