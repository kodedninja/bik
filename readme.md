# bik
Tiny library for isolated web components

## installation
```
npm i -S bik
```

## example
```javascript
var bik = require('bik')
var html = require('nanohtml')

var counter = bik({count: 0}, (t) => {
	return html`
		<div onclick="${click}">Count is ${t.count}</div>
	`

	function click() {
		t.count++
		t.r()
	}
})

counter.a(document.body)
```

## why?
I love [`choo`](https://github.com/choojs/choo) but sometimes you don't want to use it as the base of a site. For example when I want to use a single component (example: counter, list, responsive menu). It can also be used to build components as modules.

Uses [`nanomorph`](https://github.com/choojs/nanomorph) under the hood and you need [`nanohtml`](https://github.com/choojs/nanohtml) or something similar.

## api
### `component = bik(initialstate, handler(component))`
Initialize a new `bik` instance. `initialstate` is an `object` that stores the default values for the variables used by the component. The `handler` function is passed as argument the instance itself.

### `component.render()` or `component.r()`
Rerenders the component.

### `component.append(root)` or `component.a(root)`
Appends the component to a `root` Node.

### `component.prepend(root)`
Prepends the component to a `root` Node.

### `component.element`
The component's DOM Node.
