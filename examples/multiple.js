var bik = require('..')
var html = require('nanohtml')

var counter1 = bik({count: 0}, (t) => {
	return html`
		<div onclick="${click}">Count is ${t.count}</div>
	`

	function click() {
		t.count++
		t.r()
	}
})

var counter2 = bik({count: 0}, (t) => {
	return html`
		<div onclick="${click}">Count is ${t.count}</div>
	`

	function click() {
		t.count++
		t.r()
	}
})



counter1.a(document.body)
counter2.a(document.body)
