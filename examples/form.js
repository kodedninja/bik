var bik = require('..')
var html = require('nanohtml')

var label = bik({name: ''}, (t) => {
	return html`
		<div>hello ${t.name}</div>
	`
})

var input = bik((t) => {
	return html`
		<input type="text" onkeyup="${key}">
	`

	function key() {
		label.name = this.value
		label.r()
	}
})

label.a(document.body)
input.a(document.body)

console.log(input.element)
