const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {

  constructor(options) {
    super(options);
    this.limit = options.limit
    this.stop = 0
  }

  _transform(chunk, encoding, callback) {
      this.stop += chunk.toString().length
      if (this.stop > this.limit) {
          callback(new LimitExceededError)
      }
      callback(null, chunk)
  }
}

module.exports = LimitSizeStream;
