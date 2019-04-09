var morfine = require('morfine')
var assert = require('assert')
var onload = require('on-load')
var OL_KEY_ID = onload.KEY_ID
var OL_ATTR_ID = onload.KEY_ATTR

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
  function _create (args) {
    wrapper = morfine(() => renderer(ctx, ...args), _handleBefore, _handleAfter)

    // attach event handlers
    onload(wrapper.el, _handleLoad, _handleUnload, ctx._bid)

    // shortcuts to wrapper
    Object.defineProperty(ctx, 'el', {
      get: function () {
        return wrapper.el
      }
    })
    ctx.r = ctx.rerender = function () {
      ctx._olID = wrapper.el.dataset[OL_KEY_ID]
      wrapper.r()
    }
  }

  // handlers
  function _handleBefore (el) {
    if (ctx.beforerender) ctx.beforerender(el)
  }

  function _handleAfter (el) {
    if (ctx._olID) el.setAttribute(OL_ATTR_ID, ctx._olID)
    if (ctx.afterrender) ctx.afterrender(el)
  }

  function _handleLoad (el) {
    if (ctx.load) ctx.load(el) // load
  }

  function _handleUnload (el) {
    if (ctx.unload) ctx.unload(el) // unload
  }

  return ctx
}

module.exports = bik
if (typeof window !== 'undefined') window.bik = bik
