const { tokenList, reserved } = require('./tokenList');
const { ErrorHandler } = require('../errorHandler/ErrorHandler');

class CharSeperator {
  constructor(input) {
    this.errorHandler = new ErrorHandler();
    this.input = input;
    this.charTypes = [];
    this.getCharTypes();
  };

  getCharTypes() {
    let line = 1;
    let col = 1;
    // console.log(this.input);
    for (let char of this.input.split('')) {
      for (let [token, verification] of Object.entries(tokenList)) {
        if (verification(char)) {
          // console.log(token);
          const charDescription = {};
          charDescription.type = token;
          charDescription.line = line;
          charDescription.col = col;
          charDescription.value = char;
          if (charDescription.type == "UNRECOGNIZED") {
            console.log(charDescription.value);
            this.errorHandler.throwNewSyntaxError(charDescription['line'], charDescription['col']);
          } else {
            this.charTypes.push(charDescription);
          };
          break;
        }
      }
      if (char == '\n') {
        col = 1;
        line++;
      } else {
        col++;
      };
    };
  };
};


/*



                          {[{[ --> THE LEXER <-- ]}]}

                  The goal here is to take a stream of inputs
               & separate it into tokens that have meaning to the
                                   language.

               We start by separating each character of the stream
                                  by its type.
                             The possible types are:

           1. +  2. -  3. *  4. /  5. %  6. =  7. == 8. != 9. >  10.  <

           11.<= 12.<= 13. ! 14. ( 15. ) 16. { 17. } 18. ; 19. ' 20. .

       Besides these types, the char can be a Letter, Number or Whitespace.


              After classifying all the characters, we can move on
          to grouping these symbols into larger lexemes or tokens that
                   our language will be able to understand.



*/


class Lexer {
  constructor(input) {
    this.input = input;
    this.removeComments();
    this.charSeperator = new CharSeperator(this.input);
    this.errorHandler = new ErrorHandler();
    this.charTypes = this.charSeperator.charTypes;
    this.index = 0;
    this.char = this.charTypes[this.index];
    this.currentToken = {};
    this.tokens = [];
    this.lex();
  }

  removeComments() {
    // console.log(this.input.split('').includes('#'));
    // const prevIcon = this.input[this.input.split('').findIndex(e => e == '#') - 1];
    // console.log(prevIcon == '\n' || prevIcon == ' ');

    // this.input = this.input.replace(/\n\#.*\n/g, '\n');
    // this.input = this.input.replace(/\s\#.*\n/g, '\n');

    this.input = this.input.replace(/(\s\#.*\n)|(\n\#.*\n)/g, '\n');

    console.log('>>>>>>>>>>>>>>> \n\n', this.input, '\n\n <<<<<<<<<<<<<<<<');
  };

  resetCurrentToken() {
    this.currentToken = {};
  }

  next() {
    this.index++;
    this.char = this.charTypes[this.index];
  };

  peakNext() {
    try {
      return this.charTypes[this.index + 1];
    } catch {
      return false;
    };
  };

  handleStr() {
    console.log(this.char);
    this.currentToken = {
      "type": "STRING",
      "line": this.char.line,
      "col": this.char.col,
      "value": "",
    };

    if (this.peakNext()) {
      this.next();
    } else {
      this.errorHandler.throwNewEOFStringError(this.char, this.currentToken.line, this.currentToken.col);
    }

    while (this.char.type != "QUOTE") {
      this.currentToken.value = this.currentToken.value.concat(this.char.value);
      this.next();
      if (!this.char) {
        this.errorHandler.throwNewEOFStringError(this.char, this.currentToken.line, this.currentToken.col);
      };
    };
    this.tokens.push(this.currentToken);
    this.resetCurrentToken();
    this.next();
    this.lex();
  };

  handleNum() {
    let hasDecimal = false;

    this.currentToken = {
      "type": "NUMBER",
      "line": this.char.line,
      "col": this.char.col,
      "value": "",
    };

    // Handle decimal and int numbers
    while (this.char.type == "NUMBER" || (!hasDecimal && this.char.type == "DOT" && this.peakNext() && this.peakNext().type == "NUMBER")) {
      if (this.char.type == "DOT") {
        hasDecimal = true;
      };
      this.currentToken.value = this.currentToken.value.concat(this.char.value);
      this.next();
      if (!this.char) {
        break;
      };
    };
    this.tokens.push(this.currentToken);
    this.resetCurrentToken();
    this.lex();
  };

  handleId() {
    this.currentToken = {
      "type": "IDENTIFIER",
      "line": this.char.line,
      "col": this.char.col,
      "value": "",
    };

    while (this.char.type == "NUMBER" || this.char.type == "LETTER") {
      this.currentToken.value = this.currentToken.value.concat(this.char.value);
      this.next();
      if (!this.char) {
        break;
      };
    };

    if (Object.keys(reserved).includes(this.currentToken.value)) {
      this.currentToken.type = reserved[this.currentToken.value];
    };

    this.tokens.push(this.currentToken);
    this.resetCurrentToken();
    this.lex();
  };

  handleComment() {
    this.currentToken = {
      type: 'COMMENT',
      line: this.char.line,
      col: this.char.col,
      value: ''
    };
    console.log('COMMENT HERE!!!');

    const nextIndex = this.charTypes.slice(this.index).findIndex(e => e.type == 'SEMICOLON');
    // console.log(nextIndex);
    // this.index = nextIndex;
    this.char = this.charTypes[this.index + nextIndex + 2];
    // console.log(this.char);
  };


  isDoubleCharOperator() {
    if (this.peakNext()) {
      let operatorToTest = this.char.value.concat(this.peakNext().value)
      for (let [type, verification] of Object.entries(tokenList)) {
        if (verification(operatorToTest) && (type != "UNRECOGNIZED")) {
          return {
            "type": type,
            "line": this.char.line,
            "col": this.char.col,
            "value": operatorToTest,
          };
        };
      };
      return false;
    };
  };

  handleOperator() {
    if (this.char.type != "WHITESPACE") {
      let doubleCharOperator = this.isDoubleCharOperator();
      if (doubleCharOperator) {
        this.next();
        this.currentToken = doubleCharOperator;
        this.tokens.push(this.currentToken);
        this.resetCurrentToken();
      } else {
        this.currentToken = this.char;
        this.tokens.push(this.currentToken);
        this.resetCurrentToken();
      };
    };
    this.next();
    this.lex();
  };

  lex() {
    // console.log(this.char)
    if (this.char) {
      switch (this.char.type) {
        case "COMMENT":
          this.handleComment();
        case "QUOTE":
          this.handleStr();
          break;
        case "NUMBER":
          this.handleNum();
          break;
        case "LETTER":
          this.handleId();
          break;
        // case "COMMENT":
        // console.log(this.char.value);
        default:
          this.handleOperator();
      };
    };
  };
};

module.exports = {
  Lexer,
};