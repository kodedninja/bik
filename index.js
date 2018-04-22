const nanomorph = require('nanomorph')

module.exports = bik

function bik(t, f) {
	if (typeof t === 'function') {
		f = t
		t = {}
	}
	if (typeof f !== 'function') {
		throw new Error('bik needs at least a function.')
	}

	var tree = f(t)

	t.r = t.render = function() {
		var newtree = f(t)
		nanomorph(tree, newtree)
	}

	t.a = t.append = function (root) {
		root.appendChild(tree)
	}

	t.prepend = function (root) {
		root.insertBefore(tree, root.firstChild)
	}

	return t
}
