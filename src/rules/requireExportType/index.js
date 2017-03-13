import _ from 'lodash';
import {isFlowFile} from './../../utilities';
import evaluateExport from './evaluateExport';
import evaluateProgram from './evaluateProgram';

export default (context) => {
  const checkThisFile = !_.get(context, 'settings.flowtype.onlyFilesWithFlowAnnotation') || isFlowFile(context);

  if (!checkThisFile) {
    return {};
  }

  return {
    ExportDefaultDeclaration: evaluateExport(context),
    ExportNamedDeclaration: evaluateExport(context),
    Program: evaluateProgram(context)
  };
};
