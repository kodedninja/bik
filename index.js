const nanomorph = require('nanomorph')

module.exports = bik

function bik(t, f) {
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
			throw new Error('the handler function must return a HTML Node')
		}
		nanomorph(t.element, newtree)
	}

	t.a = t.append = function (root) {
		if (!_added) {
			t.element = f(t)
		} else {
			throw new Error('cannot use a component multiple times')
		}

		root.appendChild(t.element)
		_added = true
	}

	t.prepend = function (root) {
		if (!_added) {
			t.element = f(t)
		} else {
			throw new Error('cannot use a component multiple times')
		}

		root.insertBefore(t.element, root.firstChild)
		_added = true
	}

	return t
}
