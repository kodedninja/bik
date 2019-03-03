var morfine = require('morfine')
var onload = require('on-load')
var assert = require('assert')

var INVALID_PROPS = ['arguments', 'caller', 'length', 'name', 'prototype']

// (object?, fn) -> fn
function bik (initialState, renderer) {
  if (typeof initialState === 'function') {
    renderer = initialState
  }
  assert(typeof renderer === 'function', 'bik: renderer must be a function')

  var wrapper = null

  var ctx = function (...args) {
    if (!wrapper) {
      _create(args)
    }
    return wrapper.el
  }

  // set initial state
  Object.keys(initialState).map(key => {
    if (INVALID_PROPS.indexOf(key) !== -1) throw new Error(`bik: cannot use "${key}" as state property name`)
    ctx[key] = initialState[key]
  })

  // initialize the wrapper and pass everything
  function _create(args) {
    wrapper = morfine(() => renderer(ctx, ...args))

    // attach event handlers
    onload(wrapper.el, (el) => {
      if (ctx.load) ctx.load(el)      // load
    }, (el) => {
      if (ctx.unload) ctx.unload(el)  // unload
    })
    wrapper.beforerender = (el) => {
      if (ctx.beforerender) ctx.beforerender(el)   // beforerender
    }
    wrapper.afterrender = (el) => {
      if (ctx.afterrender) ctx.afterrender(el)     // afterrender
    }

    // shortcuts to wrapper
    ctx.el = wrapper.el
    ctx.r = ctx.rerender = function () {
      wrapper.r()
    }
  }

  return ctx
}

module.exports = bik
