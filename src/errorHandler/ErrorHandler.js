const { globalLog } = require('../log/Log');
const ERRORS = require('./ERRORS');

class ErrorHandler {
  constructor() {
    this.log = globalLog;
  };

  throw(msg, line, col) {
    let err;
    if (line && col) {
      err = `\n\n: ${msg} at line ${line}, col ${col}\n`;
    } else {
      err = `\n\n: ${msg}\n`;
    };
    try {
      throw new Error(err);
    } catch (e) {
      console.error(e);
      this.log.error(e, line);
      process.exit(1);
    };
  };

  // WRAPPERS
  throwNewSyntaxError(line, col) {
    const msg = ERRORS.syntax.unknownCharacter;
    return this.throw(msg, line, col);
  };

  throwNewEOFStringError(string, line, col) {
    const msg = `${ERRORS.syntax.eofWhileParsingString} '${string}'`;
    return this.throw(msg, line, col);
  };

  throwNewInvalidFunctionCalleeTypeError(line, col) {
    const msg = `${ERRORS.semantic.invalidFunctionCallee}`;
    return this.throw(msg, line, col);
  };

  throwInvalidValueAssignment(line, col) {
    const msg = `${ERRORS.syntax.invalidValueAssignment}`;
    return this.throw(msg, line, col);
  };

  throwInvalidBinaryExpression(line, col) {
    const msg = `${ERRORS.syntax.invalidBinaryExpression}`;
    return this.throw(msg, line, col);
  };
  
  throwUnexpectedKeyword(line, col) {
    const msg = `${ERRORS.syntax.unexpectedKeyword}`;
    return this.throw(msg, line, col);
  };

  throwForbiddenSymbolInExpression(line, col) {
    const msg = `${ERRORS.syntax.forbiddenSymbolInExpression}`;
    return this.throw(msg, line, col);
  };
  
  throwUnexpectedLiteral(line, col) {
    const msg = `${ERRORS.syntax.unexpectedCharacterLiteral}`;
    return this.throw(msg, line, col);
  };
  
  throwInvalidUnaryExpression(line, col) {
    const msg = `${ERRORS.syntax.invalidUnaryExpression}`;
    return this.throw(msg, line, col);
  };

  throwUnableToParseFunctionInvocation(line, col) {
    const msg = `${ERRORS.semantic.unableToParseFunctionInvocationExpression}`;
    return this.throw(msg, line, col);
  };

  throwExpectedBarAfterArgumentList(line, col) {
    const msg = `${ERRORS.syntax.expectedBarAfterArgumentsList}`;
    return this.throw(msg, line, col);
  };

  throwExpectedBarAfterFunctionDeclaration(line, col) {
    const msg = `${ERRORS.syntax.expectedBarAfterFunctionDeclaration}`;
    return this.throw(msg, line, col);
  };
  
  throwExpectedRParens(line, col) {
    const msg = `${ERRORS.syntax.eofWhileParsingExpression}`;
    return this.throw(msg, line, col);
  };

  throwUndefinedVariable(variable, line, col) {
    const msg = `${ERRORS.syntax.undefinedVariable} '${variable}'`;
    return this.throw(msg, line, col);
  };

  throwInvalidVariableDeclaration(line, col) {
    const msg = `${ERRORS.syntax.invalidVariableDeclaration} `;
    return this.throw(msg, line, col);
  };

  throwMaximumIterationsInLoopExceeded(line, col) {
    const msg = `${ERRORS.runTime.maximumIterationsInLoopExceeded}`;
    return this.throw(msg, line, col);
  };

  throwExpectedFatArrowAfterFunctionDeclaration(line, col) {
    const msg = `${ERRORS.syntax.expectedFatArrowAfterFunctionDeclaration}`;
    return this.throw(msg, line, col);
  };
  
  throwExpectedSemiColonOrBrace(line, col) {
    const msg = `${ERRORS.syntax.expectedSemicolonOrClosingBrace}`;
    return this.throw(msg, line, col);
  };
  
  throwUnexpectedArity(func, expected, got, line, col) {
    const msg = `${ERRORS.runTime.unexpectedArity} (${func} expected ${expected} but got ${got})`;
    return this.throw(msg, line, col);
  };
};

module.exports = {
  ErrorHandler,
};