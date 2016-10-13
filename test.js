var tap = require('tap')

var mpkMiniMidiHandler = require('./')

tap.test('does the thing', function (t) {
  t.plan(1)
  t.equal(mpkMiniMidiHandler('world'), 'hello world', 'does it')
})
