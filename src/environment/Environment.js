const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const RuntimeConfigs = require('./configs');

// STANDARD LIBRARIES
const _StdLib_ = require('../StandardLibrary');
const _Date_ = require('../StandardLibrary/Date');



class Environment {
  constructor(enclosing) {
    this.errorHandler = new ErrorHandler();
    this.values = {};
    this.enclosing = null;
    this.runtimeConfigs = RuntimeConfigs;

    if (enclosing) {
      this.enclosing = enclosing;
    };

    this.stdlib = new _StdLib_(this);
    this.stdlib.loadValuesToEnv();
  };

  define(identifier, value) {
    this.values[identifier] = value;
  };

  assign(identifier, value) {
    if (!Object.keys(this.values).includes(identifier)) {
      if (this.enclosing) {
        return this.enclosing.assign(identifier, value);
      } else {
        this.errorHandler.throwUndefinedVariable(identifier);
      };
    } else {
      this.values[identifier] = value;
    };
  };

  get(identifier) {
    if (Object.keys(this.values).includes(identifier)) {
      if (identifier == 'P') return eval(() => new Date().getDate())
      return this.values[identifier];
    } else {
      if (this.enclosing) {
        return this.enclosing.get(identifier);
      };
      this.errorHandler.throwUndefinedVariable(identifier);
    };
  };
};

module.exports = {
  Environment
};