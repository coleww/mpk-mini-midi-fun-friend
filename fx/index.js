module.exports = function (ac) {
  var Freeverb = require('freeverb')
  var reverb = Freeverb(ac)
  reverb.roomSize = 0.5 // 0 to 1
  reverb.dampening = 1000 // 0 to 20000
  reverb.dry.value = 1
  reverb.wet.value = 0.75


  var tuna = require('tunajs')(ac)
  var chorus = new tuna.Chorus({
      rate: 1.5,
      feedback: 0.2,
      delay: 0.0045,
      bypass: 0
  })
  var bitcrusher = new tuna.Bitcrusher({
      bits: 4,          //1 to 16
      normfreq: 0.1,    //0 to 1
      bufferSize: 4096  //256 to 16384
  })
  var moog = new tuna.MoogFilter({
      cutoff: 0.065,    //0 to 1
      resonance: 3.5,   //0 to 4
      bufferSize: 4096  //256 to 16384
  })
  var filter = new tuna.Filter({
      frequency: 440, //20 to 22050
      Q: 1, //0.001 to 100
      gain: 0, //-40 to 40 (in decibels)
      filterType: "lowpass", //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
      bypass: 0
  })
  var delay = new tuna.Delay({
      feedback: 0.45,    //0 to 1+
      delayTime: 150,    //1 to 10000 milliseconds
      wetLevel: 0.25,    //0 to 1+
      dryLevel: 1,       //0 to 1+
      cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
      bypass: 0
  })
  var overdrive = new tuna.Overdrive({
      outputGain: 0.5,         //0 to 1+
      drive: 0.7,              //0 to 1
      curveAmount: 1,          //0 to 1
      algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
      bypass: 0
  })
  var phaser = new tuna.Phaser({
      rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
      depth: 0.3,                    //0 to 1
      feedback: 0.2,                 //0 to 1+
      stereoPhase: 30,               //0 to 180
      baseModulationFrequency: 700,  //500 to 1500
      bypass: 0
  })

  return {
    phaser,
    overdrive,
    delay,
    filter,
    moog,
    bitcrusher,
    chorus,
    reverb
  }
}