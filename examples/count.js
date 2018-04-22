var bik = require('..')
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
