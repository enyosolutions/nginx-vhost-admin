function EnyoError(message) {
  if (!message || _.isString(message)) {
    this.name = 'EnyoError';
    this.message = message || '';
  } else {
    Object.keys(message).forEach((i) => {
      this[i] = message[i];
    });
  }
}
EnyoError.prototype = Error.prototype;

EnyoError.prototype.toString = () => (_.isString(this.message)
  ? this.message
  : JSON.stringify(this.message));


module.exports = EnyoError;
