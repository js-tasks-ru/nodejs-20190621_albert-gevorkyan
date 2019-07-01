const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.new_str = ""
  }

  _transform(chunk, encoding, callback) {
      var a = chunk.toString()
      a = a.split(os.EOL)
      if (this.new_str != "") {
          if (a[0] === "") {
              this.push(this.new_str)
              this.new_str = ""
          } else {
              a[0] = this.new_str + a[0]
              this.new_str = ""
          }
      }
      if (a[a.length - 1] === "") {
          a.pop()
      } else {
          this.new_str += a.pop()
      }
      for (var i of a) {
          this.push(i)
      }
     callback(null)
  }

  _flush(callback) {
      if (this.new_str != "")
      callback(null, this.new_str)
  }
}

module.exports = LineSplitStream;
