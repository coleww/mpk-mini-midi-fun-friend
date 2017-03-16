// 48 to 72: notes
// pad bank 2: 32-39
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange
var samplePlayer = require('../utils/samplePlayer')

var buildFx = require('../utils/fx')
var valueMap = require("value-map");
module.exports = function (ac, cb) {
  var fx = buildFx(ac)
  var destination = wireUpFx(ac, fx)
  var handlers = {}
  var count = 0
  var total = 33

  function done (note, handler) {
    handlers[note] = handler
    if (++count === total) {
      console.log('calling back')
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
    addKnobHandler(ac, note, fx, done)
  }
  for (var note = 48; note <= 72; note++) {
    addSampleHandler(ac, note, destination, handlers, done)
  }
  for (var note = 32; note <= 39; note++) {
    addSampleHandler(ac, note, destination, handlers, done)
  }
}
//
function addSampleHandler (ac, note, destination, handlers, cb) {
  samplePlayer(ac, `/samples/organs/${note}.ogg`, note, destination, handlers, cb)
}

function addKnobHandler (ac, note, fx, cb) {
  cb(note, function (data) {
    if (data[0] === 176) {
      if (note === 1) {
        fx.delay.delayTime = valueMap(data[2], 0, 127, 1, 5000)
      } else if (note === 2) {
        fx.delay.cutoff = valueMap(data[2], 0, 127, 200, 15000)
      } else if (note === 3) {
        fx.overdrive.drive = valueMap(data[2], 0, 127, 0, 1)
      } else if (note === 4) {
        fx.moog.cutoff = valueMap(data[2], 0, 127, 0.1, 1)
      } else if (note === 5) {
        fx.moog.resonance = valueMap(data[2], 0, 127, 0, 4)
      } else if (note === 6) {
        fx.reverb.roomSize = valueMap(data[2], 0, 127, 0, 1)
      } else if (note === 7) {
        fx.reverb.dampening = valueMap(data[2], 0, 127, 0, 20000)
      } else if (note === 8) {
        fx.reverb.wet = valueMap(data[2], 0, 127, 0, 1)
      } else {
        console.log('wut', data)
      }
    }
  })
}

function wireUpFx (ac, fx) {

  // console.log(fx.reverb.connect(ac.destination))
  fx.overdrive.connect(fx.reverb)
  fx.reverb.connect(fx.moog.input)
  // fx.moog.connect(fx.delay.input)
  fx.moog.connect(ac.destination)
  // fx.delay.connect(ac.destination)
  return fx.overdrive
}
