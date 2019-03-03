# bik
Simple functional components for non-choo & [choo](https://github.com/choojs/choo) environments. Provides a state around [morfine](https://github.com/kodedninja/morfine).

## Installation
```
npm i bik
```

## Example
```javascript
var component = require('bik')
var html = require('nanohtml')

var counter = component({ count: 0 }, function (ctx, amount) {
  return html`
    <div onclick="${click}">Count is ${ctx.count}</div>
  `

  function click () {
    ctx.count += amount
    ctx.r()
  }
})

// non-choo
document.body.appendChild(counter())

// choo
html`${counter(2)}`
```

It also works standalone in the browser by including `build/bik.min.js`. It provides a global `bik` function.

## Why?

To write simple components and be able to use them outside of Choo.

Bik's philosophy:
- Support both choo and non-choo environments
- Direct access to the whole context (state + component)
- No events, only functions

## API
### `render(...props) = bik(initialState, renderer(context, ...props))`
Initialize a new `bik` instance. `initialState` is an `object`. The `renderer` function gets the whole context (state + component) as an argument, followed by the arguments of the `render` call.

### `component.load(el)`
Called when the element was mounted via [`on-load`](https://github.com/shama/on-load).

### `component.unload(el)`
Called when the element was unmounted via [`on-load`](https://github.com/shama/on-load).

### `component.rerender()` or `component.r()`
Rerenders the component.

### `component.beforerender(el)`
Called after the new tree has been generated, but not yet rendered.

### `component.afterrender(el)`
Called after the new tree was rendered.

### `component.el`
The current DOM Node in the document.

## See Also
- [nanocomponent](https://github.com/choojs/nanocomponent)
- [fun-component](https://github.com/tornqvist/fun-component/)
- [microcomponent](https://github.com/yoshuawuyts/microcomponent)
