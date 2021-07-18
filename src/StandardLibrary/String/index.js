class _String_ {
    constructor() {
        this.name = '_String_';

        this.constants = [];
    };

    loadValuesToEnv(env) {
        this.env = env;
    };

    define(constant, callback) {
        this.env.define(constant, callback);
        this.constants.push(constant);
    };

    interceptParser(currentToken, currentStatement) {
        if (currentToken in this.constants) {
            currentToken.value = this.environment.get(currentToken)();
            console.log(currentToken);
            currentToken.type = 'STRING';
            currentStatement.push(currentToken);
        };
    };

    toString() {
        return `built-in class<${this.name}>`;
    };
};