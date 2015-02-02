module.exports = (stream, stdout, stderr) =>
  type = null
  count = 0
  stream.on 'readable', ->
    while yes
      while count > 0
        payload = stream.read 1
        return if !payload?
        count--
        if type is 2
          stderr.write payload
        else
          stdout.write payload
      header = stream.read 8
      return if !header?
      type = header.readUInt8 0
      count = header.readUInt32BE 4