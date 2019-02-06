const nm = require('nanomorph')

const INVALID_PROPS = ['arguments', 'caller', 'length', 'name', 'prototype']

module.exports = function (is, f) {
	if (typeof is === 'function') {
		f = is
	}
	if (typeof f !== 'function') {
		throw new Error('bik needs at least a handler function.')
	}
	var _added = false

	var t = function (root) {
		_init()
		root.appendChild(t.element)
		// call load if exists
		if (t.load) t.load(t.element)
	}
	// set initial state
	Object.keys(is).map(key => {
		if (INVALID_PROPS.indexOf(key) !== -1) throw new Error(`cannot use "${key}" as property name`)
		t[key] = is[key]
	})

	t.element = null

	t.r = t.render = function() {
		var newtree = f(t)
		if (!newtree) {
			throw new Error('the handler function must return an HTML Node')
		}
		var el = nm(t.element, newtree)
		// call afterupdate if exists
		if (t.afterupdate) t.afterupdate(el)
	}

	t.prepend = function (root) {
		_init()
		root.insertBefore(t.element, root.firstChild)
		if (t.load) t.load(t.element)
	}

	function _init() {
		if (!_added) {
			t.element = f(t)
			_added = true
		} else {
			throw new Error('cannot use a component multiple times')
		}
	}

	return t
}
