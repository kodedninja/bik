var component = require('..')
var html = require('nanohtml')

var counter = component({ count: 0 }, function (ctx) {
  return html`
    <div onclick="${click}">Count is ${ctx.count}</div>
  `

  function click () {
    ctx.count++
    ctx.r()
  }
})

counter.onload = function (el) {
  console.log(el)
}

module.exports = () => html`${counter()}`
