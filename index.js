




// load array of scene functions
// load midi/keyboard handler logic
// bind defaults together
// bind some UI to swap out scenes (maybe use a hash url?)

// 48 to 72: notes
// pad bank 2: 32-39
    // [type, key, value]
    // 144: noteOn, 128: noteOff, 176: knobChange




var ac = new (window.AudioContext || window.webkitAudioContext)();
require('./scenes/organs')(ac, require('./utils/midi'))
