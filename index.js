




// load array of scene functions
// load midi/keyboard handler logic
// bind defaults together
// bind some UI to swap out scenes (maybe use a hash url?)

// 48 to 72: notes
// pad bank 2: 32-39
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange
// var path =

function getHash () {
  return window.location.hash.substr(1)
}
var midi = require('./utils/midi')()

window.addEventListener("hashchange", function () {
  bootUp(getHash(), true)
})
var ac;
var buildScene = require('./utils/buildScene')
function bootUp (path, destroy) {
  if (destroy) ac.close()
  console.log('AC SLATER')
  ac = new AudioContext()// || window.webkitAudioContext)();

  buildScene(ac, path, midi.update)
}
bootUp(getHash(), false)

// var midiDevices = require("web-midi-devices");

// midiDevices.inputs().then(log_names);
// midiDevices.outputs().then(log_names);

// function log_names(names){
//     console.log(names); // Array of strings of device names
// }