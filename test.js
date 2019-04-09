var test = require('tape')
var html = require('nanohtml')
var fake = require('fek')
var component = require('.')

test('renderer function required', function (t) {
  t.plan(2)
  t.throws(component, 'throws without arguments')
  t.throws(component.bind(undefined, { a: 5 }), 'throws with only state')
})

test('render with prop', function (t) {
  var render = component(greeting)

  t.plan(1)
  // only check the innerHTML to ignore onload id
  t.equal(
    render('world').innerHTML,
    greeting({}, 'world').innerHTML,
    'innerHTML match'
  )
})

test('lifecycle methods are called', function (t) {
  var render = component(greeting)
  render()

  var after = fake()
  render.afterrender = after

  t.plan(2)
  t.equal(after.callCount(), 0, 'is 0 before')
  render.r()
  t.equal(after.callCount(), 1, 'is 1 after')
})

test('context is passed', function (t) {
  var render = component({ text: 'hello' }, function (ctx) {
    return html`<div>${ctx.text}</div>`
  })

  t.plan(1)
  t.equal(render().innerHTML, 'hello', 'innerHTML match')
})

test('rerender works', function (t) {
  var render = component({ text: 'hello' }, function (ctx) {
    return html`<div>${ctx.text}</div>`
  })

  t.plan(2)
  t.equal(render().innerHTML, 'hello', 'innerHTML match before')
  render.text = 'hello world'
  render.r()
  t.equal(render().innerHTML, 'hello world', 'innerHTML match after')
})

test('load', function (t) {
  var render = component({ text: 'hello' }, function (ctx) {
    return html`<div>${ctx.text}</div>`
  })

  var load = fake()
  render.load = load

  document.body.appendChild(render())

  t.plan(1)
  // delay assertion for on-load
  setTimeout(function () {
    t.equal(load.callCount(), 1, 'was called once')
    // cleanup
    document.body.removeChild(document.body.childNodes[1])
  })
})

test('unload', function (t) {
  var render = component({ text: 'hello' }, function (ctx) {
    return html`<div>${ctx.text}</div>`
  })

  var unload = fake()
  render.unload = unload

  document.body.appendChild(render())

  t.plan(1)
  // delay assertion for on-load
  setTimeout(function () {
    document.body.removeChild(document.body.childNodes[1])

    // delay assertion for on-load
    setTimeout(function () {
      t.equal(unload.callCount(), 1, 'was called once')
    })
  })
})

function greeting (ctx, name) {
  return html`
    <div>
      <h1>Hello ${name}!</h1>
    </div>
  `
}
