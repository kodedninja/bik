var bik = require('..')
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

counter(document.body)
