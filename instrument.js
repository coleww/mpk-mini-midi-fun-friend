var midiutils = require('midiutils')
midiutils.noteNumberToFrequency( 69 )

module.exports = {
  noteOn: function (data) {

  },
  noteOff: function (data) {

  },
  knobChange: function (data) {
    // modify reverb/delay/fx
    // gain
    // ...
  }

}
window.AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext()
var pie = require('pie-ano')(ac)
pie.connect(ac.destination)

// set the frequency/ADSR
pie.update({midiNote: 72, attack: 0.3, decay: 0.1, sustain: 0.3, release: 0.5, peak: 0.5, mid: 0.3, end: 0.00000001})
// and trigger it!
pie.start(ac.currentTime)


// destroy the oscillators completely. u probably would only wanna do this for garbage collection porpoises.
pie.stop(ac.currentTime)


// this will return an object containing all the nodes in the pie-ano audioGraph, for closer-to-the-metal manipulation than the update/start methods provide.
pie.nodes()
    var loadSample2Buff = require('load-sample-2-buff')

    var SamplePlayer = require('openmusic-sample-player')

    var audioContext = new AudioContext()
    var player = SamplePlayer(audioContext)

    loadSample2Buff(audioContext, './noise.ogg', function(buffer){
        player.buffer = buffer
        player.start()
    })


adsr(gain, ac.currentTime, {attack: 0.25, decay: 0.1, sustain: 0.2, release: 0.05, peak: 0.7, mid: 0.5, end: 0.000001})


var SamplePlayer = require('openmusic-sample-player');

var audioContext = new AudioContext();
var player = SamplePlayer(audioContext);

// suppose you have a BufferSource in `buffer` already

player.buffer = buffer;

// if you want to make it loop
player.loop = true;

// and start playing!
player.start();