# bik
Simple functional components for non-choo & [choo](https://github.com/choojs/choo) environments. State around [morfine](https://github.com/kodedninja/morfine).

## Installation
```
npm i -S bik
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
- choo and non-choo compatibility
- direct access to the whole state (via `ctx` or the component itself)
- no events, only functions

## api
### `component(props) = bik(initialState, renderer(context, ...props))`
Initialize a new `bik` instance. `initialState` is an `object`. The `renderer` function gets the whole context as an argument, followed by the arguments of the call.

### `component.load(el)`
Called when the element was mounted.

### `component.unload(el)`
Called when the element was unmounted.

### `component.rerender()` or `component.r()`
Rerenders the component.

### `component.beforerender(el)`
Called before the component was rerendered.

### `component.afterrender(el)`
Called after the component was rerendered.

### `component.el`
The component's DOM Node.

## See Also
- [nanocomponent](https://github.com/choojs/nanocomponent)
- [fun-component](https://github.com/tornqvist/fun-component/)
- [microcomponent](https://github.com/yoshuawuyts/microcomponent)
