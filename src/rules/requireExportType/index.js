import _ from 'lodash';
import {isFlowFile} from './../../utilities';
import evaluateFunction from './evaluateFunction';
import evaluateVariable from './evaluateVariable';

export default (context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return {};
  }

  return {
    FunctionDeclaration: evaluateFunction(context),
    VariableDeclaration: evaluateVariable(context)
  };
};
