const nm = require('nanomorph')

module.exports = function (t, f) {
	if (typeof t === 'function') {
		f = t
		t = {}
	}
	if (typeof f !== 'function') {
		throw new Error('bik needs at least a handler function.')
	}
	var _added = false

	t.element = null

	t.r = t.render = function() {
		var newtree = f(t)
		if (!newtree) {
			throw new Error('the handler function must return an HTML Node')
		}
		nm(t.element, newtree)
	}

	t.a = t.append = function (root) {
		init()
		root.appendChild(t.element)
	}

	t.prepend = function (root) {
		init()
		root.insertBefore(t.element, root.firstChild)
	}

	function init() {
		if (!_added) {
			t.element = f(t)
			_added = true
		} else {
			throw new Error('cannot use a component multiple times')
		}
	}

	return t
}
