var component = require('..')
var html = require('nanohtml')

var label = component({ title: '' }, function (ctx, message) {
  return html`
    <div>hello ${ctx.title}. ${message}</div>
  `
})
label.onload = function (el) {
  el.innerHTML += ' (fresh!)'
}
label.beforerender = function (el) {
  el.innerHTML += ' (rerendered)'
}

var input = component(function () {
  return html`
    <input type="text" onkeyup="${key}">
  `

  function key () {
    label.title = this.value
    label.r()
  }
})

document.body.appendChild(label('welcome!'))
document.body.appendChild(input())
