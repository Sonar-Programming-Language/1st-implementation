const tokens = require('../lexer/tokenList');


const preludes = {
    syntax: `SyntaxError`,
    runTime: `UnexpectedRuntimeError`
};

const errors = {
    syntax: {
        unknownCharacter: `${preludes.syntax}: Unrecognized identifier`,
        eofWhileParsingString: `${preludes.syntax}: EOF while parsing string`,
        invalidValueAssignment: `${preludes.syntax}: Invalid value assignment`,
        invalidBinaryExpression: `${preludes.syntax}: Invalid binary expression`,
        unexpectedKeyword: `${preludes.syntax}: Unexpected keyword`,
        forbiddenSymbolInExpression: `${preludes.syntax}:  Forbidden symbol in expression`,
        unexpectedCharacterLiteral: `${preludes.syntax}: Unexpected character literal`,
        invalidUnaryExpression: `${preludes.syntax}: Invalid unary expression`,
        expectedBarAfterArgumentsList: `${preludes.syntax}: Expected ${tokens.tokenList.BAR} after argument list`,
        expectedBarAfterFunctionDeclaration: `${preludes.syntax}: Expected ${tokens.tokenList.BAR} after function declaration`,
        expectedCommaAfterArgument: `${preludes.syntax}: Expected ${tokens.tokenList.COMMA} after function argument`,
        eofWhileParsingExpression: `${preludes.syntax}: EOF while parsing expression. Expected ${tokens.tokenList.RPAREN} but got \n`,
        undefinedVariable: `${preludes.syntax}: Undefined variable`,
        invalidVariableDeclaration: `${preludes.syntax}: Invalid variable declaration`,
        expectedLBraceAfterExpression: `${preludes.syntax}: Expected ${tokens.tokenList.LBRACE} after expression`,
        expectedFatArrowAfterFunctionDeclaration: `${preludes.syntax}: Expected ${tokens.tokenList.FATARROW} after function declaration`,
        expectedSemicolonOrClosingBrace: `${preludes.syntax}: Expected ${tokens.tokenList.SEMICOLON} or ${tokens.tokenList.RBRACE}`,
    },
    semantic: {
        invalidFunctionCallee: `Invalid function invocation`,
        unableToParseFunctionInvocationExpression: `Unable to parse function invocation expression`
    },
    runTime: {
        maximumIterationsInLoopExceeded: `${preludes.runTime}: Maximum number of loops exceeded`,
        unexpectedArity: `${preludes.runTime}: Unexpected arity`
    }
};


module.exports = errors;