# Generation and composition of HTML from JavaScript

Import functions for whatever tags you are using:

```js
import { p, img } from 'ez-html-elements'
```

These functions generate HTML as a string:

| JavaScript | Generates | |
| ----| ----| --- |
| `p()` | `<p></p>` | No argments generates an empty element. |
| `img()` | `<img>` | The closing tag is omitted from elements that don't need them. |
| `p({ id: 'foo' })`<br><br>`img({ src: 'http://foo/bar.png' })` | `<p id="foo"></p>`<br><br>`<img src="http://foo/bar.png">` | An object argument generates attributes |
|`p(['foo', 'bar'])`<br><br>`img(['big'])` | `<p class="foo bar"></p>`<br><br>`<img class="big">` | An array argument generates a `class` attribute. |
`p('blah blah', ' more', ' yet more')` | `<p>blah blah more yet more</p>` | String arguments are concatenated as content. |
| `p(img())` | `<p><img></p>` | Elements can be composed. |

Here is an example that combines all the above

```js
  const id = 'the-id'
  const src = 'data:image'
  t.deepEqual(p(
    ['foo', 'bar'],
    { id },
    'blah blah ',
    img(['a'], { src }),
    ' more',
    ' yet more')
```

which generates

```html
<p id="the-id" class="foo bar">blah blah <img src="data:image" class="a"> more yet more</p>
```

## Going beyond the basics

The great power comes composition and using JavaScript to create component generators.

For example you could define a custom generator like this:

```js
const subtitle = (...content) => p(['subtitle'], ...content)
```

Then

```js
subtitle('blah', ' blah')
```

generates

```html
<p class="subtitle">blah blah</p>
```

Or as a more complicated case that really shows the power, say you define a
custom generator like so:

```js
import { label, input, span } from 'ez-html-elements'

...

let nextCount = 0
const marginNote = (...content) => {
  ++nextCount
  const id = `mn-i${nextCount}`
  return label(['margin-toggle'], { for: id }, '⊕') +
        input(['margin-toggle'], { id, type: 'checkbox' }) +
        span(['marginnote'], ...content)
}
```

Then

```js
marginNote('blah', ' blah')
```

generates<sup>[1](#f1S)</sup>

```html
<label for="mn-i1" class="margin-toggle">⊕</label>
<input id="mn-i1" type="checkbox" class="margin-toggle">
<span class="marginnote">blah blah</span>
```

## Coverage

You can import any non-deprecated, non-experimental element listed in the MDN
[HTML elements reference][1]. The JavaScript function names have the same name
as the corresponding tag<sup>[2](#f2)</sup>.

<a name="f1"><sup>1</sup></a>:  For clarity newlines are added to this HTML.
Actually a single line is generated.

<a name="f2"><sup>2</sup></a>: With the exception of `<var>x</var>` which you
must write as `v('x')` because `var` is a reserved identifier in JavaScript.

[1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
