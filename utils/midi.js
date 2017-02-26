var midi = require('web-midi')
var stream = midi('MPK mini', {})
var handlers

module.exports = function (_handlers) {
  handlers = _handlers
  handlers.stream = stream
  stream.on('data', function(data){

    console.log(data, data[1], handlers)
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange
    handlers[data[1]](data)
  })

  return {
    stream: stream,
    update: function (_handlers) {
      handlers = _handlers
      handlers.stream = stream
    }
  }
}