export default function (context, literalNode, finishMessage) {
  const typeAnnotation = literalNode.typeAnnotation;

  if (typeAnnotation) {
    return true;
  } else {
    context.report({
      message: finishMessage('Missing type annotation'),
      node: literalNode
    });

    return false;
  }
}
