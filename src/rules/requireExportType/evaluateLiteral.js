export default function (context, literalNode) {
  const typeAnnotation = literalNode.typeAnnotation;

  if (typeAnnotation) {
    return true;
  } else {
    context.report({
      message: 'Missing type annotation on default export.',
      node: literalNode
    });

    return false;
  }
}
