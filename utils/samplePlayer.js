var loadSample2Buff = require('load-sample-2-buff')
var SamplePlayer = require('openmusic-sample-player')
var ZERO = 0.00001
var ATTACK = 0.0015
var DECAY = 0.015
var PEAK = 0.9
var PAD_PEAK = 0.15
module.exports = function (ac, path, note, destination, handlers, isLoop, cb) {
  var playerA = SamplePlayer(ac)
  var playerB;
  var gain = ac.createGain()
  var isOn = false
  gain.gain.value = 0
  gain.connect(destination)
  loadSample2Buff(ac, path, function(buffer) {
    playerA.buffer = buffer
    playerA.loop = true
    playerA.connect(gain)
    if (!isLoop) playerA.start(ac.currentTime)

    if (note >= 48 && note <= 72) {
      // it's a "key"! make a second buffer and layer them to obscure clipping
      playerB = SamplePlayer(ac)
      playerB.buffer = buffer
      playerB.loop = true
      playerB.connect(gain)
      playerB.start(ac.currentTime + (buffer.duration / 2))
    }
    cb(note, function (data) {
      if (data[0] === 144) {
        // noteOn
        if (note >= 48 && note <= 72) {
          // it's a key! ramp it up
          gain.gain.linearRampToValueAtTime(PEAK, ac.currentTime + ATTACK)
          isOn = true
        } else if (note >= 32 && note <= 39) {
          // it's a sample/loop, toggle it on or off
          if (isOn) {
            handlers.stream.write([128, note, 127])
            gain.gain.linearRampToValueAtTime(ZERO, ac.currentTime + DECAY)
            isOn = false
          } else {
            handlers.stream.write([144, note, 127])
            gain.gain.linearRampToValueAtTime(PAD_PEAK, ac.currentTime + ATTACK)
            isOn = true
          }
        } else {
          console.log('wut wut', data)
        }
      } else if (data[0] === 128) {
        // noteOff
        if (note >= 48 && note <= 72) {
          gain.gain.linearRampToValueAtTime(ZERO, ac.currentTime + DECAY)
          isOn = false
        } else if (note >= 32 && note <= 39) {
          var noteType = isOn ? 144 : 128
          handlers.stream.write([noteType, note, 127])
        } else {
          console.log('wut wut', data)
        }
      } else {
        console.log('wut wut', data)
      }
    })
  })

  return {
    start: function (time) {
      playerA.start(time)
    }
  }
}