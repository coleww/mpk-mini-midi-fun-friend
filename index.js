




// load array of scene functions
// load midi/keyboard handler logic
// bind defaults together
// bind some UI to swap out scenes (maybe use a hash url?)

// 48 to 72: notes
// pad bank 2: 32-39
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange



console.log('AC SLATER')
var ac = new AudioContext()// || window.webkitAudioContext)();
var buildScene = require('./utils/buildScene')
// var scenes = [
//   require('./scenes/organs')
// ]
buildScene(ac, 'organs', require('./utils/midi'))






