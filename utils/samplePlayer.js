var loadSample2Buff = require('load-sample-2-buff')
var SamplePlayer = require('openmusic-sample-player')

module.exports = function (ac, path, note, cb) {
  var playerA = SamplePlayer(ac)
  var playerB = SamplePlayer(ac)
  var gain = ac.createGain()
  var isOn = false
  gain.gain.value = 0
  gain.connect(ac.destination)
  loadSample2Buff(ac, path, function(buffer) {
    playerA.buffer = buffer
    playerA.loop = true
    playerA.connect(gain)
    playerA.start(ac.currentTime)

    if (note >= 48 && note <= 72) {
      playerB.buffer = buffer
      playerB.loop = true
      playerB.connect(gain)
      playerB.start(ac.currentTime + (buffer.duration / 2))
    }
    cb(note, function (data) {
      if (data[0] === 144) {
        if (note >= 48 && note <= 72) {
          gain.gain.linearRampToValueAtTime(PEAK, ac.currentTime + ATTACK)
          isOn = true
        } else if (note >= 32 && note <= 39) {
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

  }
}