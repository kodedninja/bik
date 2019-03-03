var component = require('..')
var html = require('nanohtml')

var counter = component({ count: 0 }, function (ctx, amount) {
  return html`
    <div onclick="${click}">Count is ${ctx.count}</div>
  `

  function click () {
    ctx.count += amount
    ctx.r()
  }
})

counter.onload = function (el) {
  console.log(el)
}

module.exports = () => html`${counter(2)}`
