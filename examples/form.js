var bik = require('..')
var html = require('nanohtml')

var label = bik({ title: '' }, function (t) {
  return html`
    <div>hello ${t.title}</div>
  `
})
label.load = function (el) {
  el.innerHTML += ' (fresh!)'
}
label.afterupdate = function (el) {
  el.innerHTML += ' (updated!)'
}

var input = bik(function (t) {
  return html`
    <input type="text" onkeyup="${key}">
  `

  function key () {
    label.title = this.value
    label.r()
  }
})

label(document.body)
input(document.body)
