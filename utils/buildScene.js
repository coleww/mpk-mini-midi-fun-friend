// 48 to 72: notes
// pad bank 2: 32-39
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange
var samplePlayer = require('../utils/samplePlayer')


module.exports = function (ac, path, cb) {
  var destination = ac.destination
  var handlers = {}
  var count = 0
  var total = 39
  var loops = []
  var knobs = []

  function done (note, handler) {
    handlers[note] = handler
    if (++count === total) {
      console.log('calling back')
      var time = ac.currentTime + 1
      setTimeout(function () {

        loops.forEach(function (loop) {
          loop.start(time)
        })
      }, 500)
      cb(handlers)

      // blinking
      // setInterval(function () {
      //   var note = (~~(Math.random() * 8) + 32)
      //   handlers.stream.write([128, note, 127])
      //   var note = (~~(Math.random() * 8) + 32)
      //   handlers.stream.write([144, note, 127])
      // }, 150)
    }
  }
  for (var note = 1; note <= 8; note++) {
    var startLoop = addSampleHandler(ac, note, destination, handlers, true, path)
    loops.push(startLoop)
    addKnobHandler(ac, note, startLoop, done)

  }
  for (var note = 48; note <= 72; note++) {
    addSampleHandler(ac, note, destination, handlers, false, path, done)
  }
  for (var note = 32; note <= 39; note++) {
    var startLoop = addSampleHandler(ac, note, destination, handlers, true, path, done)
    loops.push(startLoop)
  }

}
//
function addSampleHandler (ac, note, destination, handlers, isLoop, path, cb) {
  return samplePlayer(ac, `/samples/${path}/${note}.ogg`, note, destination, handlers, isLoop, cb)
}



function addKnobHandler (ac, note, startLoop, cb) {
  cb(note, function (data) {
    if (data[0] === 176) {
        startLoop.change(data[2], ac.currentTime)
    }
  })
}

