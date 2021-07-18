const { Interpreter } = require('../interpreter/Interpreter');
const fs = require('fs');

class Program {
  constructor(input) {
    this.input = input;
    this.interpreter = new Interpreter(this.input);
  };
};

const fetchSource = () => {
  let file = process.argv[2];
  if (!file) {
    console.log('Usage --> node src/Program/Program.js <filename>');
    try {
      process.exit(1);
    } catch (e) {
      // Interpreter not running on Node process and module `process` not available
      return ''; // fallback: move an empty string through the interpreter. Find more efficient implementation later.
    }
  }
  else {
    try {
      let data = '';

      ///
      data += fs.readFileSync('src/StandardLibrary/Date/Date.sr', 'utf8');
      data += '\n\n';
      data += fs.readFileSync('src/StandardLibrary/String/String.sr', 'utf8');
      data += '\n\n';

      data += fs.readFileSync(file, 'utf8');

      return data;
    }
    catch (e) {
      console.log('Invalid/unacceptable file name given.');
      console.log('Usage --> node src/Program/Program.js <filename>');
      // console.log('Error:', e.stack);
      try {
        process.exit(1);
      } catch (e) {
        // interpreter not running on Node process and 'process' is not available
        return ''; // fallback: move an empty string through the interpreter
      }
    };
  };
};

console.time('Interpreting');
const r = new Program(fetchSource());
console.timeEnd('Interpreting');

//=============================
let input = `

print P;
print 'Hello';

$a = P;
print a;
`;
// let z = new Program(input);

r.interpreter.parser.log.values.forEach(h => {
  // console.log(h.log || h.error.msg);
  // console.log(typeof h.log)
  if (typeof h.log == 'function') {
    console.log(h.log())
  } else {
    console.log(h.log);
  }
});
// console.log(z.interpreter.parser.log.values);

//=============================

module.exports = {
  Program,
};