import test from 'ava'
import { p, img, label, input, span } from '../index.js'

test('empty', t => {
  t.deepEqual(p(), '<p></p>')
  t.deepEqual(img(), '<img>')
})

test('attributes', t => {
  t.deepEqual(p({ id: 'foo' }), '<p id="foo"></p>')
  t.deepEqual(img({ src: 'http://foo/bar.png' }), '<img src="http://foo/bar.png">')
})

test('classes', t => {
  t.deepEqual(p(['foo', 'bar']), '<p class="foo bar"></p>')
  t.deepEqual(img(['big']), '<img class="big">')
})

test('content', t => {
  t.deepEqual(p('blah blah', ' more', ' yet more'), '<p>blah blah more yet more</p>')
})

test('no content allowed', t => {
  t.throws(() => img('should not be here'))
})

test('composition', t => {
  t.deepEqual(p(img()), '<p><img></p>')
})

test('everything', t => {
  const id = 'the-id'
  const src = 'data:image'
  t.deepEqual(p(
    ['foo', 'bar'],
    { id },
    'blah blah ',
    img(['a'], { src }),
    ' more',
    ' yet more'),
  '<p id="the-id" class="foo bar">blah blah <img src="data:image" class="a"> more yet more</p>')
})

const subtitle = (...content) => p(['subtitle'], ...content)

test('custom', t => {
  t.deepEqual(subtitle('blah', ' blah'), '<p class="subtitle">blah blah</p>')
})

let nextCount = 0
const marginNote = (...content) => {
  ++nextCount
  const id = `mn-i${nextCount}`
  return label(['margin-toggle'], { for: id }, '⊕') +
        input(['margin-toggle'], { id, type: 'checkbox' }) +
        span(['marginnote'], ...content)
}

test('complex', t => {
  t.deepEqual(marginNote('blah', ' blah'),
    '<label for="mn-i1" class="margin-toggle">⊕</label><input id="mn-i1" type="checkbox" class="margin-toggle"><span class="marginnote">blah blah</span>')
})
