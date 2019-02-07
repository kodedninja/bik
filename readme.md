# bik
A tiny component toolkit

## installation
```
npm i -S bik
```

## example
```javascript
var bik = require('bik')
var html = require('nanohtml')

var counter = bik({count: 0}, function (t) {
  return html`
    <div onclick="${click}">Count is ${t.count}</div>
  `

  function click() {
    t.count++
    t.r()
  }
})
counter.load = function (el) {
  el.innerHTML += ' (fresh!)'
}
counter.afterupdate = function (el) {
  el.innerHTML += ' (updated!)'
}

counter(document.body)
```

It should also work standalone in the browser by including `build/bik.min.js`. It provides a global `bik` function.

## why?

I love [`choo`](https://github.com/choojs/choo) and how it handles components so I wanted to have a similar experience in cases where choo isn't used. For example when I want to use a single awesome-component (ex: counter, list, responsive menu). It can also be used to build components as modules.

Uses [`nanomorph`](https://github.com/choojs/nanomorph) under the hood and you need [`nanohtml`](https://github.com/choojs/nanohtml) or a similar way to generate DOM.

## api
### `component(root) = bik(initialstate, handler(component))`
Initialize a new `bik` instance. `initialstate` is an `object` that stores the default values for the variables used by the component. The `handler` function gets the component itself as an argument. `component(root)` appends the component to the `root` Node.

### `component.prepend(root)`
Prepends the component to the `root` Node.

### `component.load(el)`
Called when the element was mounted.

### `component.render()` or `component.r()`
Rerenders the component.

### `component.afterupdate(el)`
Called after the component was rerendered.

### `component.element`
The component's DOM Node.

## inspiration
- [choo](https://github.com/choojs/choo)
- [nanocomponent](https://github.com/choojs/nanocomponent)
- [dot-dom](https://github.com/wavesoft/dot-dom)
