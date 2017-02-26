// 48 to 72: notes
// pad bank 2: 32-39
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange
var samplePlayer = require('../utils/samplePlayer')
var ZERO = 0.00001
var ATTACK = 0.015
var DECAY = .15
var PEAK = 0.9
var PAD_PEAK = 0.15
var buildFx = require('../fx')

module.exports = function (ac, cb) {
  var fx = buildFx(ac)
  var handlers = {}
  var count = 0
  var total = 33

  function done (note, handler) {
    handlers[note] = handler
    if (++count === total) {
      console.log('calling back')
      cb(handlers)
    }
  }
  for (var note = 1; note <= 8; note++) {
    addKnobHandler(ac, note, done)
  }
  for (var note = 48; note <= 72; note++) {
    addSampleHandler(ac, note, done)
  }
  for (var note = 32; note <= 39; note++) {
    addSampleHandler(ac, note, done)
  }
}
//
function addSampleHandler (ac, note, cb) {
  samplePlayer(ac, `/samples/organs/${note}.ogg`, note, cb)
}

function addKnobHandler (ac, note, cb) {
  cb(note, function (data) {
    if (data[0] === 176) {
      if (note === 1) {

      } else if (note === 2) {

      } else if (note === 3) {

      } else if (note === 4) {

      } else if (note === 5) {

      } else if (note === 6) {

      } else if (note === 7) {

      } else if (note === 8) {

      } else {

      }
    }
  })
}
