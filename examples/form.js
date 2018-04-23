var bik = require('..')
var html = require('nanohtml')

var input = bik((t) => {
	return html`
		<input type="text" onkeyup="${key}">
	`

	function key() {
		label.name = this.value
		label.r()
	}
})

var label = bik({name: ''}, (t) => {
	return html`
		<div>hello ${t.name}</div>
	`
})

label.a(document.body)
input.a(document.body)
