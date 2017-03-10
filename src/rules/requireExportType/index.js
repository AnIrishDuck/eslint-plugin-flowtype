import _ from 'lodash';
import {isFlowFile} from './../../utilities';
import evaluateVariable from './evaluateVariable';

export default (context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return {};
  }

  return {
    VariableDeclaration: evaluateVariable(context)
  };
};
