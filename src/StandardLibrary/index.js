const _Date_ = require('./Date');
const _String_ = require('./String');


class StandardLibrary {
    constructor(env) {
        this.name = 'SonarStdLib';
        this.env = env;
    };

    toString() {
        return `<class '${this.name}'> of type <'${StandardLibrary().name}'>`;
    };

    loadValuesToEnv() {
        _String_.loadValuesToEnv(this.env);
        _Date_.loadValuesToEnv(this.env);
    };

    interceptParser(currentToken, currentStatement) {
        _String_.interceptParser(currentToken, currentStatement);
        _Date_.interceptParser(currentToken, currentStatement);
    };
}


module.exports = StandardLibrary;