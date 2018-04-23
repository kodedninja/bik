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
I love [`choo`](https://github.com/choojs/choo) but sometimes it's too much. For example when I want to use a simple component, like a changing navigation menu or a counter in a static site. I was too lazy to find a module for that so I've built one.

Uses [`nanomorph`](https://github.com/choojs/nanomorph) under the hood and you need [`nanohtml`](https://github.com/choojs/nanohtml) or something similar.

## api
### `component = bik(state, handler(state))`
Initialize a new `bik` instance. `state` is an `object` that stores the default values for the used variables. The `handler` function is passed as argument the instance itself.

### `component.render()` or `component.r()`
Rerenders the component.

### `component.append(root)` or `component.a(root)`
Appends the component to a `root` Node.

### `component.prepend(root)`
Prepends the component to a `root` Node.
