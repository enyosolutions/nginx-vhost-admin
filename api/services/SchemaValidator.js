const Ajv = require('ajv');

function getGrammaticlSingular(type) {
  switch (type) {
    case 'string':
      return 'a string';
    case 'number':
      return 'a number';
    case 'integer':
      return 'an integer';
    case 'object':
      return 'an object';
    case 'array':
      return 'an array';
    case 'boolean':
      return 'a boolean';
    case 'null':
      return 'null';
    default:
      return `a ${type}`;
  }
}

function getFieldName(error) {
  return error.params.missingProperty ||
    error.params.additionalProperty || (error.dataPath && error.dataPath.replace('.', ''));
}

function getFormatErrorMessage(error) {
  switch (error.params.format) {
    case 'date-time':
      return 'Should be a date';
    case 'email':
      return 'Should be a valid email address';
    case 'ipv4':
      return 'Should be a dotted-quad IPv4 address';
    case 'ipv6':
      return 'Should be a valid IPv6 address';
    case 'uri':
      return 'Should be a valid uri';
    default:
      return JSON.stringify(error);
  }
}

function getValidMessage(error) {
  switch (error.keyword) {
    case 'required':
      return 'Is required';
    case 'minimum':
      return `Must be greater than ${error.params.limit}`;
    case 'maximum':
      return `Must be less than ${error.params.limit}`;
    case 'type':
      return `Should be ${getGrammaticlSingular(error.params.type)}`;
    case 'minLength':
      return `Must be longer than ${error.params.limit} characters`;
    case 'maxLength':
      return `Must be shorter than ${error.params.limit} characters`;
    case 'maxItems':
      return `Must have no more than ${error.params.limit} items`;
    case 'minItems':
      return `Must have at least ${error.params.limit} items`;
    case 'format':
      return getFormatErrorMessage(error);
    case 'pattern':
      return 'Invalid format';
    case 'additionalProperties':
      return 'Additional property not allowed';
    default:
      return error.message;
  }
}

function addMessage(fields, error, fieldName) {
  const field = fieldName || getFieldName(error);
  const message = getValidMessage(error);

  if (!fields[field]) {
    fields[field] = [];
  }

  fields[field].push(message);
}

function normaliseErrorMessages(errors) {
  sails.tracer.log(errors);
  const fields = {};
  errors.forEach((error) => {
    addMessage(fields, error);
  });

  return {
    fields
  };
}


module.exports = {
  ajv: new Ajv({
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    removeAdditional: false,
    extendRefs: true
  }),
  validators: {},
  init(cb) {
    sails.tracer.info('VALIDATOR: INIT');
    if (sails.mongodb) {
      this.loadSchemas(cb);
    }
    else {
      return cb();
    }
  },
  loadSchemas(cb) {
    /* eslint-disable */
    sails.tracer.info('VALIDATOR :: loading schemas');
    let existingSchemas = Object.keys(sails.models).length;
    const missingSchemas = {};
    while (existingSchemas > 0) {
      Object.keys(sails.models).forEach((i) => {
        console.log("VALIDATOR :: loading %s ", i);
        if (!sails.models[i].schema) {
          console.log("VALIDATOR :: no schema for %s", i);
          existingSchemas -= 1;
          return;
        }
        if (!this.validators[i.toLowerCase()] && sails.models[i].schema) {
          sails.tracer.info('loading schema for %s', i);
          try {
            this.validators[i.toLowerCase()] = this.ajv.compile(sails.models[i].schema);
            existingSchemas -= 1;
          } catch (e) {
            sails.tracer.warn('Error on schema %s', i);
            sails.tracer.warn(e);
            if (!e.missingRef || missingSchemas[e.missingRef] > 3) {
              sails.tracer.warn(e);
              throw e;
            }
            missingSchemas[e.missingRef] = missingSchemas[e.missingRef] ?
              (missingSchemas[e.missingRef] += 1) : 1;
            sails.tracer.warn('retrying', e.missingRef);
          }
        }
        console.log("VALIDATOR :: loading %s complete", i);
      });
    }
    /** eslint-enable */
    sails.tracer.info('VALIDATORS', Object.keys(this.validators));
    cb();
  },

  validate(data, model, options) {
    let result;
    try {
      if (typeof this.validators[model.toLowerCase()] === 'function') {
        result = this.validators[model.toLowerCase()](data);
      } else {
        sails.tracer.info('VALIDATORS :: ', model, ' validator is not a function', typeof this.validators[model.toLowerCase()]);
        return false;
      }
    } catch (e) {
      sails.tracer.info('model issues', e, model);
    }
    if (!result) {
      // result = normalize(this.validators[model.toLowerCase()].errors);
      console.log(this.validators[model.toLowerCase()].errors);
      result = normaliseErrorMessages(this.validators[model.toLowerCase()].errors);
    }
    return result;
  }
};
