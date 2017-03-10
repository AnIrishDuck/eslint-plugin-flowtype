import _ from 'lodash';
import {
    getParameterName,
    quoteName
} from './../../utilities';


/*
  const excludeParameterMatch = new RegExp(_.get(context, 'options[0].excludeParameterMatch', 'a^'));

  return (functionNode) => {
    _.forEach(functionNode.params, (identifierNode) => {
      const parameterName = getParameterName(identifierNode, context);

      if (excludeParameterMatch.test(parameterName)) {
        return;
      }

      const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

      const isArrow = functionNode.type === 'ArrowFunctionExpression';
      const isArrowFunctionExpression = functionNode.expression;

      if (skipArrows === 'expressionsOnly' && isArrowFunctionExpression || skipArrows === true && isArrow) {
        return;
      }

      if (!typeAnnotation) {
        context.report({
          data: {
            name: quoteName(parameterName)
          },
          message: 'Missing {{name}}parameter type annotation.',
          node: identifierNode
        });
      }
    });
  };
  */

export default function (context) {
  const excludeParameterMatch = new RegExp(_.get(context, 'options[0].excludeParameterMatch', 'a^'));

  return (functionDeclaration) => {
    const isExport = functionDeclaration.parent.type === 'ExportNamedDeclaration';

    if (isExport) {
      if (!functionDeclaration.returnType) {
        context.report(functionDeclaration, 'Missing return type annotation on exported function.');
      }

      _.forEach(functionDeclaration.params, (identifierNode) => {
        const parameterName = getParameterName(identifierNode, context);

        if (excludeParameterMatch.test(parameterName)) {
          return;
        }

        const typeAnnotation = _.get(identifierNode, 'typeAnnotation') || _.get(identifierNode, 'left.typeAnnotation');

        if (!typeAnnotation) {
          context.report({
            data: {
              name: quoteName(parameterName)
            },
            message: 'Missing {{name}}parameter type annotation on exported function.',
            node: identifierNode
          });
        }
      });
    }
  };
}
