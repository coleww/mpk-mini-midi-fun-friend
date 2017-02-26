// 48 to 72: notes
// pad bank 2: 32-39
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange
var loadSample2Buff = require('load-sample-2-buff')
var SamplePlayer = require('@coleww/openmusic-sample-player')
var ZERO = 0.000000001
var ATTACK = 0.015
var DECAY = 0.025
var PEAK = 0.65

module.exports = function (ac, cb) {
  var handlers = {}
  var done = 0
  var total = 25
  for (var _note = 48; _note <= 72; _note++) {
    var _playerA = SamplePlayer(ac)
    var _playerB = SamplePlayer(ac)
    var _gain = ac.createGain()
    _gain.gain.value = 0
    _gain.connect(ac.destination)
    ;(function (note, gain, playerA, playerB) {
      loadSample2Buff(ac, `./samples/organs/${note}.ogg`, function(buffer) {
        playerA.buffer = buffer
        playerB.buffer = buffer
        playerA.loop = true
        playerB.loop = true
        playerA.connect(gain)
        playerB.connect(gain)
        playerA.start(ac.currentTime)
        playerB.start(ac.currentTime + (buffer.duration / 2))
        console.log(note)
        handlers[note] = function (data) {
          console.log('HANDLING', data)
          if (data[0] === 144) {
            gain.gain.exponentialRampToValueAtTime(PEAK, ac.currentTime + ATTACK)
          } else if (data[0] === 128) {
            gain.gain.exponentialRampToValueAtTime(ZERO, ac.currentTime + DECAY)
          }
        }

        if (++done === total) {
          console.log(done, handlers)
          cb(handlers)
        }
      })
    })(_note, _gain, _playerA, _playerB)
  }
}
