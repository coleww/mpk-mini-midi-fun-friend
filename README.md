mpk-mini-midi-handler
----------------

TODO:
...

!!!!!!!!
accept an opts thingy that maps midi numbers to samples?
ALSO
have listeners/handlers bound for the various midi numbers,
which get passed the sample from opts,
would also work with like, fx + knobs

THAT WAY:
one file can handle loading all this stuff into a node/making connections,
and the web audio stuff gets passed to handlers as needed.

COULD ALSO: do visuals in the same way. one file does the setup and exports update methods,
those get passed to handlers and fed inputs.

MAYBE POSSIBLY: (BE HECKA MODULAR)
build a drum sequencer, use pads to turn layers on/off (or knobs)
pads to turn on/off fx

MAP THING so you can turn keyboard input into mpk version!
// [type, key, value]
// 144: noteOn, 128: noteOff, 176: knobChange

pads turn loops on and off
which also adds/removes gifs from background


knobs fiddle some good good FX paramaters
this also adds CSS stuff to gifs? (can u css a gif?)


keys play...ermmm...basic piano thing? with a buncha reverb i guess?
like...jam on some noises
maybe this also...controls a random walker/god trash particle thing that is on top of the gifs?


HOW TO? set pad light on/off (EZ!)
swap instrument/sample sets on the fly?