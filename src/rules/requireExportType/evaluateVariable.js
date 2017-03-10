import _ from 'lodash';
import {
    quoteName
} from './../../utilities';

export default function (context) {
  return (variableDeclaration) => {
    const isExport = variableDeclaration.parent.type === 'ExportNamedDeclaration';

    if (isExport) {
      _.forEach(variableDeclaration.declarations, (variableDeclarator) => {
        const identifierNode = _.get(variableDeclarator, 'id');
        const identifierName = _.get(identifierNode, 'name');

        const typeAnnotation = _.get(identifierNode, 'typeAnnotation');

        if (!typeAnnotation) {
          context.report({
            data: {
              name: quoteName(identifierName)
            },
            message: 'Missing {{name}}export type annotation.',
            node: identifierNode
          });
        }
      });
    }
  };
}
