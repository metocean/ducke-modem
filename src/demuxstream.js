// Generated by CoffeeScript 1.8.0
module.exports = (function(_this) {
  return function(stream, stdout, stderr) {
    var header;
    header = null;
    return stream.on('readable', function() {
      var payload, type, _results;
      console.log('READABLE');
      header = header || stream.read(8);
      _results = [];
      while (header != null) {
        if (typeof header === 'string') {
          header = new Buffer(header);
        }
        type = header.readUInt8(0);
        payload = stream.read(header.readUInt32BE(4));
        if (payload == null) {
          break;
        }
        if (type === 2) {
          stderr.write(payload);
        } else {
          stdout.write(payload);
        }
        _results.push(header = stream.read(8));
      }
      return _results;
    });
  };
})(this);
