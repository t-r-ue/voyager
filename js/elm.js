(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$initialModel = {
	activeModalTabImage: $elm$core$Maybe$Nothing,
	activeMood: 'all',
	addOnHelicopter: false,
	addOnSommelier: false,
	addOnYacht: false,
	bookingBarForm: {checkin: '2026-07-08', checkout: '2026-07-15', destinationId: '', guests: '2 Guests', promo: ''},
	bookingForm: {budget: '$3,000 - $6,000', checkin: '2026-07-08', checkout: '2026-07-15', email: '', name: '', notes: '', travelers: '2'},
	bookingStep: 1,
	heroIndex: 0,
	inquirySubmittedRef: $elm$core$Maybe$Nothing,
	isTripPanelOpen: false,
	itinerary: _List_Nil,
	mobileNavOpen: false,
	navElevated: false,
	newsletterEmail: '',
	newsletterJoined: false,
	searchQuery: '',
	selectedDetailDestId: $elm$core$Maybe$Nothing,
	selectedSuiteId: '',
	showAutocomplete: false,
	submittingBooking: false,
	submittingTripInquiry: false,
	toast: $elm$core$Maybe$Nothing
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$HideToast = {$: 'HideToast'};
var $author$project$Main$NextHeroSlide = {$: 'NextHeroSlide'};
var $author$project$Main$SetNavElevated = function (a) {
	return {$: 'SetNavElevated', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Main$navScroll = _Platform_incomingPort('navScroll', $elm$json$Json$Decode$bool);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2(
				$elm$time$Time$every,
				6000,
				function (_v0) {
					return $author$project$Main$NextHeroSlide;
				}),
				A2(
				$elm$time$Time$every,
				3000,
				function (_v1) {
					return $author$project$Main$HideToast;
				}),
				$author$project$Main$navScroll($author$project$Main$SetNavElevated)
			]));
};
var $author$project$Main$CompleteBooking = F2(
	function (a, b) {
		return {$: 'CompleteBooking', a: a, b: b};
	});
var $author$project$Main$CompleteTripInquiry = function (a) {
	return {$: 'CompleteTripInquiry', a: a};
};
var $author$project$Main$OpenModal = function (a) {
	return {$: 'OpenModal', a: a};
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Data$destinations = _List_fromArray(
	[
		{
		climate: {
			best: _List_fromArray(
				[4, 5, 8, 9]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[0.6, 0.6, 0.7, 0.85, 1.1, 1.4, 1.8, 1.8, 1.3, 0.95, 0.7, 0.6]),
			temps: _List_fromArray(
				[55, 56, 59, 65, 74, 82, 87, 87, 81, 73, 65, 58])
		},
		country: 'Greece',
		description: 'Perched on volcanic cliffs above the azure Aegean, Santorini delivers the iconic Greek island experience  -  whitewashed villages, blood-orange sunsets over the caldera, and wine tasting in cellar caves hewn from volcanic rock. Our curated 7-night experience stays above the fray, in private suite hotels accessible only on foot.',
		duration: '7 nights',
		flights: 'From JFK  -  ~10h with one stop',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Private caldera sunset cruise', 'Wine tasting in Oia\'s cave cellars', 'Black sand beach at Perissa', 'Ancient ruins at Akrotiri']),
		id: 'santorini',
		image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['5-star boutique hotel', 'Daily breakfast', 'Airport transfers', 'Sunset cruise', 'Guided wine tour']),
		moods: _List_fromArray(
			['romance', 'escape']),
		name: 'Santorini',
		price: 2890,
		rating: 4.9,
		region: 'Europe',
		reviewCount: 847,
		shortDesc: 'Volcanic cliffs, whitewashed villages & legendary Aegean sunsets.',
		suites: _List_fromArray(
			[
				{description: 'Traditional whitewashed cliffside cave suite featuring a private balcony and views of the Aegean Sea.', id: 'santorini-cave', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80', name: 'Junior Cave Suite', priceModifier: 0},
				{description: 'Elevated sanctuary offering dramatic unobstructed views of the volcano, complete with a private heated plunge pool.', id: 'santorini-caldera', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=80', name: 'Caldera View Sanctuary', priceModifier: 450},
				{description: 'Ultra-private residence with a expansive infinity pool, outdoor lounge, and personalized 24/7 butler service.', id: 'santorini-grand', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80', name: 'Grand Infinity Oasis', priceModifier: 1200}
			]),
		tags: _List_fromArray(
			['Island', 'Luxury', 'Sunset']),
		visa: 'Schengen Visa or Visa-free (90 days)'
	},
		{
		climate: {
			best: _List_fromArray(
				[5, 6, 7, 8]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[1.0, 1.0, 1.0, 0.9, 0.8, 0.9, 1.1, 1.2, 1.0, 0.9, 1.0, 1.2]),
			temps: _List_fromArray(
				[80, 80, 81, 82, 82, 80, 79, 79, 80, 82, 82, 80])
		},
		country: 'Indonesia',
		description: 'Between rice terraces and jungle-wrapped temples, Bali moves at its own sacred rhythm. Come for the surf at Seminyak, stay for the silence of Ubud\'s morning mist over emerald paddies. Our private villa experience keeps you immersed in the island\'s soul, not its tourist infrastructure.',
		duration: '10 nights',
		flights: 'From LAX  -  ~17h with one stop',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Sunrise hike up Mount Batur', 'Ubud cooking class & rice terrace walk', 'Surf lesson at Seminyak', 'Traditional Balinese spa retreat']),
		id: 'bali',
		image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Private villa with pool', 'Daily breakfast', 'Airport transfers', 'Cooking class', 'Spa session']),
		moods: _List_fromArray(
			['escape', 'culture', 'reset']),
		name: 'Bali',
		price: 1890,
		rating: 4.8,
		region: 'Asia',
		reviewCount: 1203,
		shortDesc: 'Sacred temples, jungle rice terraces & world-class surf.',
		suites: _List_fromArray(
			[
				{description: 'Lush tropical sanctuary with private courtyard, outdoor shower, and a personal plunge pool.', id: 'bali-garden', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80', name: 'Garden Pool Villa', priceModifier: 0},
				{description: 'Perched amongst Ubud\'s jungle canopy, offering dramatic valley views and open-air luxury living.', id: 'bali-canopy', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80', name: 'Ubud Canopy Treehouse', priceModifier: 250},
				{description: 'Stately villa situated directly on the sacred Ayung River, with private pavilion, butler service, and private spa area.', id: 'bali-palace', image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=900&q=80', name: 'Sacred Riverfront Palace', priceModifier: 750}
			]),
		tags: _List_fromArray(
			['Jungle', 'Temples', 'Wellness']),
		visa: 'Visa on Arrival (30 days, free)'
	},
		{
		climate: {
			best: _List_fromArray(
				[0, 1, 2, 11]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[1.3, 1.5, 1.4, 1.2, 0.8, 0.7, 0.7, 0.7, 0.8, 0.9, 1.1, 1.3]),
			temps: _List_fromArray(
				[82, 83, 84, 84, 83, 81, 80, 80, 81, 82, 82, 82])
		},
		country: 'Maldives',
		description: 'The Maldives is not a destination  -  it\'s a state of mind. Overwater bungalows on stilts above electric-blue lagoons, coral reefs teeming with mantas and reef sharks, and the kind of silence you forgot existed. Our resorts are chosen for isolation, not Instagram. You\'ll understand the difference.',
		duration: '7 nights',
		flights: 'From NYC  -  ~20h with one stop',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1540202404-d0c7fe46a1cd?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1568171025673-b25cf3c84b7c?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Private overwater villa with glass floor', 'Sunrise manta ray snorkeling', 'Underwater restaurant dining', 'Sandbank picnic at sunset']),
		id: 'maldives',
		image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Overwater villa', 'All-inclusive meals', 'Seaplane transfer', 'Snorkeling gear', 'Sunset cruise']),
		moods: _List_fromArray(
			['escape', 'romance']),
		name: 'Maldives',
		price: 4990,
		rating: 4.95,
		region: 'Indian Ocean',
		reviewCount: 412,
		shortDesc: 'Overwater bungalows, electric lagoons & pristine coral reefs.',
		suites: _List_fromArray(
			[
				{description: 'Secluded villa steps away from the powder-white sand, surrounded by dense tropical foliage.', id: 'maldives-beach', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80', name: 'Beachfront Retreat', priceModifier: 0},
				{description: 'Stunning villa on stilts over the turquoise lagoon with private pool, hammock over the water, and direct lagoon access.', id: 'maldives-lagoon', image: 'https://images.unsplash.com/photo-1540202404-d0c7fe46a1cd?auto=format&fit=crop&w=900&q=80', name: 'Sunset Overwater Villa', priceModifier: 600},
				{description: 'A standalone multi-room luxury compound with dedicated chef, private jetty, and complete isolation.', id: 'maldives-residence', image: 'https://images.unsplash.com/photo-1568171025673-b25cf3c84b7c?auto=format&fit=crop&w=900&q=80', name: 'Private Island Residence', priceModifier: 2500}
			]),
		tags: _List_fromArray(
			['Overwater', 'Luxury', 'Diving']),
		visa: 'Visa on Arrival (30 days, free)'
	},
		{
		climate: {
			best: _List_fromArray(
				[2, 3, 9, 10]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[0.7, 0.8, 1.4, 1.5, 0.9, 0.8, 0.9, 0.9, 1.0, 1.3, 1.1, 0.8]),
			temps: _List_fromArray(
				[41, 43, 50, 59, 67, 74, 82, 84, 75, 63, 53, 44])
		},
		country: 'Japan',
		description: 'Kyoto is Japan\'s soul  -  1,600 temples and shrines, geiko-haunted streets of Gion, bamboo groves whispering in Arashiyama. Walk in thousand-year-old footsteps while the tea ceremony slows time to its proper pace. We\'ll place you in a ryokan with a private onsen and a garden worth waking up for.',
		duration: '8 nights',
		flights: 'From NYC  -  ~14h to Tokyo, then shinkansen',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Fushimi Inari Shrine at dawn', 'Tea ceremony in a private tatami room', 'Arashiyama Bamboo Grove', 'Nishiki Market food tour']),
		id: 'kyoto',
		image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Boutique ryokan', 'Breakfast & dinner', 'Rail pass', 'Tea ceremony', 'Guided temple tour']),
		moods: _List_fromArray(
			['culture', 'reset']),
		name: 'Kyoto',
		price: 2390,
		rating: 4.9,
		region: 'Asia',
		reviewCount: 934,
		shortDesc: '1,600 temples, geisha districts & bamboo groves.',
		suites: _List_fromArray(
			[
				{description: 'Classic washitsu with fine tatami mats, custom screens, and view of a private rock garden.', id: 'kyoto-tatami', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80', name: 'Tatami Garden Room', priceModifier: 0},
				{description: 'Bespoke suite featuring a private outdoor hot spring bath (onsen) surrounded by whispering bamboo.', id: 'kyoto-onsen', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80', name: 'Bamboo Onsen Suite', priceModifier: 350},
				{description: 'Spacious multi-room heritage suite reflecting royal Japanese designs and featuring private tea house garden access.', id: 'kyoto-emperor', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80', name: 'Emperor\'s Heritage Sanctuary', priceModifier: 900}
			]),
		tags: _List_fromArray(
			['Temples', 'Zen', 'Sakura']),
		visa: 'Visa-free (90 days for most)'
	},
		{
		climate: {
			best: _List_fromArray(
				[4, 5, 8, 9]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[0.6, 0.6, 0.7, 0.9, 1.1, 1.4, 1.8, 1.8, 1.3, 0.9, 0.65, 0.6]),
			temps: _List_fromArray(
				[52, 53, 57, 63, 70, 78, 85, 85, 78, 68, 60, 54])
		},
		country: 'Italy',
		description: 'Cliffside villages spilling in pastels toward an impossibly blue Tyrrhenian sea. The Amalfi Coast is Italy at its most theatrical  -  lemon groves, fishing boats, cathedral bells, and limoncello at golden hour. We split your stay across Ravello and Positano: two faces of the same coastline, equally unforgettable.',
		duration: '8 nights',
		flights: 'From NYC  -  ~9h to Rome or Naples',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1555971975-36e08d2b8e40?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Private yacht charter along the coast', 'Cooking class with a Positano chef', 'Path of the Gods hiking trail', 'Day trip to Capri island']),
		id: 'amalfi',
		image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['4-star clifftop hotel', 'Daily breakfast', 'Private boat tour', 'Cooking class', 'Airport transfers']),
		moods: _List_fromArray(
			['romance', 'culture']),
		name: 'Amalfi Coast',
		price: 3290,
		rating: 4.8,
		region: 'Europe',
		reviewCount: 621,
		shortDesc: 'Pastels, cliffs & lemon groves above the Tyrrhenian Sea.',
		suites: _List_fromArray(
			[
				{description: 'Refined hillside suite with a lush private lemon garden and scenic vistas of the Amalfi coastline.', id: 'amalfi-garden', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80', name: 'Ravello Garden Terrace', priceModifier: 0},
				{description: 'Terraced harborfront suite positioned above Positano beach, offering sunset cocktails over active waves.', id: 'amalfi-harbor', image: 'https://images.unsplash.com/photo-1555971975-36e08d2b8e40?auto=format&fit=crop&w=900&q=80', name: 'Positano Harborfront Suite', priceModifier: 500},
				{description: 'Our most prestigious residence, featuring a cliffside infinity pool and unhindered 360-degree panoramas of the sea.', id: 'amalfi-panoramic', image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80', name: 'Villa d\'Este Panoramic Sanctuary', priceModifier: 1400}
			]),
		tags: _List_fromArray(
			['Cliffside', 'Gastronomy', 'Boats']),
		visa: 'Schengen Visa or Visa-free (90 days)'
	},
		{
		climate: {
			best: _List_fromArray(
				[2, 3, 9, 10]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[0.7, 0.7, 0.85, 1.0, 1.1, 1.2, 1.0, 0.9, 1.0, 1.1, 0.8, 0.75]),
			temps: _List_fromArray(
				[52, 55, 62, 68, 75, 85, 97, 97, 88, 75, 62, 54])
		},
		country: 'Morocco',
		description: 'Marrakech assaults the senses in the best possible way. The ancient medina is a labyrinth of spice souks, rooftop hammams, and hidden riads with mosaic courtyards where time slows to the call to prayer. Our Sahara extension takes you to the dunes at Merzouga for a night under stars with no light pollution.',
		duration: '6 nights',
		flights: 'From NYC  -  ~10h with one stop',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Camel trek at Sahara sunrise', 'Hammam & traditional massage', 'Djemaa el-Fna evening', 'Day trip to Atlas Mountains']),
		id: 'marrakech',
		image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Luxury riad', 'Daily breakfast', 'Desert tour', 'Hammam session', 'Airport transfers']),
		moods: _List_fromArray(
			['culture', 'adventure']),
		name: 'Marrakech',
		price: 1690,
		rating: 4.7,
		region: 'Africa',
		reviewCount: 783,
		shortDesc: 'Spice souks, desert dunes & ornate palace riads.',
		suites: _List_fromArray(
			[
				{description: 'Intimate ground-level riad room featuring ornate hand-carved arches and access to the central pool patio.', id: 'marrakech-riad', image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=900&q=80', name: 'Medina Courtyard Riad', priceModifier: 0},
				{description: 'Spacious second-floor suite with a private rooftop terrace and panoramic views of the Atlas Mountains.', id: 'marrakech-atlas', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80', name: 'Atlas View Terrace Suite', priceModifier: 200},
				{description: 'Opulent penthouse suite adorned in zellige tilework, featuring an open fireplace and private hammam chamber.', id: 'marrakech-royal', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=80', name: 'Sahara Royal Pavilion', priceModifier: 650}
			]),
		tags: _List_fromArray(
			['Medina', 'Desert', 'Riads']),
		visa: 'Visa-free (90 days for most)'
	},
		{
		climate: {
			best: _List_fromArray(
				[0, 1, 2, 11]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[0.8, 0.8, 0.9, 0.9, 1.0, 1.3, 1.5, 1.5, 1.1, 0.9, 0.8, 0.9]),
			temps: _List_fromArray(
				[31, 32, 35, 40, 48, 55, 60, 59, 52, 42, 35, 31])
		},
		country: 'Iceland',
		description: 'Iceland is a planet within a planet  -  where volcanoes breathe beneath glaciers, geysers erupt from moss-covered lava fields, and the Northern Lights dance across skies that forget to get dark in summer. Our winter expedition maximizes aurora chances with dedicated expert guides and private viewing spots.',
		duration: '8 nights',
		flights: 'From NYC  -  ~6h direct (Icelandair)',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1531168418791-27f0beb42e96?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Northern Lights snowmobile expedition', 'Glacier hiking on Vatnajökull', 'Blue Lagoon geothermal soak', 'Golden Circle private day tour']),
		id: 'iceland',
		image: 'https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Boutique hotel, Reykjavik', 'Daily breakfast', 'Aurora tour', 'Glacier hike', 'Blue Lagoon access']),
		moods: _List_fromArray(
			['adventure', 'escape']),
		name: 'Iceland',
		price: 3490,
		rating: 4.85,
		region: 'Europe',
		reviewCount: 567,
		shortDesc: 'Volcanoes, glaciers, geysers & the aurora borealis.',
		suites: _List_fromArray(
			[
				{description: 'Heated geodetic glass dome enabling clear views of the aurora borealis directly from your bed.', id: 'iceland-dome', image: 'https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?auto=format&fit=crop&w=900&q=80', name: 'Aurora Glass Dome', priceModifier: 0},
				{description: 'Rustic yet luxurious log lodge built on a volcanic ridge, featuring a outdoor geothermal hot tub.', id: 'iceland-lodge', image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=900&q=80', name: 'Volcanic Crater Lodge', priceModifier: 300},
				{description: 'Ultra-premium minimalist sanctuary overlooking Jökulsárlón glacier lagoon with private viewing deck.', id: 'iceland-platinum', image: 'https://images.unsplash.com/photo-1531168418791-27f0beb42e96?auto=format&fit=crop&w=900&q=80', name: 'Glacier Lagoon Platinum Suite', priceModifier: 850}
			]),
		tags: _List_fromArray(
			['Aurora', 'Glaciers', 'Geothermal']),
		visa: 'Schengen Visa or Visa-free (90 days)'
	},
		{
		climate: {
			best: _List_fromArray(
				[0, 1, 10, 11]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[1.4, 1.4, 1.2, 0.8, 0.6, 0.6, 0.6, 0.7, 0.9, 1.1, 1.3, 1.4]),
			temps: _List_fromArray(
				[60, 59, 55, 48, 41, 37, 35, 37, 41, 48, 54, 58])
		},
		country: 'Chile / Argentina',
		description: 'At the bottom of the world, Patagonia\'s spires pierce clouds in a landscape so raw it feels pre-human. Trek beside the jagged towers of Torres del Paine, kayak past calving glaciers, and sleep under skies with no light pollution. Our eco-lodge route puts you inside the landscape, not outside it.',
		duration: '10 nights',
		flights: 'From NYC  -  ~13h to Santiago',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1548867530-6073a4fef69c?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['W Trek through Torres del Paine', 'Perito Moreno Glacier ice walk', 'Kayaking on Lago Grey', 'Condor watching at dusk']),
		id: 'patagonia',
		image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Eco-lodge accommodation', 'All meals on trail', 'Expert guide', 'National park fees', 'Internal flights']),
		moods: _List_fromArray(
			['adventure', 'escape']),
		name: 'Patagonia',
		price: 4290,
		rating: 4.9,
		region: 'South America',
		reviewCount: 289,
		shortDesc: 'Jagged peaks, calving glaciers & true wilderness trekking.',
		suites: _List_fromArray(
			[
				{description: 'Geometric eco-dome located in primary native forests, featuring a wood-burning fireplace and skylight.', id: 'patagonia-dome', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80', name: 'Forest Eco-Dome', priceModifier: 0},
				{description: 'Luxury timber lodge built directly facing the legendary stone spires of Torres del Paine.', id: 'patagonia-lodge', image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=900&q=80', name: 'Torres View Lodge', priceModifier: 350},
				{description: 'Waterfront cabin located on isolated fjords with a private hot pool, panoramic windows, and personal Zodiac.', id: 'patagonia-signature', image: 'https://images.unsplash.com/photo-1548867530-6073a4fef69c?auto=format&fit=crop&w=900&q=80', name: 'Fjords Signature Sanctuary', priceModifier: 1000}
			]),
		tags: _List_fromArray(
			['Trekking', 'Glaciers', 'Wild']),
		visa: 'Visa-free (90 days for most)'
	},
		{
		climate: {
			best: _List_fromArray(
				[0, 1, 2, 6, 7]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[1.5, 1.5, 1.2, 0.7, 0.7, 0.9, 1.1, 1.1, 0.8, 0.7, 0.8, 1.4]),
			temps: _List_fromArray(
				[23, 25, 33, 41, 50, 58, 64, 63, 55, 44, 33, 25])
		},
		country: 'Switzerland',
		description: 'The Swiss Alps are engineering and nature in perfect tension  -  precision rail lines threading through valleys where avalanche-fed torrents run beside centuries-old chalets. Ski Zermatt\'s 360km of pistes in the shadow of the Matterhorn, then soak in your chalet\'s private hot tub as the stars arrive.',
		duration: '7 nights',
		flights: 'From NYC  -  ~9h to Zurich',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Skiing under the Matterhorn in Zermatt', 'Glacier Express scenic train', 'Jungfraujoch  -  Top of Europe at 3,454m', 'Fondue dinner in a traditional chalet']),
		id: 'swiss-alps',
		image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['4-star chalet hotel', 'Half-board (breakfast & dinner)', 'Ski pass (5 days)', 'Rail passes', 'Transfers']),
		moods: _List_fromArray(
			['adventure', 'romance']),
		name: 'Swiss Alps',
		price: 3890,
		rating: 4.85,
		region: 'Europe',
		reviewCount: 445,
		shortDesc: 'Ski the Matterhorn\'s shadow across 360km of pistes.',
		suites: _List_fromArray(
			[
				{description: 'Comfortable alpine chalet crafted from local spruce, featuring stone hearths and valley views.', id: 'swiss-chalet', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80', name: 'Alpine Valley Chalet', priceModifier: 0},
				{description: 'Elegant mountain loft constructed with high-beamed ceilings, offering direct peaks views of the Matterhorn.', id: 'swiss-lodge', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=80', name: 'Matterhorn Peak Lodge', priceModifier: 555},
				{description: 'Prestigious bi-level alpine penthouse suite featuring private wellness cedar saunas, massage chambers, and a ski-in portal.', id: 'swiss-penthouse', image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=80', name: 'Eiger Royal Penthouse', priceModifier: 1500}
			]),
		tags: _List_fromArray(
			['Skiing', 'Alpine', 'Luxury']),
		visa: 'Schengen Visa or Visa-free (90 days)'
	},
		{
		climate: {
			best: _List_fromArray(
				[2, 3, 9, 10]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[0.8, 0.8, 1.4, 1.4, 0.9, 0.8, 0.9, 1.0, 1.0, 1.3, 1.0, 0.9]),
			temps: _List_fromArray(
				[41, 43, 49, 59, 67, 74, 81, 84, 77, 66, 55, 45])
		},
		country: 'Japan',
		description: 'Tokyo exists in several centuries simultaneously. Ancient shrines sit beneath skyscraper forests; ramen bars operate in basements of buildings taller than anything in Europe. It\'s the future and the past compressed into the world\'s most efficient megacity  -  and we know which corners to show you.',
		duration: '9 nights',
		flights: 'From NYC  -  ~14h direct',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Tsukiji outer market breakfast', 'Shibuya Crossing & Harajuku street fashion', 'Day trip to Nikko temples', 'Omakase sushi at a Michelin-starred counter']),
		id: 'tokyo',
		image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Design hotel in Shinjuku', 'Daily breakfast', 'JR Rail Pass', 'Sushi experience', 'Airport transfer']),
		moods: _List_fromArray(
			['culture', 'adventure']),
		name: 'Tokyo',
		price: 2690,
		rating: 4.9,
		region: 'Asia',
		reviewCount: 1089,
		shortDesc: 'Ancient shrines, neon streets & the world\'s greatest food city.',
		suites: _List_fromArray(
			[
				{description: 'Sleek metropolitan room featuring tall glass windows offering direct views of Shinjuku\'s neon skyline.', id: 'tokyo-skyline', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80', name: 'Shinjuku Skyline Room', priceModifier: 0},
				{description: 'Elevated traditional-meets-modern suite with an outdoor rock garden terrace and custom hinoki cypress bath.', id: 'tokyo-zen', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80', name: 'Zen Garden Terrace Suite', priceModifier: 300},
				{description: 'Sprawling top-floor luxury penthouse looking down upon the Imperial Gardens, with a private dining room.', id: 'tokyo-imperial', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=900&q=80', name: 'Imperial Palace Penthouse', priceModifier: 1100}
			]),
		tags: _List_fromArray(
			['Neon', 'Food', 'Culture']),
		visa: 'Visa-free (90 days for most)'
	},
		{
		climate: {
			best: _List_fromArray(
				[4, 5, 8, 9]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.2, 1.1, 1.1, 0.9, 1.2]),
			temps: _List_fromArray(
				[35, 37, 45, 55, 65, 74, 80, 78, 71, 60, 49, 39])
		},
		country: 'USA',
		description: 'New York doesn\'t care if you\'ve seen it before  -  it\'ll show you something new. The Met, MOMA, Broadway, the High Line in spring, the West Village at 2am. No city wastes less of your time. We get you past the tourist layer and into the city that New Yorkers actually live in.',
		duration: '5 nights',
		flights: 'Domestic flights from most US cities',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Metropolitan Museum private tour', 'Broadway show with backstage access', 'Brooklyn Bridge & DUMBO', 'Tasting menu at a James Beard restaurant']),
		id: 'new-york',
		image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Boutique hotel in West Village', 'Daily breakfast', 'Museum passes', 'Broadway tickets', 'Transfers']),
		moods: _List_fromArray(
			['culture']),
		name: 'New York',
		price: 1990,
		rating: 4.7,
		region: 'North America',
		reviewCount: 1456,
		shortDesc: 'The city that never sleeps  -  art, food, skyline, energy.',
		suites: _List_fromArray(
			[
				{description: 'Elegantly appointed bohemian loft with exposed brick walls, fireplace, and overlooks of leafy streets.', id: 'ny-atelier', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=80', name: 'West Village Atelier', priceModifier: 0},
				{description: 'Midtown suite with private outdoor brick terrace and skyline vistas towards the Empire State Building.', id: 'ny-terrace', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=900&q=80', name: 'Manhattan View Terrace Suite', priceModifier: 400},
				{description: 'Prestigious luxury residence situated high above Fifth Avenue, featuring double-height salons and private terrace gardens.', id: 'ny-fifth', image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=900&q=80', name: 'Fifth Avenue Penthouse', priceModifier: 1300}
			]),
		tags: _List_fromArray(
			['Skyline', 'Art', 'Iconic']),
		visa: 'ESTA for most nationalities'
	},
		{
		climate: {
			best: _List_fromArray(
				[0, 1, 6, 7]),
			labels: _List_fromArray(
				['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
			price: _List_fromArray(
				[1.2, 1.4, 0.9, 0.7, 0.7, 1.0, 1.3, 1.4, 1.2, 1.0, 0.8, 1.1]),
			temps: _List_fromArray(
				[77, 78, 79, 79, 76, 72, 71, 73, 76, 78, 78, 77])
		},
		country: 'Tanzania',
		description: 'The Great Migration  -  1.5 million wildebeest crossing the Mara River under threat from Nile crocodiles  -  is the greatest wildlife spectacle on earth. A Serengeti safari isn\'t just travel. It\'s a reckoning with the wild world. We place our guests in the migration corridor before the crowds arrive.',
		duration: '10 nights',
		flights: 'From NYC  -  ~18h to Kilimanjaro airport',
		gallery: _List_fromArray(
			['https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=900&q=80']),
		heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
		highlights: _List_fromArray(
			['Great Migration river crossing', 'Hot air balloon over the Serengeti at dawn', 'Night game drive with specialist guide', 'Maasai village cultural visit']),
		id: 'serengeti',
		image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
		included: _List_fromArray(
			['Luxury tented camp (full board)', 'All game drives', 'Bush walks', 'Hot air balloon', 'Park fees & guide']),
		moods: _List_fromArray(
			['adventure', 'escape']),
		name: 'Serengeti',
		price: 5890,
		rating: 4.95,
		region: 'Africa',
		reviewCount: 198,
		shortDesc: 'The Great Migration, Big Five & luxury tented camps at dawn.',
		suites: _List_fromArray(
			[
				{description: 'Spacious luxury tented villa elevated on timber decks, with mesh screens to hear the African night.', id: 'serengeti-classic', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80', name: 'Classic Tented Pavilion', priceModifier: 0},
				{description: 'Stilted luxury suite positioned overlooking a major bend of the Mara River, optimal for wildlife viewing.', id: 'serengeti-canopy', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=80', name: 'Mara River View Canopy Suite', priceModifier: 600},
				{description: 'Exclusive multi-tented private campsite sanctuary featuring a private plunge pool, firepit, and dedicated safari truck.', id: 'serengeti-royal', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=900&q=80', name: 'Royal Cheetah Sanctuary', priceModifier: 1500}
			]),
		tags: _List_fromArray(
			['Big Five', 'Migration', 'Luxury Camp']),
		visa: 'Visa on Arrival ($50 USD)'
	}
	]);
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Data$heroSlides = _List_fromArray(
	[
		{image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80', label: 'Indian Ocean'},
		{image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1920&q=80', label: 'Machu Picchu, Peru'},
		{image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80', label: 'Serengeti, Tanzania'},
		{image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80', label: 'South Pacific'},
		{image: 'https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?auto=format&fit=crop&w=1920&q=80', label: 'Iceland, Northern Europe'}
	]);
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$not = _Basics_not;
var $elm$core$Process$sleep = _Process_sleep;
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$Main$TriggerToast = function (a) {
	return {$: 'TriggerToast', a: a};
};
var $author$project$Main$triggerToastCmd = function (msgStr) {
	return A2(
		$elm$core$Task$perform,
		function (_v0) {
			return $author$project$Main$TriggerToast(msgStr);
		},
		$elm$core$Task$succeed(_Utils_Tuple0));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 'NextHeroSlide':
					var nextIndex = A2(
						$elm$core$Basics$modBy,
						$elm$core$List$length($author$project$Data$heroSlides),
						model.heroIndex + 1);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{heroIndex: nextIndex}),
						$elm$core$Platform$Cmd$none);
				case 'SetHeroSlide':
					var idx = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{heroIndex: idx}),
						$elm$core$Platform$Cmd$none);
				case 'ChangeMood':
					var mood = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{activeMood: mood}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateSearch':
					var query = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								searchQuery: query,
								showAutocomplete: $elm$core$String$length(query) > 0
							}),
						$elm$core$Platform$Cmd$none);
				case 'HideAutocomplete':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{showAutocomplete: false}),
						$elm$core$Platform$Cmd$none);
				case 'SelectAutocomplete':
					var destId = msg.a;
					var newModel = _Utils_update(
						model,
						{searchQuery: '', showAutocomplete: false});
					var $temp$msg = $author$project$Main$OpenModal(destId),
						$temp$model = newModel;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 'TriggerSearch':
					var query = $elm$core$String$toLower(model.searchQuery);
					var maybeDest = $elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (d) {
								return A2(
									$elm$core$String$contains,
									query,
									$elm$core$String$toLower(d.name)) || A2(
									$elm$core$String$contains,
									query,
									$elm$core$String$toLower(d.country));
							},
							$author$project$Data$destinations));
					if (maybeDest.$ === 'Just') {
						var dest = maybeDest.a;
						var $temp$msg = $author$project$Main$OpenModal(dest.id),
							$temp$model = _Utils_update(
							model,
							{searchQuery: '', showAutocomplete: false});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{searchQuery: '', showAutocomplete: false}),
							$author$project$Main$triggerToastCmd('No exact matching destination found. Showing all.'));
					}
				case 'OpenModal':
					var destId = msg.a;
					var dest = $elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (d) {
								return _Utils_eq(d.id, destId);
							},
							$author$project$Data$destinations));
					var firstSuiteId = A2(
						$elm$core$Maybe$withDefault,
						'',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.id;
							},
							A2(
								$elm$core$Maybe$andThen,
								function (d) {
									return $elm$core$List$head(d.suites);
								},
								dest)));
					var defaultImg = A2(
						$elm$core$Maybe$map,
						function (d) {
							return A2(
								$elm$core$Maybe$withDefault,
								d.image,
								$elm$core$List$head(d.gallery));
						},
						dest);
					var currentForm = model.bookingForm;
					var updatedForm = _Utils_update(
						currentForm,
						{checkin: model.bookingBarForm.checkin, checkout: model.bookingBarForm.checkout});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								activeModalTabImage: defaultImg,
								addOnHelicopter: false,
								addOnSommelier: false,
								addOnYacht: false,
								bookingForm: updatedForm,
								bookingStep: 1,
								mobileNavOpen: false,
								selectedDetailDestId: $elm$core$Maybe$Just(destId),
								selectedSuiteId: firstSuiteId
							}),
						$elm$core$Platform$Cmd$none);
				case 'CloseModal':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{activeModalTabImage: $elm$core$Maybe$Nothing, addOnHelicopter: false, addOnSommelier: false, addOnYacht: false, bookingStep: 1, selectedDetailDestId: $elm$core$Maybe$Nothing, selectedSuiteId: '', submittingBooking: false}),
						$elm$core$Platform$Cmd$none);
				case 'SetModalMainImage':
					var img = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								activeModalTabImage: $elm$core$Maybe$Just(img)
							}),
						$elm$core$Platform$Cmd$none);
				case 'AddToTrip':
					var destId = msg.a;
					if (A2($elm$core$List$member, destId, model.itinerary)) {
						return _Utils_Tuple2(
							model,
							$author$project$Main$triggerToastCmd('Already in your itinerary!'));
					} else {
						var updatedItinerary = _Utils_ap(
							model.itinerary,
							_List_fromArray(
								[destId]));
						var destName = A2(
							$elm$core$Maybe$withDefault,
							'Destination',
							A2(
								$elm$core$Maybe$map,
								function ($) {
									return $.name;
								},
								$elm$core$List$head(
									A2(
										$elm$core$List$filter,
										function (d) {
											return _Utils_eq(d.id, destId);
										},
										$author$project$Data$destinations))));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{isTripPanelOpen: true, itinerary: updatedItinerary}),
							$author$project$Main$triggerToastCmd(destName + ' added to your trip ✦'));
					}
				case 'RemoveFromTrip':
					var destId = msg.a;
					var updatedItinerary = A2(
						$elm$core$List$filter,
						function (id) {
							return !_Utils_eq(id, destId);
						},
						model.itinerary);
					var panelState = $elm$core$List$isEmpty(updatedItinerary) ? false : model.isTripPanelOpen;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isTripPanelOpen: panelState, itinerary: updatedItinerary}),
						$elm$core$Platform$Cmd$none);
				case 'ClearTrip':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{isTripPanelOpen: false, itinerary: _List_Nil}),
						$author$project$Main$triggerToastCmd('Itinerary cleared'));
				case 'ToggleTripPanel':
					return $elm$core$List$isEmpty(model.itinerary) ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{isTripPanelOpen: !model.isTripPanelOpen}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingFormName':
					var name = msg.a;
					var form = model.bookingForm;
					var updated = _Utils_update(
						form,
						{name: name});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingFormEmail':
					var email = msg.a;
					var form = model.bookingForm;
					var updated = _Utils_update(
						form,
						{email: email});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingFormCheckin':
					var date = msg.a;
					var form = model.bookingForm;
					var updated = _Utils_update(
						form,
						{checkin: date});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingFormCheckout':
					var date = msg.a;
					var form = model.bookingForm;
					var updated = _Utils_update(
						form,
						{checkout: date});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingFormTravelers':
					var count = msg.a;
					var form = model.bookingForm;
					var updated = _Utils_update(
						form,
						{travelers: count});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingFormBudget':
					var budget = msg.a;
					var form = model.bookingForm;
					var updated = _Utils_update(
						form,
						{budget: budget});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingFormNotes':
					var notes = msg.a;
					var form = model.bookingForm;
					var updated = _Utils_update(
						form,
						{notes: notes});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'SubmitBookingForm':
					var destId = msg.a;
					return ($elm$core$String$isEmpty(model.bookingForm.name) || $elm$core$String$isEmpty(model.bookingForm.email)) ? _Utils_Tuple2(
						model,
						$author$project$Main$triggerToastCmd('Please fill in your name and email.')) : ((_Utils_cmp(model.bookingForm.checkin, model.bookingForm.checkout) > -1) ? _Utils_Tuple2(
						model,
						$author$project$Main$triggerToastCmd('Departure date must be after arrival date.')) : _Utils_Tuple2(
						_Utils_update(
							model,
							{submittingBooking: true}),
						A2(
							$elm$core$Task$perform,
							function (_v2) {
								return A2($author$project$Main$CompleteBooking, destId, model.bookingForm.name);
							},
							$elm$core$Process$sleep(1500))));
				case 'CompleteBooking':
					var destId = msg.a;
					var name = msg.b;
					var refNum = (destId === 'itinerary') ? ('VYG-T' + A3(
						$elm$core$String$slice,
						0,
						5,
						$elm$core$String$toUpper(name))) : ('VYG-B' + A3(
						$elm$core$String$slice,
						0,
						5,
						$elm$core$String$toUpper(name)));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								inquirySubmittedRef: $elm$core$Maybe$Just(refNum),
								isTripPanelOpen: (destId === 'itinerary') ? false : model.isTripPanelOpen,
								itinerary: (destId === 'itinerary') ? _List_Nil : model.itinerary,
								selectedDetailDestId: $elm$core$Maybe$Nothing,
								submittingBooking: false
							}),
						$elm$core$Platform$Cmd$none);
				case 'CloseConfirmModal':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{inquirySubmittedRef: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingBarDestination':
					var destId = msg.a;
					var bar = model.bookingBarForm;
					var updated = _Utils_update(
						bar,
						{destinationId: destId});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingBarForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingBarCheckin':
					var date = msg.a;
					var bar = model.bookingBarForm;
					var updated = _Utils_update(
						bar,
						{checkin: date});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingBarForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingBarCheckout':
					var date = msg.a;
					var bar = model.bookingBarForm;
					var updated = _Utils_update(
						bar,
						{checkout: date});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingBarForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingBarGuests':
					var count = msg.a;
					var bar = model.bookingBarForm;
					var updated = _Utils_update(
						bar,
						{guests: count});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingBarForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'UpdateBookingBarPromo':
					var code = msg.a;
					var bar = model.bookingBarForm;
					var updated = _Utils_update(
						bar,
						{promo: code});
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingBarForm: updated}),
						$elm$core$Platform$Cmd$none);
				case 'SubmitBookingBar':
					if ($elm$core$String$isEmpty(model.bookingBarForm.destinationId)) {
						return _Utils_Tuple2(
							model,
							$author$project$Main$triggerToastCmd('Please select a destination.'));
					} else {
						if (_Utils_cmp(model.bookingBarForm.checkin, model.bookingBarForm.checkout) > -1) {
							return _Utils_Tuple2(
								model,
								$author$project$Main$triggerToastCmd('Departure date must be after arrival date.'));
						} else {
							var $temp$msg = $author$project$Main$OpenModal(model.bookingBarForm.destinationId),
								$temp$model = model;
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						}
					}
				case 'UpdateNewsletterEmail':
					var email = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{newsletterEmail: email}),
						$elm$core$Platform$Cmd$none);
				case 'SubmitNewsletter':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{newsletterEmail: '', newsletterJoined: true}),
						$author$project$Main$triggerToastCmd('Welcome to Voyager access list.'));
				case 'ToggleMobileNav':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{mobileNavOpen: !model.mobileNavOpen}),
						$elm$core$Platform$Cmd$none);
				case 'SetNavElevated':
					var val = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{navElevated: val}),
						$elm$core$Platform$Cmd$none);
				case 'TriggerToast':
					var msgStr = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								toast: $elm$core$Maybe$Just(msgStr)
							}),
						$elm$core$Platform$Cmd$none);
				case 'HideToast':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{toast: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none);
				case 'SubmitTripInquiry':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{submittingTripInquiry: true}),
						A2(
							$elm$core$Task$perform,
							function (_v3) {
								return $author$project$Main$CompleteTripInquiry('Itinerary');
							},
							$elm$core$Process$sleep(1500)));
				case 'CompleteTripInquiry':
					var name = msg.a;
					var refNum = 'VYG-T' + A3(
						$elm$core$String$slice,
						0,
						5,
						$elm$core$String$toUpper(name));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								inquirySubmittedRef: $elm$core$Maybe$Just(refNum),
								isTripPanelOpen: false,
								itinerary: _List_Nil,
								submittingTripInquiry: false
							}),
						$elm$core$Platform$Cmd$none);
				case 'SelectSuite':
					var suiteId = msg.a;
					var dest = A2(
						$elm$core$Maybe$andThen,
						function (id) {
							return $elm$core$List$head(
								A2(
									$elm$core$List$filter,
									function (d) {
										return _Utils_eq(d.id, id);
									},
									$author$project$Data$destinations));
						},
						model.selectedDetailDestId);
					var suiteImage = A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.image;
						},
						A2(
							$elm$core$Maybe$andThen,
							function (d) {
								return $elm$core$List$head(
									A2(
										$elm$core$List$filter,
										function (s) {
											return _Utils_eq(s.id, suiteId);
										},
										d.suites));
							},
							dest));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								activeModalTabImage: function () {
									if (suiteImage.$ === 'Just') {
										var img = suiteImage.a;
										return $elm$core$Maybe$Just(img);
									} else {
										return model.activeModalTabImage;
									}
								}(),
								selectedSuiteId: suiteId
							}),
						$elm$core$Platform$Cmd$none);
				case 'ToggleAddOn':
					var addOnName = msg.a;
					switch (addOnName) {
						case 'helicopter':
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{addOnHelicopter: !model.addOnHelicopter}),
								$elm$core$Platform$Cmd$none);
						case 'yacht':
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{addOnYacht: !model.addOnYacht}),
								$elm$core$Platform$Cmd$none);
						case 'sommelier':
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{addOnSommelier: !model.addOnSommelier}),
								$elm$core$Platform$Cmd$none);
						default:
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				default:
					var step = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bookingStep: step}),
						$elm$core$Platform$Cmd$none);
			}
		}
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Main$SubmitBookingBar = {$: 'SubmitBookingBar'};
var $author$project$Main$UpdateBookingBarCheckin = function (a) {
	return {$: 'UpdateBookingBarCheckin', a: a};
};
var $author$project$Main$UpdateBookingBarCheckout = function (a) {
	return {$: 'UpdateBookingBarCheckout', a: a};
};
var $author$project$Main$UpdateBookingBarDestination = function (a) {
	return {$: 'UpdateBookingBarDestination', a: a};
};
var $author$project$Main$UpdateBookingBarGuests = function (a) {
	return {$: 'UpdateBookingBarGuests', a: a};
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $author$project$Main$ariaLabel = function (valueStr) {
	return A2($elm$html$Html$Attributes$attribute, 'aria-label', valueStr);
};
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$option = _VirtualDom_node('option');
var $author$project$Main$role = function (valueStr) {
	return A2($elm$html$Html$Attributes$attribute, 'role', valueStr);
};
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Main$renderBookingBar = function (model) {
	var destinationOptions = function (dest) {
		return A2(
			$elm$html$Html$option,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value(dest.id)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(dest.name + (', ' + dest.country))
				]));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('booking-bar'),
				$author$project$Main$role('search'),
				$author$project$Main$ariaLabel('Book your journey')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('booking-bar-inner')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bb-field')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bb-label')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Destination')
									])),
								A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bb-select'),
										$elm$html$Html$Attributes$id('bb-destination'),
										$elm$html$Html$Attributes$value(model.bookingBarForm.destinationId),
										$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingBarDestination)
									]),
								A2(
									$elm$core$List$cons,
									A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value('')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('All Destinations')
											])),
									A2($elm$core$List$map, destinationOptions, $author$project$Data$destinations)))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bb-field')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bb-label')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Check In / Check Out')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'flex'),
										A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
										A2($elm$html$Html$Attributes$style, 'gap', '8px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('date'),
												$elm$html$Html$Attributes$class('bb-input'),
												$elm$html$Html$Attributes$id('bb-checkin'),
												$elm$html$Html$Attributes$value(model.bookingBarForm.checkin),
												$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingBarCheckin)
											]),
										_List_Nil),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'color', 'var(--ink-muted)'),
												A2($elm$html$Html$Attributes$style, 'font-size', '0.75rem')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('-')
											])),
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('date'),
												$elm$html$Html$Attributes$class('bb-input'),
												$elm$html$Html$Attributes$id('bb-checkout'),
												$elm$html$Html$Attributes$value(model.bookingBarForm.checkout),
												$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingBarCheckout)
											]),
										_List_Nil)
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bb-field'),
								A2($elm$html$Html$Attributes$style, 'max-width', '150px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bb-label')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Guests')
									])),
								A2(
								$elm$html$Html$select,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bb-select'),
										$elm$html$Html$Attributes$id('bb-guests'),
										$elm$html$Html$Attributes$value(model.bookingBarForm.guests),
										$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingBarGuests)
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$option,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('1 Guest')
											])),
										A2(
										$elm$html$Html$option,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('2 Guests')
											])),
										A2(
										$elm$html$Html$option,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('3 Guests')
											])),
										A2(
										$elm$html$Html$option,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('4 Guests')
											])),
										A2(
										$elm$html$Html$option,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('5+ Guests')
											]))
									]))
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bb-cta'),
								$elm$html$Html$Attributes$id('bb-search-btn'),
								$elm$html$Html$Events$onClick($author$project$Main$SubmitBookingBar)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Check Availability'),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bb-cta-sub')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Best Rate Guarantee')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('bb-suites')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bb-suites-text')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Suites +'),
										A2($elm$html$Html$br, _List_Nil, _List_Nil),
										$elm$html$Html$text('Flight Packages')
									]))
							]))
					]))
			]));
};
var $author$project$Main$CloseConfirmModal = {$: 'CloseConfirmModal'};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Main$renderConfirmModal = function (model) {
	var _v0 = model.inquirySubmittedRef;
	if (_v0.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		var ref = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('confirm-modal'),
					$elm$html$Html$Attributes$class('open'),
					$author$project$Main$role('dialog')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal-backdrop open'),
							$elm$html$Html$Attributes$id('confirm-backdrop'),
							$elm$html$Html$Events$onClick($author$project$Main$CloseConfirmModal)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('confirm-panel modal-panel open')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('confirm-icon')
								]),
							_List_fromArray(
								[
									A3(
									$elm$html$Html$node,
									'svg',
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24')
										]),
									_List_fromArray(
										[
											A3(
											$elm$html$Html$node,
											'polyline',
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('confirm-checkmark'),
													A2($elm$html$Html$Attributes$attribute, 'points', '4,12 9,17 20,6')
												]),
											_List_Nil)
										]))
								])),
							A2(
							$elm$html$Html$h2,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('confirm-title')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Inquiry Received')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('confirm-text')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Your travel curator will review your request and respond within 24 hours with a personalised proposal tailored to you.')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('confirm-ref'),
									$elm$html$Html$Attributes$id('confirm-ref')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('REF - ' + ref)
								])),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('btn-secondary'),
									$elm$html$Html$Attributes$id('confirm-close'),
									$elm$html$Html$Events$onClick($author$project$Main$CloseConfirmModal)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Continue Browsing')
								]))
						]))
				]));
	}
};
var $author$project$Main$ChangeMood = function (a) {
	return {$: 'ChangeMood', a: a};
};
var $author$project$Main$AddToTrip = function (a) {
	return {$: 'AddToTrip', a: a};
};
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$article = _VirtualDom_node('article');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Main$renderDestCard = F2(
	function (model, dest) {
		var starCount = $elm$core$Basics$floor(dest.rating);
		var starStr = A2($elm$core$String$repeat, starCount, '★');
		var inItinerary = A2($elm$core$List$member, dest.id, model.itinerary);
		return A2(
			$elm$html$Html$article,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('dest-card'),
					A2($elm$html$Html$Attributes$attribute, 'role', 'listitem'),
					$elm$html$Html$Attributes$tabindex(0),
					$author$project$Main$ariaLabel(dest.name + (', ' + dest.country))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dest-card-img-wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-card-img'),
									$elm$html$Html$Attributes$src(dest.image),
									$elm$html$Html$Attributes$alt(dest.name + (', ' + dest.country))
								]),
							_List_Nil),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-card-overlay')
								]),
							_List_Nil),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									'dest-card-add-btn' + (inItinerary ? ' added' : '')),
									$elm$html$Html$Events$onClick(
									$author$project$Main$AddToTrip(dest.id)),
									$elm$html$Html$Attributes$title(
									inItinerary ? 'Added to trip' : 'Add to trip')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									inItinerary ? '~' : '+')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-card-info')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('dest-card-meta')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('dest-card-rating')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('dest-card-rating-star')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(starStr)
														])),
													A2(
													$elm$html$Html$span,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromFloat(dest.rating))
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('dest-card-price')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													'$' + $elm$core$String$fromInt(dest.price)),
													A2(
													$elm$html$Html$span,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text(' / person')
														]))
												]))
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dest-card-body')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-card-region')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(dest.region)
								])),
							A2(
							$elm$html$Html$h3,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-card-name')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(dest.name)
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-card-country')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(dest.country)
								])),
							A2(
							$elm$html$Html$button,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-card-view-btn'),
									$elm$html$Html$Events$onClick(
									$author$project$Main$OpenModal(dest.id))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Explore'),
									A3(
									$elm$html$Html$node,
									'svg',
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$attribute, 'width', '12'),
											A2($elm$html$Html$Attributes$attribute, 'height', '12'),
											A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24'),
											A2($elm$html$Html$Attributes$attribute, 'fill', 'none'),
											A2($elm$html$Html$Attributes$attribute, 'stroke', 'currentColor'),
											A2($elm$html$Html$Attributes$attribute, 'stroke-width', '2.5')
										]),
									_List_fromArray(
										[
											A3(
											$elm$html$Html$node,
											'line',
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$attribute, 'x1', '5'),
													A2($elm$html$Html$Attributes$attribute, 'y1', '12'),
													A2($elm$html$Html$Attributes$attribute, 'x2', '19'),
													A2($elm$html$Html$Attributes$attribute, 'y2', '12')
												]),
											_List_Nil),
											A3(
											$elm$html$Html$node,
											'polyline',
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$attribute, 'points', '12,5 19,12 12,19')
												]),
											_List_Nil)
										]))
								]))
						]))
				]));
	});
var $elm$html$Html$section = _VirtualDom_node('section');
var $author$project$Main$renderDiscover = function (model) {
	var moodPillButton = F2(
		function (mood, label) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						'mood-pill' + (_Utils_eq(model.activeMood, mood) ? ' active' : '')),
						$elm$html$Html$Events$onClick(
						$author$project$Main$ChangeMood(mood))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(label)
					]));
		});
	var filteredDests = (model.activeMood === 'all') ? $author$project$Data$destinations : A2(
		$elm$core$List$filter,
		function (d) {
			return A2($elm$core$List$member, model.activeMood, d.moods);
		},
		$author$project$Data$destinations);
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('discover'),
				$author$project$Main$ariaLabel('Discover destinations by mood')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('discover-header')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('label'),
												A2($elm$html$Html$Attributes$style, 'color', 'rgba(255,255,255,0.35)'),
												A2($elm$html$Html$Attributes$style, 'margin-bottom', '10px')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Explore the World')
											])),
										A2(
										$elm$html$Html$h2,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('heading-xl')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Our Destinations')
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mood-pills stagger-children visible'),
								$elm$html$Html$Attributes$id('mood-pills'),
								$author$project$Main$role('toolbar'),
								$author$project$Main$ariaLabel('Filter by mood')
							]),
						_List_fromArray(
							[
								A2(moodPillButton, 'all', 'All'),
								A2(moodPillButton, 'escape', 'Escape'),
								A2(moodPillButton, 'adventure', 'Adventure'),
								A2(moodPillButton, 'romance', 'Romance'),
								A2(moodPillButton, 'culture', 'Culture'),
								A2(moodPillButton, 'reset', 'Reset')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('destination-grid'),
								$elm$html$Html$Attributes$id('destination-grid'),
								$author$project$Main$role('list'),
								$author$project$Main$ariaLabel('Destinations')
							]),
						A2(
							$elm$core$List$map,
							$author$project$Main$renderDestCard(model),
							filteredDests))
					]))
			]));
};
var $author$project$Main$renderExperiences = function (model) {
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('experiences'),
				$author$project$Main$ariaLabel('Curated experiences')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'padding', 'var(--gap) 0'),
						A2($elm$html$Html$Attributes$style, 'background', 'var(--white)')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('label reveal visible'),
										A2($elm$html$Html$Attributes$style, 'margin-bottom', '10px')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Excellence Experiences')
									])),
								A2(
								$elm$html$Html$h2,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('heading-xl heading-dark reveal visible'),
										A2($elm$html$Html$Attributes$style, 'color', 'var(--gold)')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Voyager for'),
										A2($elm$html$Html$br, _List_Nil, _List_Nil),
										$elm$html$Html$text('Adults Only')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('exp-grid container'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '44px')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('exp-main reveal-left visible')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('exp-main-img'),
												$elm$html$Html$Attributes$src('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85'),
												$elm$html$Html$Attributes$alt('Bali luxury villa with rice terraces')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('exp-main-label')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Bali, Indonesia')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('exp-sidebar stagger-children visible')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('exp-card')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-num')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('I')
													])),
												A2(
												$elm$html$Html$h3,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-title')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Swim-Up Suites')
													])),
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-text')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Step from your private suite directly into turquoise water. No crowds, no compromise - just uninterrupted luxury at the water\'s edge.')
													]))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('exp-card')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-num')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('II')
													])),
												A2(
												$elm$html$Html$h3,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-title')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Rooftop Terrace Dining')
													])),
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-text')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('From sunset cocktails to multi-course tasting menus, our culinary experiences are as unforgettable as the views they\'re served against.')
													]))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('exp-card')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-num')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('III')
													])),
												A2(
												$elm$html$Html$h3,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-title')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Private Beach Access')
													])),
												A2(
												$elm$html$Html$p,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('exp-card-text')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Secluded stretches of coastline, reserved exclusively for our guests. The definition of having the world to yourself.')
													]))
											]))
									]))
							]))
					]))
			]));
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$Main$renderFeaturedMosaic = function (model) {
	var renderTile = function (dest) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('dest-tile'),
					A2($elm$html$Html$Attributes$attribute, 'role', 'listitem'),
					$elm$html$Html$Events$onClick(
					$author$project$Main$OpenModal(dest.id))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dest-tile-img-wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-tile-img'),
									$elm$html$Html$Attributes$src(dest.heroImage),
									$elm$html$Html$Attributes$alt(dest.name)
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dest-tile-overlay')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dest-tile-info')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-tile-label')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(dest.region)
								])),
							A2(
							$elm$html$Html$h3,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-tile-name')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(dest.name + (', ' + dest.country))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('dest-tile-price')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									'from $' + ($elm$core$String$fromInt(dest.price) + ' / person'))
								]))
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('dest-tile-btn'),
							$author$project$Main$ariaLabel('View ' + dest.name)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('View Details')
						]))
				]));
	};
	var featured = A2($elm$core$List$take, 5, $author$project$Data$destinations);
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('destinations'),
				$author$project$Main$ariaLabel('Featured destinations')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'padding', 'var(--gap) 0'),
						A2($elm$html$Html$Attributes$style, 'background', 'var(--cream-mid)')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('label reveal visible'),
										A2($elm$html$Html$Attributes$style, 'margin-bottom', '10px')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Featured')
									])),
								A2(
								$elm$html$Html$h2,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('heading-xl heading-dark reveal visible'),
										A2($elm$html$Html$Attributes$style, 'color', 'var(--gold)')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Discover Our'),
										A2($elm$html$Html$br, _List_Nil, _List_Nil),
										$elm$html$Html$text('Destinations')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('dest-mosaic'),
								$elm$html$Html$Attributes$id('dest-mosaic'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '44px')
							]),
						A2($elm$core$List$map, renderTile, featured))
					]))
			]));
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$footer = _VirtualDom_node('footer');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Main$renderFooter = function (model) {
	return A2(
		$elm$html$Html$footer,
		_List_fromArray(
			[
				$author$project$Main$role('contentinfo')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('footer-top')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('footer-logo')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Voyager'),
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('footer-logo-sub')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Curated Travel')
													]))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('footer-tagline')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Extraordinary journeys for those who travel to feel something, not just to go somewhere. Expert curation. Unmatched access. Every detail handled.')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('footer-col-title')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Destinations')
											])),
										A2(
										$elm$html$Html$ul,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('footer-links'),
												$author$project$Main$role('list')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#discover')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Europe')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#discover')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Southeast Asia')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#discover')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Africa & Safari')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#discover')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('The Americas')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#discover')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Indian Ocean')
															]))
													]))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('footer-col-title')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Voyager')
											])),
										A2(
										$elm$html$Html$ul,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('footer-links'),
												$author$project$Main$role('list')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#process')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('How It Works')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#insider')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Insider\'s Pick')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#stories')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Stories')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#join-cta')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Newsletter')
															]))
													]))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('footer-col-title')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Support')
											])),
										A2(
										$elm$html$Html$ul,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('footer-links'),
												$author$project$Main$role('list')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Contact Us')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('FAQ')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Booking Terms')
															]))
													])),
												A2(
												$elm$html$Html$li,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$a,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$href('#')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Privacy Policy')
															]))
													]))
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('footer-bottom')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('footer-copy')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('© 2026 Voyager Travel Ltd. All rights reserved.')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('footer-social'),
										$author$project$Main$ariaLabel('Social media links')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#'),
												$author$project$Main$ariaLabel('Instagram')
											]),
										_List_fromArray(
											[
												A3(
												$elm$html$Html$node,
												'svg',
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24')
													]),
												_List_fromArray(
													[
														A3(
														$elm$html$Html$node,
														'path',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'd', 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z')
															]),
														_List_Nil)
													]))
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#'),
												$author$project$Main$ariaLabel('Twitter')
											]),
										_List_fromArray(
											[
												A3(
												$elm$html$Html$node,
												'svg',
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24')
													]),
												_List_fromArray(
													[
														A3(
														$elm$html$Html$node,
														'path',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'd', 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z')
															]),
														_List_Nil)
													]))
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#'),
												$author$project$Main$ariaLabel('Pinterest')
											]),
										_List_fromArray(
											[
												A3(
												$elm$html$Html$node,
												'svg',
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24')
													]),
												_List_fromArray(
													[
														A3(
														$elm$html$Html$node,
														'path',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'd', 'M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z')
															]),
														_List_Nil)
													]))
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Main$ToggleMobileNav = {$: 'ToggleMobileNav'};
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $author$project$Main$renderHeader = function (model) {
	return A2(
		$elm$html$Html$nav,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('nav'),
				$elm$html$Html$Attributes$class(
				model.navElevated ? 'elevated' : '')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('nav-inner')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('nav-links'),
								$author$project$Main$role('list')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#discover')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Destinations')
											]))
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#experiences')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Experiences')
											]))
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#insider')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Insider\'s Pick')
											]))
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#stories')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Stories')
											]))
									]))
							])),
						A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('nav-logo'),
								$elm$html$Html$Attributes$href('#')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Voyager'),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('nav-logo-sub')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Travel')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('nav-actions')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$href('#process'),
										$elm$html$Html$Attributes$class('nav-links')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('How It Works')
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('nav-book-btn'),
										$elm$html$Html$Attributes$id('nav-book-btn'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$OpenModal('santorini'))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Book Now')
									]))
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								'nav-hamburger' + (model.mobileNavOpen ? ' active' : '')),
								$elm$html$Html$Attributes$id('nav-hamburger'),
								$elm$html$Html$Events$onClick($author$project$Main$ToggleMobileNav)
							]),
						_List_fromArray(
							[
								A2($elm$html$Html$span, _List_Nil, _List_Nil),
								A2($elm$html$Html$span, _List_Nil, _List_Nil),
								A2($elm$html$Html$span, _List_Nil, _List_Nil)
							]))
					]))
			]));
};
var $author$project$Main$SetHeroSlide = function (a) {
	return {$: 'SetHeroSlide', a: a};
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $author$project$Main$renderHero = function (model) {
	var renderDots = function (i) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'hero-dot' + (_Utils_eq(model.heroIndex, i) ? ' active' : '')),
					$elm$html$Html$Events$onClick(
					$author$project$Main$SetHeroSlide(i))
				]),
			_List_Nil);
	};
	var activeSlide = A2(
		$elm$core$Maybe$withDefault,
		{image: '', label: ''},
		$elm$core$List$head(
			A2($elm$core$List$drop, model.heroIndex, $author$project$Data$heroSlides)));
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('hero'),
				$author$project$Main$ariaLabel('Voyager - Curated Travel Experiences')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hero-slides'),
						$elm$html$Html$Attributes$id('hero-slides')
					]),
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (i, slide) {
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class(
										'hero-slide' + (_Utils_eq(model.heroIndex, i) ? ' active' : '')),
										A2($elm$html$Html$Attributes$style, 'background-image', 'url(\'' + (slide.image + '\')'))
									]),
								_List_Nil);
						}),
					$author$project$Data$heroSlides)),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hero-overlay')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hero-content')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h1,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('hero-tagline'),
								$elm$html$Html$Attributes$id('hero-title')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Indulge in an'),
								A2($elm$html$Html$br, _List_Nil, _List_Nil),
								$elm$html$Html$text('Elegant Escape')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('hero-divider')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('hero-sub')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Curated journeys | Expert planning | Unmatched access')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hero-location')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('hero-location-dot')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('hero-location-text'),
								$elm$html$Html$Attributes$id('slide-label')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(activeSlide.label)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('hero-dots'),
						$elm$html$Html$Attributes$id('slide-dots')
					]),
				A2(
					$elm$core$List$map,
					renderDots,
					A2(
						$elm$core$List$range,
						0,
						$elm$core$List$length($author$project$Data$heroSlides) - 1)))
			]));
};
var $elm$html$Html$blockquote = _VirtualDom_node('blockquote');
var $author$project$Data$insiderPick = {body: 'The crowds of August have retreated with the summer charter flights. What remains is the coast in its truest form  -  local fishermen hauling nets at Positano\'s harbour before the tourist yachts wake, lemons the size of your fist hanging in groves above empty hiking trails, and the kind of autumn light that turns every moment into something painted while you\'re inside it.\n\nWe split 8 nights between a clifftop suite in Ravello and a harbour-front room in Positano: two places that show you completely different faces of the same coast. In Ravello, the Villa Rufolo gardens are yours before 9am. In Positano, you\'ll navigate vertical streets by instinct by day three.\n\nThe Path of the Gods between Agerola and Nocelle takes four hours if you don\'t stop. We stopped many times.', destination: 'Amalfi Coast, Italy', destinationId: 'amalfi', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80', intro: 'October on the Amalfi Coast is a secret kept by those who\'ve been.', month: 'Featured  -  October', price: 3290, pullQuote: 'Some places you visit. Some places you return to in dreams.'};
var $author$project$Main$renderInsiderPickSection = function (model) {
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('insider'),
				$author$project$Main$ariaLabel('Insider\'s Pick - Featured Destination')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('label reveal visible'),
								A2($elm$html$Html$Attributes$style, 'margin-bottom', '12px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Insider\'s Pick')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('insider-inner reveal-scale visible')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('insider-image-col')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$id('insider-img'),
												$elm$html$Html$Attributes$class('insider-img'),
												$elm$html$Html$Attributes$src($author$project$Data$insiderPick.image),
												$elm$html$Html$Attributes$alt($author$project$Data$insiderPick.destination)
											]),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('insider-image-label'),
												$elm$html$Html$Attributes$id('insider-month-label')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Data$insiderPick.month)
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('insider-text-col')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('insider-eyebrow label'),
												$elm$html$Html$Attributes$id('insider-eyebrow')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Data$insiderPick.destination)
											])),
										A2(
										$elm$html$Html$h2,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('insider-title'),
												$elm$html$Html$Attributes$id('insider-title')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('The coast the\ncrowds don\'t know')
											])),
										A2(
										$elm$html$Html$blockquote,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('insider-quote'),
												$elm$html$Html$Attributes$id('insider-quote')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('\"' + ($author$project$Data$insiderPick.pullQuote + '\"'))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('insider-body'),
												$elm$html$Html$Attributes$id('insider-body')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text($author$project$Data$insiderPick.body)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('insider-footer')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														$elm$html$Html$p,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('insider-price-label')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('From')
															])),
														A2(
														$elm$html$Html$p,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('insider-price'),
																$elm$html$Html$Attributes$id('insider-price')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(
																'$' + $elm$core$String$fromInt($author$project$Data$insiderPick.price)),
																A2(
																$elm$html$Html$span,
																_List_Nil,
																_List_fromArray(
																	[
																		$elm$html$Html$text(' / person')
																	]))
															]))
													])),
												A2(
												$elm$html$Html$button,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('btn-primary'),
														$elm$html$Html$Attributes$id('insider-book-btn'),
														$elm$html$Html$Events$onClick(
														$author$project$Main$OpenModal($author$project$Data$insiderPick.destinationId)),
														$author$project$Main$ariaLabel('Book ' + ($author$project$Data$insiderPick.destination + ' Insider\'s Pick'))
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('Book This Journey '),
														A3(
														$elm$html$Html$node,
														'svg',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'width', '14'),
																A2($elm$html$Html$Attributes$attribute, 'height', '14'),
																A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24'),
																A2($elm$html$Html$Attributes$attribute, 'fill', 'none'),
																A2($elm$html$Html$Attributes$attribute, 'stroke', 'currentColor'),
																A2($elm$html$Html$Attributes$attribute, 'stroke-width', '2')
															]),
														_List_fromArray(
															[
																A3(
																$elm$html$Html$node,
																'line',
																_List_fromArray(
																	[
																		A2($elm$html$Html$Attributes$attribute, 'x1', '5'),
																		A2($elm$html$Html$Attributes$attribute, 'y1', '12'),
																		A2($elm$html$Html$Attributes$attribute, 'x2', '19'),
																		A2($elm$html$Html$Attributes$attribute, 'y2', '12')
																	]),
																_List_Nil),
																A3(
																$elm$html$Html$node,
																'polyline',
																_List_fromArray(
																	[
																		A2($elm$html$Html$Attributes$attribute, 'points', '12,5 19,12 12,19')
																	]),
																_List_Nil)
															]))
													]))
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Main$renderIntro = function (model) {
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('intro'),
				$author$project$Main$ariaLabel('About Voyager')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						A3(
						$elm$html$Html$node,
						'svg',
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('intro-icon reveal visible'),
								A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 44 44'),
								A2($elm$html$Html$Attributes$attribute, 'fill', 'none')
							]),
						_List_fromArray(
							[
								A3(
								$elm$html$Html$node,
								'path',
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$attribute, 'd', 'M22 2L26.5 14.5L40 14.5L29 22.5L33 35L22 27L11 35L15 22.5L4 14.5L17.5 14.5Z'),
										A2($elm$html$Html$Attributes$attribute, 'stroke', '#B5935A'),
										A2($elm$html$Html$Attributes$attribute, 'stroke-width', '1'),
										A2($elm$html$Html$Attributes$attribute, 'fill', 'none')
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('intro-heading reveal visible')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Infinite Excellence,'),
								A2($elm$html$Html$br, _List_Nil, _List_Nil),
								$elm$html$Html$text('For Those Who Seek It')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('intro-body stagger-children visible')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('Immerse yourself in destinations that transcend the ordinary -- where dazzling natural scenery meets the refined pleasures of world-class hospitality. Created for travelers who understand that the finest journeys are felt, not merely taken.')
									])),
								A2(
								$elm$html$Html$p,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('From refreshing overwater villas and enchanting cliffside estates to the vibrant energy of legendary cities, Voyager positions you at the heart of experiences most travelers only dream of. Every detail is handled. Every moment is yours.')
									]))
							]))
					]))
			]));
};
var $author$project$Main$SubmitNewsletter = {$: 'SubmitNewsletter'};
var $author$project$Main$UpdateNewsletterEmail = function (a) {
	return {$: 'UpdateNewsletterEmail', a: a};
};
var $elm$html$Html$form = _VirtualDom_node('form');
var $elm$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$html$Html$Events$onSubmit = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysPreventDefault,
			$elm$json$Json$Decode$succeed(msg)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$required = $elm$html$Html$Attributes$boolProperty('required');
var $author$project$Main$renderJoinCTA = function (model) {
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('join-cta'),
				$author$project$Main$ariaLabel('Join Voyager newsletter')
			]),
		_List_fromArray(
			[
				A3(
				$elm$html$Html$node,
				'svg',
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('join-icon'),
						A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 44 44'),
						A2($elm$html$Html$Attributes$attribute, 'fill', 'none')
					]),
				_List_fromArray(
					[
						A3(
						$elm$html$Html$node,
						'path',
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$attribute, 'd', 'M22 2L26.5 14.5L40 14.5L29 22.5L33 35L22 27L11 35L15 22.5L4 14.5L17.5 14.5Z'),
								A2($elm$html$Html$Attributes$attribute, 'stroke', '#C9A96E'),
								A2($elm$html$Html$Attributes$attribute, 'stroke-width', '1'),
								A2($elm$html$Html$Attributes$attribute, 'fill', 'none')
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('join-heading reveal visible')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Unlock Exclusive Access')
					])),
				A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('join-sub reveal visible')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Early access to new destinations, members-only offers, and the insider intelligence that changes how you travel.')
					])),
				model.newsletterJoined ? A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'color', 'var(--gold)'),
						A2($elm$html$Html$Attributes$style, 'margin-top', '12px')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Thank you for joining. Welcome to Voyager.')
					])) : A2(
				$elm$html$Html$form,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('join-form reveal visible'),
						$elm$html$Html$Attributes$id('newsletter-form'),
						$elm$html$Html$Events$onSubmit($author$project$Main$SubmitNewsletter),
						$author$project$Main$ariaLabel('Newsletter signup')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('email'),
								$elm$html$Html$Attributes$id('newsletter-email'),
								$elm$html$Html$Attributes$placeholder('Your email address'),
								$elm$html$Html$Attributes$value(model.newsletterEmail),
								$elm$html$Html$Events$onInput($author$project$Main$UpdateNewsletterEmail),
								$elm$html$Html$Attributes$required(true)
							]),
						_List_Nil),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('submit'),
								$author$project$Main$ariaLabel('Subscribe')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Join Now')
							]))
					]))
			]));
};
var $author$project$Main$renderMobileNav = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('mobile-nav'),
				$elm$html$Html$Attributes$class(
				model.mobileNavOpen ? 'open' : '')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#discover'),
						$elm$html$Html$Attributes$class('mobile-nav-link'),
						$elm$html$Html$Events$onClick($author$project$Main$ToggleMobileNav)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Destinations')
					])),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#experiences'),
						$elm$html$Html$Attributes$class('mobile-nav-link'),
						$elm$html$Html$Events$onClick($author$project$Main$ToggleMobileNav)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Experiences')
					])),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#insider'),
						$elm$html$Html$Attributes$class('mobile-nav-link'),
						$elm$html$Html$Events$onClick($author$project$Main$ToggleMobileNav)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Insider\'s Pick')
					])),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#stories'),
						$elm$html$Html$Attributes$class('mobile-nav-link'),
						$elm$html$Html$Events$onClick($author$project$Main$ToggleMobileNav)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Stories')
					])),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#process'),
						$elm$html$Html$Attributes$class('mobile-nav-link'),
						$elm$html$Html$Events$onClick($author$project$Main$ToggleMobileNav)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('How It Works')
					])),
				A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href('#'),
						$elm$html$Html$Attributes$class('mobile-nav-link'),
						A2($elm$html$Html$Attributes$style, 'color', 'var(--gold)'),
						$elm$html$Html$Events$onClick(
						$author$project$Main$OpenModal('santorini'))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Book Now')
					]))
			]));
};
var $author$project$Data$Climate = F4(
	function (temps, labels, price, best) {
		return {best: best, labels: labels, price: price, temps: temps};
	});
var $author$project$Main$CloseModal = {$: 'CloseModal'};
var $author$project$Data$Destination = function (id) {
	return function (name) {
		return function (country) {
			return function (region) {
				return function (moods) {
					return function (image) {
						return function (heroImage) {
							return function (gallery) {
								return function (price) {
									return function (duration) {
										return function (rating) {
											return function (reviewCount) {
												return function (tags) {
													return function (shortDesc) {
														return function (description) {
															return function (highlights) {
																return function (included) {
																	return function (climate) {
																		return function (flights) {
																			return function (visa) {
																				return function (suites) {
																					return {climate: climate, country: country, description: description, duration: duration, flights: flights, gallery: gallery, heroImage: heroImage, highlights: highlights, id: id, image: image, included: included, moods: moods, name: name, price: price, rating: rating, region: region, reviewCount: reviewCount, shortDesc: shortDesc, suites: suites, tags: tags, visa: visa};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Main$SelectSuite = function (a) {
	return {$: 'SelectSuite', a: a};
};
var $author$project$Main$SetBookingStep = function (a) {
	return {$: 'SetBookingStep', a: a};
};
var $author$project$Main$SetModalMainImage = function (a) {
	return {$: 'SetModalMainImage', a: a};
};
var $author$project$Main$SubmitBookingForm = function (a) {
	return {$: 'SubmitBookingForm', a: a};
};
var $author$project$Main$ToggleAddOn = function (a) {
	return {$: 'ToggleAddOn', a: a};
};
var $author$project$Main$UpdateBookingFormBudget = function (a) {
	return {$: 'UpdateBookingFormBudget', a: a};
};
var $author$project$Main$UpdateBookingFormCheckin = function (a) {
	return {$: 'UpdateBookingFormCheckin', a: a};
};
var $author$project$Main$UpdateBookingFormCheckout = function (a) {
	return {$: 'UpdateBookingFormCheckout', a: a};
};
var $author$project$Main$UpdateBookingFormEmail = function (a) {
	return {$: 'UpdateBookingFormEmail', a: a};
};
var $author$project$Main$UpdateBookingFormName = function (a) {
	return {$: 'UpdateBookingFormName', a: a};
};
var $author$project$Main$UpdateBookingFormNotes = function (a) {
	return {$: 'UpdateBookingFormNotes', a: a};
};
var $author$project$Main$UpdateBookingFormTravelers = function (a) {
	return {$: 'UpdateBookingFormTravelers', a: a};
};
var $author$project$Main$ariaModal = function (valueBool) {
	return A2(
		$elm$html$Html$Attributes$attribute,
		'aria-modal',
		valueBool ? 'true' : 'false');
};
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $author$project$Main$getSeasonMultiplier = F2(
	function (dest, dateStr) {
		var monthPart = A3($elm$core$String$slice, 5, 7, dateStr);
		var monthIdx = A2(
			$elm$core$Maybe$withDefault,
			6,
			A2(
				$elm$core$Maybe$map,
				function (m) {
					return m - 1;
				},
				$elm$core$String$toInt(monthPart)));
		return (dest.id === 'itinerary') ? 1.0 : A2(
			$elm$core$Maybe$withDefault,
			1.0,
			$elm$core$List$head(
				A2($elm$core$List$drop, monthIdx, dest.climate.price)));
	});
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$round = _Basics_round;
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $author$project$Main$renderModal = function (model) {
	var _v0 = model.selectedDetailDestId;
	if (_v0.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		var destId = _v0.a;
		var travelersInt = A2(
			$elm$core$Maybe$withDefault,
			2,
			$elm$core$String$toInt(model.bookingForm.travelers));
		var includedItem = function (itemText) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('modal-included-item')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(itemText)
					]));
		};
		var highlightItem = function (highlightText) {
			return A2(
				$elm$html$Html$li,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('modal-highlight-item')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(highlightText)
					]));
		};
		var dest = function () {
			if (destId === 'itinerary') {
				var tripDests = A2(
					$elm$core$List$filterMap,
					function (id) {
						return $elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (d) {
									return _Utils_eq(d.id, id);
								},
								$author$project$Data$destinations));
					},
					model.itinerary);
				var totalPrice = A3(
					$elm$core$List$foldl,
					F2(
						function (d, acc) {
							return acc + d.price;
						}),
					0,
					tripDests);
				var names = A2(
					$elm$core$String$join,
					' + ',
					A2(
						$elm$core$List$map,
						function ($) {
							return $.name;
						},
						tripDests));
				var galleryImgs = A2(
					$elm$core$List$map,
					function ($) {
						return $.image;
					},
					tripDests);
				var firstImg = A2(
					$elm$core$Maybe$withDefault,
					'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.image;
						},
						$elm$core$List$head(tripDests)));
				var countries = A2(
					$elm$core$String$join,
					', ',
					A3(
						$elm$core$List$foldl,
						F2(
							function (c, acc) {
								return A2($elm$core$List$member, c, acc) ? acc : _Utils_ap(
									acc,
									_List_fromArray(
										[c]));
							}),
						_List_Nil,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.country;
							},
							tripDests)));
				return {
					climate: {best: _List_Nil, labels: _List_Nil, price: _List_Nil, temps: _List_Nil},
					country: $elm$core$String$isEmpty(countries) ? 'Multi-Destination Voyage' : countries,
					description: 'This is a bespoke multi-destination itinerary designed specifically around your selections: ' + (names + '. Your dedicated travel curator will refine the transitions, private transport, and accommodations to ensure a seamless flow.'),
					duration: $elm$core$String$fromInt(
						$elm$core$List$length(tripDests) * 3) + (' - ' + ($elm$core$String$fromInt(
						$elm$core$List$length(tripDests) * 5) + ' nights')),
					flights: 'Custom flight planning included',
					gallery: galleryImgs,
					heroImage: firstImg,
					highlights: A2(
						$elm$core$List$map,
						function (d) {
							return 'Explore ' + (d.name + (' (' + (d.country + ')')));
						},
						tripDests),
					id: 'itinerary',
					image: firstImg,
					included: _List_fromArray(
						['Private transfers between destinations', 'Luxury handpicked accommodations', '24/7 concierge support', 'Personalised activity planning']),
					moods: _List_Nil,
					name: 'Your Custom Journey',
					price: totalPrice,
					rating: 5.0,
					region: 'Personalised Itinerary',
					reviewCount: $elm$core$List$length(tripDests),
					shortDesc: 'A custom-crafted route combining ' + (names + '.'),
					suites: _List_Nil,
					tags: _List_fromArray(
						['Tailored', 'Multi-City', 'Bespoke']),
					visa: 'Visa assistance provided for all destinations'
				};
			} else {
				return A2(
					$elm$core$Maybe$withDefault,
					A2(
						$elm$core$Maybe$withDefault,
						$author$project$Data$Destination('')('')('')('')(_List_Nil)('')('')(_List_Nil)(0)('')(0.0)(0)(_List_Nil)('')('')(_List_Nil)(_List_Nil)(
							A4($author$project$Data$Climate, _List_Nil, _List_Nil, _List_Nil, _List_Nil))('')('')(_List_Nil),
						$elm$core$List$head($author$project$Data$destinations)),
					$elm$core$List$head(
						A2(
							$elm$core$List$filter,
							function (d) {
								return _Utils_eq(d.id, destId);
							},
							$author$project$Data$destinations)));
			}
		}();
		var mainImg = A2($elm$core$Maybe$withDefault, dest.image, model.activeModalTabImage);
		var renderCalendarMonth = F2(
			function (idx, label) {
				var priceMultiplier = A2(
					$elm$core$Maybe$withDefault,
					1.0,
					$elm$core$List$head(
						A2($elm$core$List$drop, idx, dest.climate.price)));
				var priceClass = (priceMultiplier < 0.85) ? 'price-low' : ((priceMultiplier > 1.3) ? 'price-high' : 'price-med');
				var isBest = A2($elm$core$List$member, idx, dest.climate.best);
				var fullClass = _Utils_ap(
					priceClass,
					isBest ? ' best-month' : '');
				var barH = $elm$core$Basics$round(priceMultiplier * 35.0) + 10;
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							'calendar-month' + (isBest ? ' is-best' : ''))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('calendar-bar-wrap')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('calendar-best-dot')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('calendar-bar ' + fullClass),
											A2(
											$elm$html$Html$Attributes$style,
											'height',
											$elm$core$String$fromInt(barH) + 'px')
										]),
									_List_Nil)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('calendar-month-label')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(label)
								]))
						]));
			});
		var seasonMultiplier = A2($author$project$Main$getSeasonMultiplier, dest, model.bookingForm.checkin);
		var starCount = $elm$core$Basics$floor(dest.rating);
		var starStr = A2($elm$core$String$repeat, starCount, '★');
		var suiteModifier = function () {
			if (dest.id === 'itinerary') {
				return 0;
			} else {
				var selectedSuite = $elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (s) {
							return _Utils_eq(s.id, model.selectedSuiteId);
						},
						dest.suites));
				return A2(
					$elm$core$Maybe$withDefault,
					0,
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.priceModifier;
						},
						selectedSuite));
			}
		}();
		var thumbnailImg = F2(
			function (idx, imgUrl) {
				return A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							'modal-thumb' + (_Utils_eq(mainImg, imgUrl) ? ' active' : '')),
							$elm$html$Html$Attributes$src(imgUrl),
							$elm$html$Html$Attributes$alt(
							dest.name + (' photo ' + $elm$core$String$fromInt(idx + 1))),
							$elm$html$Html$Events$onClick(
							$author$project$Main$SetModalMainImage(imgUrl)),
							$author$project$Main$role('button'),
							$elm$html$Html$Attributes$tabindex(0)
						]),
					_List_Nil);
			});
		var basePrice = dest.price;
		var addOnCost = ((model.addOnHelicopter ? 750 : 0) + (model.addOnYacht ? 1200 : 0)) + (model.addOnSommelier ? 450 : 0);
		var priceCalculated = $elm$core$Basics$round(((basePrice + suiteModifier) * travelersInt) * seasonMultiplier) + addOnCost;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('dest-modal'),
					$elm$html$Html$Attributes$class('open'),
					$author$project$Main$role('dialog'),
					$author$project$Main$ariaModal(true)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal-backdrop open'),
							$elm$html$Html$Attributes$id('modal-backdrop'),
							$elm$html$Html$Events$onClick($author$project$Main$CloseModal)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal-panel open'),
							$elm$html$Html$Attributes$id('modal-panel')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-gallery')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$img,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$id('modal-main-img'),
											$elm$html$Html$Attributes$class('modal-main-img'),
											$elm$html$Html$Attributes$src(mainImg),
											$elm$html$Html$Attributes$alt(dest.name)
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-thumbnails'),
											$elm$html$Html$Attributes$id('modal-thumbnails'),
											$author$project$Main$role('list')
										]),
									A2($elm$core$List$indexedMap, thumbnailImg, dest.gallery)),
									A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-close'),
											$elm$html$Html$Attributes$id('modal-close'),
											$elm$html$Html$Events$onClick($author$project$Main$CloseModal),
											$author$project$Main$ariaLabel('Close')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('✕')
										]))
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-detail'),
									$elm$html$Html$Attributes$id('modal-detail')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h2,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-destination-name'),
													$elm$html$Html$Attributes$id('modal-destination-name')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(dest.name)
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-destination-country'),
													$elm$html$Html$Attributes$id('modal-destination-country')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(dest.country + (' · ' + dest.region))
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-badges'),
											$elm$html$Html$Attributes$id('modal-badges')
										]),
									A2(
										$elm$core$List$map,
										function (t) {
											return A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('modal-badge')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text(t)
													]));
										},
										dest.tags)),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-rating-row')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-stars'),
													$elm$html$Html$Attributes$id('modal-stars')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(starStr)
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-rating-num'),
													$elm$html$Html$Attributes$id('modal-rating-num')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													$elm$core$String$fromFloat(dest.rating))
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-rating-count'),
													$elm$html$Html$Attributes$id('modal-rating-count')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													'(' + ($elm$core$String$fromInt(dest.reviewCount) + ' reviews)'))
												]))
										])),
									A2(
									$elm$html$Html$p,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-desc'),
											$elm$html$Html$Attributes$id('modal-desc')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(dest.description)
										])),
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-highlights-title')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Highlights')
												])),
											A2(
											$elm$html$Html$ul,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-highlights-list'),
													$elm$html$Html$Attributes$id('modal-highlights')
												]),
											A2($elm$core$List$map, highlightItem, dest.highlights))
										])),
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-included-title')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('What\'s Included')
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-included-list'),
													$elm$html$Html$Attributes$id('modal-included')
												]),
											A2($elm$core$List$map, includedItem, dest.included))
										])),
									(dest.id === 'itinerary') ? $elm$html$Html$text('') : A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-calendar')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-calendar-title')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Best Time to Visit & Price Guide')
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('calendar-grid'),
													$elm$html$Html$Attributes$id('calendar-grid')
												]),
											A2($elm$core$List$indexedMap, renderCalendarMonth, dest.climate.labels)),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('calendar-legend')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('calendar-legend-item')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('calendar-legend-swatch'),
																	A2($elm$html$Html$Attributes$style, 'background', 'rgba(72,199,142,0.5)')
																]),
															_List_Nil),
															$elm$html$Html$text('Low')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('calendar-legend-item')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('calendar-legend-swatch'),
																	A2($elm$html$Html$Attributes$style, 'background', 'rgba(181,147,90,0.5)')
																]),
															_List_Nil),
															$elm$html$Html$text('Mid')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('calendar-legend-item')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('calendar-legend-swatch'),
																	A2($elm$html$Html$Attributes$style, 'background', 'rgba(201,100,70,0.5)')
																]),
															_List_Nil),
															$elm$html$Html$text('Peak')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('calendar-legend-item')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('calendar-legend-swatch'),
																	A2($elm$html$Html$Attributes$style, 'background', 'rgba(181,147,90,0.7)'),
																	A2($elm$html$Html$Attributes$style, 'outline', '1.5px solid #B5935A')
																]),
															_List_Nil),
															$elm$html$Html$text('★ Best')
														]))
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-travel-info')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-info-item')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('modal-info-label')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Flights')
														])),
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('modal-info-value')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(dest.flights)
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-info-item')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('modal-info-label')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Visa')
														])),
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('modal-info-value')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(dest.visa)
														]))
												]))
										])),
									A2(
									$elm$html$Html$hr,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('modal-booking-divider')
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('booking-wizard-nav')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('button'),
													$elm$html$Html$Attributes$class(
													'wizard-nav-item' + ((model.bookingStep === 1) ? ' active' : '')),
													$elm$html$Html$Events$onClick(
													$author$project$Main$SetBookingStep(1))
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('nav-num')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('I')
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('nav-label')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text(
															(dest.id === 'itinerary') ? 'Route Confirm' : 'Select Sanctuary')
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('wizard-nav-line')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('button'),
													$elm$html$Html$Attributes$class(
													'wizard-nav-item' + ((model.bookingStep === 2) ? ' active' : '')),
													$elm$html$Html$Events$onClick(
													$author$project$Main$SetBookingStep(2))
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('nav-num')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('II')
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('nav-label')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Dates & Guests')
														]))
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('wizard-nav-line')
												]),
											_List_Nil),
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('button'),
													$elm$html$Html$Attributes$class(
													'wizard-nav-item' + ((model.bookingStep === 3) ? ' active' : '')),
													$elm$html$Html$Events$onClick(
													$author$project$Main$SetBookingStep(3))
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('nav-num')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('III')
														])),
													A2(
													$elm$html$Html$span,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('nav-label')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Concierge Curation')
														]))
												]))
										])),
									A2(
									$elm$html$Html$form,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('booking-form'),
											$elm$html$Html$Attributes$id('booking-form'),
											$elm$html$Html$Events$onSubmit(
											$author$project$Main$SubmitBookingForm(dest.id))
										]),
									_List_fromArray(
										[
											(model.bookingStep === 1) ? ((dest.id === 'itinerary') ? A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('wizard-step-panel animate-fade')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('itinerary-summary-box')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$p,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('itinerary-summary-title')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Bespoke Multi-Destination Journey')
																])),
															A2(
															$elm$html$Html$p,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('itinerary-summary-desc')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('You have selected a custom route. Your dedicated travel curator will hand-design every stop, selecting five-star properties and suites tailored to your taste.')
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('itinerary-timeline')
																]),
															A2(
																$elm$core$List$indexedMap,
																F2(
																	function (idx, itemDestId) {
																		var dName = A2(
																			$elm$core$Maybe$withDefault,
																			itemDestId,
																			A2(
																				$elm$core$Maybe$map,
																				function ($) {
																					return $.name;
																				},
																				$elm$core$List$head(
																					A2(
																						$elm$core$List$filter,
																						function (d) {
																							return _Utils_eq(d.id, itemDestId);
																						},
																						$author$project$Data$destinations))));
																		return A2(
																			$elm$html$Html$div,
																			_List_fromArray(
																				[
																					$elm$html$Html$Attributes$class('itinerary-timeline-item')
																				]),
																			_List_fromArray(
																				[
																					A2(
																					$elm$html$Html$span,
																					_List_fromArray(
																						[
																							$elm$html$Html$Attributes$class('timeline-dot')
																						]),
																					_List_fromArray(
																						[
																							$elm$html$Html$text(
																							$elm$core$String$fromInt(idx + 1))
																						])),
																					A2(
																					$elm$html$Html$span,
																					_List_fromArray(
																						[
																							$elm$html$Html$Attributes$class('timeline-name')
																						]),
																					_List_fromArray(
																						[
																							$elm$html$Html$text(dName)
																						]))
																				]));
																	}),
																model.itinerary))
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('wizard-actions')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Attributes$class('btn-wizard-next'),
																	$elm$html$Html$Events$onClick(
																	$author$project$Main$SetBookingStep(2))
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Continue to Dates & Guests ➔')
																]))
														]))
												])) : A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('wizard-step-panel animate-fade')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('step-helper-text')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Select your preferred suite type. Rates scale by room grade.')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('suite-grid')
														]),
													A2(
														$elm$core$List$map,
														function (suite) {
															return A2(
																$elm$html$Html$button,
																_List_fromArray(
																	[
																		$elm$html$Html$Attributes$type_('button'),
																		$elm$html$Html$Attributes$class(
																		'suite-card' + (_Utils_eq(model.selectedSuiteId, suite.id) ? ' active' : '')),
																		$elm$html$Html$Events$onClick(
																		$author$project$Main$SelectSuite(suite.id))
																	]),
																_List_fromArray(
																	[
																		A2(
																		$elm$html$Html$div,
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$class('suite-card-img-wrap')
																			]),
																		_List_fromArray(
																			[
																				A2(
																				$elm$html$Html$img,
																				_List_fromArray(
																					[
																						$elm$html$Html$Attributes$class('suite-card-img'),
																						$elm$html$Html$Attributes$src(suite.image),
																						$elm$html$Html$Attributes$alt(suite.name)
																					]),
																				_List_Nil)
																			])),
																		A2(
																		$elm$html$Html$div,
																		_List_fromArray(
																			[
																				$elm$html$Html$Attributes$class('suite-card-body')
																			]),
																		_List_fromArray(
																			[
																				A2(
																				$elm$html$Html$div,
																				_List_fromArray(
																					[
																						$elm$html$Html$Attributes$class('suite-card-header')
																					]),
																				_List_fromArray(
																					[
																						A2(
																						$elm$html$Html$h4,
																						_List_fromArray(
																							[
																								$elm$html$Html$Attributes$class('suite-card-name')
																							]),
																						_List_fromArray(
																							[
																								$elm$html$Html$text(suite.name)
																							])),
																						A2(
																						$elm$html$Html$span,
																						_List_fromArray(
																							[
																								$elm$html$Html$Attributes$class('suite-card-modifier')
																							]),
																						_List_fromArray(
																							[
																								$elm$html$Html$text(
																								(!suite.priceModifier) ? 'Included' : ('+' + ('$' + ($elm$core$String$fromInt(suite.priceModifier) + ' / night'))))
																							]))
																					])),
																				A2(
																				$elm$html$Html$p,
																				_List_fromArray(
																					[
																						$elm$html$Html$Attributes$class('suite-card-desc')
																					]),
																				_List_fromArray(
																					[
																						$elm$html$Html$text(suite.description)
																					]))
																			]))
																	]));
														},
														dest.suites)),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('wizard-actions')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Attributes$class('btn-wizard-next'),
																	$elm$html$Html$Events$onClick(
																	$author$project$Main$SetBookingStep(2))
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Continue to Dates & Guests ➔')
																]))
														]))
												]))) : ((model.bookingStep === 2) ? A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('wizard-step-panel animate-fade')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('form-row')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('form-group')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$label,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$for('booking-checkin'),
																			$elm$html$Html$Attributes$class('form-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Arrival Date')
																		])),
																	A2(
																	$elm$html$Html$input,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$type_('date'),
																			$elm$html$Html$Attributes$id('booking-checkin'),
																			$elm$html$Html$Attributes$class('form-input'),
																			$elm$html$Html$Attributes$value(model.bookingForm.checkin),
																			$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingFormCheckin),
																			$elm$html$Html$Attributes$required(true)
																		]),
																	_List_Nil)
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('form-group')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$label,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$for('booking-checkout'),
																			$elm$html$Html$Attributes$class('form-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Departure Date')
																		])),
																	A2(
																	$elm$html$Html$input,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$type_('date'),
																			$elm$html$Html$Attributes$id('booking-checkout'),
																			$elm$html$Html$Attributes$class('form-input'),
																			$elm$html$Html$Attributes$value(model.bookingForm.checkout),
																			$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingFormCheckout),
																			$elm$html$Html$Attributes$required(true)
																		]),
																	_List_Nil)
																]))
														])),
													function () {
													if (_Utils_cmp(model.bookingForm.checkin, model.bookingForm.checkout) > -1) {
														return A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('date-warning')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('✦ Departure date must be after arrival date')
																]));
													} else {
														var pct = $elm$core$Basics$round((seasonMultiplier - 1.0) * 100.0);
														return (pct > 15) ? A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('season-badge peak')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	'✦ Peak Season Rates Apply (+' + ($elm$core$String$fromInt(pct) + '% for selected month)'))
																])) : ((_Utils_cmp(pct, -15) < 0) ? A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('season-badge value')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	'✦ Value Season Rates Apply (' + ($elm$core$String$fromInt(pct) + '% for selected month)'))
																])) : A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('season-badge standard')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('✦ Standard Season Rates Apply')
																])));
													}
												}(),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('form-row'),
															A2($elm$html$Html$Attributes$style, 'margin-top', '16px')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('form-group')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$label,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$for('booking-travelers'),
																			$elm$html$Html$Attributes$class('form-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Travelers')
																		])),
																	A2(
																	$elm$html$Html$select,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$id('booking-travelers'),
																			$elm$html$Html$Attributes$class('form-select'),
																			$elm$html$Html$Attributes$value(model.bookingForm.travelers),
																			$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingFormTravelers)
																		]),
																	_List_fromArray(
																		[
																			A2(
																			$elm$html$Html$option,
																			_List_fromArray(
																				[
																					$elm$html$Html$Attributes$value('1')
																				]),
																			_List_fromArray(
																				[
																					$elm$html$Html$text('1 traveler')
																				])),
																			A2(
																			$elm$html$Html$option,
																			_List_fromArray(
																				[
																					$elm$html$Html$Attributes$value('2')
																				]),
																			_List_fromArray(
																				[
																					$elm$html$Html$text('2 travelers')
																				])),
																			A2(
																			$elm$html$Html$option,
																			_List_fromArray(
																				[
																					$elm$html$Html$Attributes$value('3')
																				]),
																			_List_fromArray(
																				[
																					$elm$html$Html$text('3 travelers')
																				])),
																			A2(
																			$elm$html$Html$option,
																			_List_fromArray(
																				[
																					$elm$html$Html$Attributes$value('4')
																				]),
																			_List_fromArray(
																				[
																					$elm$html$Html$text('4+ travelers')
																				]))
																		]))
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('form-group')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$label,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$for('booking-budget'),
																			$elm$html$Html$Attributes$class('form-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Budget Range')
																		])),
																	A2(
																	$elm$html$Html$select,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$id('booking-budget'),
																			$elm$html$Html$Attributes$class('form-select'),
																			$elm$html$Html$Attributes$value(model.bookingForm.budget),
																			$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingFormBudget)
																		]),
																	_List_fromArray(
																		[
																			A2(
																			$elm$html$Html$option,
																			_List_Nil,
																			_List_fromArray(
																				[
																					$elm$html$Html$text('Under $3,000')
																				])),
																			A2(
																			$elm$html$Html$option,
																			_List_Nil,
																			_List_fromArray(
																				[
																					$elm$html$Html$text('$3,000 - $6,000')
																				])),
																			A2(
																			$elm$html$Html$option,
																			_List_Nil,
																			_List_fromArray(
																				[
																					$elm$html$Html$text('$6,000 - $10,000')
																				])),
																			A2(
																			$elm$html$Html$option,
																			_List_Nil,
																			_List_fromArray(
																				[
																					$elm$html$Html$text('$10,000+')
																				]))
																		]))
																]))
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('wizard-actions')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Attributes$class('btn-wizard-prev'),
																	$elm$html$Html$Events$onClick(
																	$author$project$Main$SetBookingStep(1))
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('⮨ Select Sanctuary')
																])),
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Attributes$class('btn-wizard-next'),
																	$elm$html$Html$Events$onClick(
																	$author$project$Main$SetBookingStep(3)),
																	$elm$html$Html$Attributes$disabled(
																	_Utils_cmp(model.bookingForm.checkin, model.bookingForm.checkout) > -1)
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Continue to Curation ➔')
																]))
														]))
												])) : A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('wizard-step-panel animate-fade')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('step-helper-text')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Enhance your escape with bespoke curator additions.')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('addon-grid')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Attributes$class(
																	'addon-card' + (model.addOnHelicopter ? ' active' : '')),
																	$elm$html$Html$Events$onClick(
																	$author$project$Main$ToggleAddOn('helicopter'))
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-badge')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('+$750')
																		])),
																	A2(
																	$elm$html$Html$h4,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-name')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Heli-Transfer')
																		])),
																	A2(
																	$elm$html$Html$p,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-desc')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Arrive directly to the resort landing pad via private charter.')
																		]))
																])),
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Attributes$class(
																	'addon-card' + (model.addOnYacht ? ' active' : '')),
																	$elm$html$Html$Events$onClick(
																	$author$project$Main$ToggleAddOn('yacht'))
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-badge')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('+$1,200')
																		])),
																	A2(
																	$elm$html$Html$h4,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-name')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Yacht Excursion')
																		])),
																	A2(
																	$elm$html$Html$p,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-desc')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Four-hour private cruise with custom sommelier and dining onboard.')
																		]))
																])),
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Attributes$class(
																	'addon-card' + (model.addOnSommelier ? ' active' : '')),
																	$elm$html$Html$Events$onClick(
																	$author$project$Main$ToggleAddOn('sommelier'))
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-badge')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('+$450')
																		])),
																	A2(
																	$elm$html$Html$h4,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-name')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('In-Villa Cellar')
																		])),
																	A2(
																	$elm$html$Html$p,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('addon-desc')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Sommelier-stocked local vintage cabinet refreshed daily.')
																		]))
																]))
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('form-row'),
															A2($elm$html$Html$Attributes$style, 'margin-top', '24px')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('form-group')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$label,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$for('booking-name'),
																			$elm$html$Html$Attributes$class('form-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Full Name')
																		])),
																	A2(
																	$elm$html$Html$input,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$type_('text'),
																			$elm$html$Html$Attributes$id('booking-name'),
																			$elm$html$Html$Attributes$class('form-input'),
																			$elm$html$Html$Attributes$placeholder('Your name'),
																			$elm$html$Html$Attributes$value(model.bookingForm.name),
																			$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingFormName),
																			$elm$html$Html$Attributes$required(true)
																		]),
																	_List_Nil)
																])),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('form-group')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$label,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$for('booking-email'),
																			$elm$html$Html$Attributes$class('form-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Email')
																		])),
																	A2(
																	$elm$html$Html$input,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$type_('email'),
																			$elm$html$Html$Attributes$id('booking-email'),
																			$elm$html$Html$Attributes$class('form-input'),
																			$elm$html$Html$Attributes$placeholder('you@email.com'),
																			$elm$html$Html$Attributes$value(model.bookingForm.email),
																			$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingFormEmail),
																			$elm$html$Html$Attributes$required(true)
																		]),
																	_List_Nil)
																]))
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('form-group')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$label,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$for('booking-notes'),
																	$elm$html$Html$Attributes$class('form-label')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Special Requests')
																])),
															A2(
															$elm$html$Html$textarea,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$id('booking-notes'),
																	$elm$html$Html$Attributes$class('form-textarea'),
																	$elm$html$Html$Attributes$placeholder('Dietary requests, room adjustments, honeymoon notes...'),
																	$elm$html$Html$Attributes$value(model.bookingForm.notes),
																	$elm$html$Html$Events$onInput($author$project$Main$UpdateBookingFormNotes)
																]),
															_List_Nil)
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('wizard-actions')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('button'),
																	$elm$html$Html$Attributes$class('btn-wizard-prev'),
																	$elm$html$Html$Events$onClick(
																	$author$project$Main$SetBookingStep(2))
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('⮨ Dates & Guests')
																])),
															A2(
															$elm$html$Html$button,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$type_('submit'),
																	$elm$html$Html$Attributes$class('btn-book'),
																	$elm$html$Html$Attributes$id('booking-submit-btn'),
																	$elm$html$Html$Attributes$disabled(model.submittingBooking)
																]),
															_List_fromArray(
																[
																	model.submittingBooking ? A2(
																	$elm$html$Html$span,
																	_List_Nil,
																	_List_fromArray(
																		[
																			A2(
																			$elm$html$Html$span,
																			_List_fromArray(
																				[
																					$elm$html$Html$Attributes$class('spinner')
																				]),
																			_List_Nil),
																			$elm$html$Html$text(' Sending…')
																		])) : A2(
																	$elm$html$Html$span,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Send Inquiry '),
																			A3(
																			$elm$html$Html$node,
																			'svg',
																			_List_fromArray(
																				[
																					A2($elm$html$Html$Attributes$attribute, 'width', '14'),
																					A2($elm$html$Html$Attributes$attribute, 'height', '14'),
																					A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24'),
																					A2($elm$html$Html$Attributes$attribute, 'fill', 'none'),
																					A2($elm$html$Html$Attributes$attribute, 'stroke', 'currentColor'),
																					A2($elm$html$Html$Attributes$attribute, 'stroke-width', '2')
																				]),
																			_List_fromArray(
																				[
																					A3(
																					$elm$html$Html$node,
																					'line',
																					_List_fromArray(
																						[
																							A2($elm$html$Html$Attributes$attribute, 'x1', '5'),
																							A2($elm$html$Html$Attributes$attribute, 'y1', '12'),
																							A2($elm$html$Html$Attributes$attribute, 'x2', '19'),
																							A2($elm$html$Html$Attributes$attribute, 'y2', '12')
																						]),
																					_List_Nil),
																					A3(
																					$elm$html$Html$node,
																					'polyline',
																					_List_fromArray(
																						[
																							A2($elm$html$Html$Attributes$attribute, 'points', '12,5 19,12 12,19')
																						]),
																					_List_Nil)
																				]))
																		]))
																]))
														]))
												]))),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-price-summary')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$p,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('price-summary-title')
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('Inquiry Calculation Formula')
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('price-summary-table')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('price-summary-row')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			(dest.id === 'itinerary') ? 'Itinerary Combined Rate' : 'Sanctuary Base Rate')
																		])),
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-value')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			'$' + $elm$core$String$fromInt(basePrice))
																		]))
																])),
															((dest.id !== 'itinerary') && (suiteModifier > 0)) ? A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('price-summary-row')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Suite Level Upgrade')
																		])),
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-value')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			'+ $' + $elm$core$String$fromInt(suiteModifier))
																		]))
																])) : $elm$html$Html$text(''),
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('price-summary-row')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Travelers Multiplier')
																		])),
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-value')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			'× ' + $elm$core$String$fromInt(travelersInt))
																		]))
																])),
															((dest.id !== 'itinerary') && (seasonMultiplier !== 1.0)) ? A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('price-summary-row')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Seasonal Factor')
																		])),
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-value')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			'× ' + $elm$core$String$fromFloat(seasonMultiplier))
																		]))
																])) : $elm$html$Html$text(''),
															(addOnCost > 0) ? A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('price-summary-row')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Curator Add-ons')
																		])),
																	A2(
																	$elm$html$Html$span,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('formula-value')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			'+ $' + $elm$core$String$fromInt(addOnCost))
																		]))
																])) : $elm$html$Html$text('')
														])),
													A2(
													$elm$html$Html$hr,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('summary-break-line')
														]),
													_List_Nil),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('price-total-row')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$div,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('price-total-text')
																]),
															_List_fromArray(
																[
																	A2(
																	$elm$html$Html$p,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('total-label')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text('Estimated Cost')
																		])),
																	A2(
																	$elm$html$Html$p,
																	_List_fromArray(
																		[
																			$elm$html$Html$Attributes$class('total-sublabel')
																		]),
																	_List_fromArray(
																		[
																			$elm$html$Html$text(
																			'for ' + ($elm$core$String$fromInt(travelersInt) + (' guests · ' + dest.duration)))
																		]))
																])),
															A2(
															$elm$html$Html$p,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('total-amount')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	'$' + $elm$core$String$fromInt(priceCalculated))
																]))
														]))
												]))
										]))
								]))
						]))
				]));
	}
};
var $author$project$Main$renderProcess = function (model) {
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('process'),
				$author$project$Main$ariaLabel('How Voyager works')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('label reveal visible'),
								A2($elm$html$Html$Attributes$style, 'margin-bottom', '12px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('The Process')
							])),
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('heading-xl heading-dark reveal visible'),
								A2($elm$html$Html$Attributes$style, 'color', 'var(--gold)')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('How It Works')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('process-inner stagger-children visible'),
								$author$project$Main$role('list')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('process-step'),
										$author$project$Main$role('listitem')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-num')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('I')
											])),
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-title')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Tell us who you are')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-text')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Not where you want to go -- who you want to be when you get there. Our conversation covers mood, budget, travel style, and the details most agencies never ask.')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('process-step'),
										$author$project$Main$role('listitem')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-num')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('II')
											])),
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-title')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('We build your journey')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-text')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('A dedicated travel curator designs every element -- accommodation, timing, private experiences, and contingencies. You review, refine, approve. No templates.')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('process-step'),
										$author$project$Main$role('listitem')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-num')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('III')
											])),
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-title')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Arrive, be present')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('process-text')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Everything is handled. Your concierge is available 24/7 during your trip. All you need to do is pay attention to what\'s in front of you.')
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Main$renderSplitSections = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$section,
				_List_fromArray(
					[
						$author$project$Main$ariaLabel('Tropical escapes'),
						$elm$html$Html$Attributes$class('reveal visible')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('split-section')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('split-img-col')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('split-img'),
												$elm$html$Html$Attributes$src('https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85'),
												$elm$html$Html$Attributes$alt('Maldives overwater villa at sunset')
											]),
										_List_Nil)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('split-text-col cream')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('heading-label')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Destination')
											])),
										A2(
										$elm$html$Html$h2,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('heading-xl')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Fly Away to'),
												A2($elm$html$Html$br, _List_Nil, _List_Nil),
												$elm$html$Html$text('a Tropical Oasis')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('body-copy')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Arrive into a world of possibilities, indulgence, and unmatched luxury in the spectacular destinations where Voyager has crafted its properties for an extraordinary experience. Where turquoise waters meet white sand -- and time slows to a breath.')
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#discover'),
												$elm$html$Html$Attributes$class('cta-link')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Discover Our Destinations'),
												A3(
												$elm$html$Html$node,
												'svg',
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24'),
														A2($elm$html$Html$Attributes$attribute, 'stroke-width', '1.5'),
														A2($elm$html$Html$Attributes$attribute, 'stroke-linecap', 'round'),
														A2($elm$html$Html$Attributes$attribute, 'stroke-linejoin', 'round')
													]),
												_List_fromArray(
													[
														A3(
														$elm$html$Html$node,
														'line',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'x1', '5'),
																A2($elm$html$Html$Attributes$attribute, 'y1', '12'),
																A2($elm$html$Html$Attributes$attribute, 'x2', '19'),
																A2($elm$html$Html$Attributes$attribute, 'y2', '12')
															]),
														_List_Nil),
														A3(
														$elm$html$Html$node,
														'polyline',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'points', '12,5 19,12 12,19')
															]),
														_List_Nil)
													]))
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('split-price')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('split-price-from')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('From')
													])),
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('split-price-amount')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('$1,890')
													])),
												A2(
												$elm$html$Html$span,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('split-price-note')
													]),
												_List_fromArray(
													[
														$elm$html$Html$text('/ person')
													]))
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$section,
				_List_fromArray(
					[
						$author$project$Main$ariaLabel('Romantic experiences'),
						$elm$html$Html$Attributes$class('reveal visible')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('split-section reverse')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('split-img-col')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$img,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('split-img'),
												$elm$html$Html$Attributes$src('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85'),
												$elm$html$Html$Attributes$alt('Amalfi Coast cliffside at golden hour')
											]),
										_List_Nil)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('split-text-col navy')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('heading-label'),
												A2($elm$html$Html$Attributes$style, 'color', 'rgba(255,255,255,0.4)')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Romance')
											])),
										A2(
										$elm$html$Html$h2,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('heading-xl'),
												A2($elm$html$Html$Attributes$style, 'color', 'var(--gold-light)')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Rekindle Your'),
												A2($elm$html$Html$br, _List_Nil, _List_Nil),
												$elm$html$Html$text('Spirit at Golden Hour')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('body-copy'),
												A2($elm$html$Html$Attributes$style, 'color', 'rgba(255,255,255,0.58)')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Escape to the romantic backdrop of our tailored itineraries and rekindle your spirit among breathtaking sunsets, extensive culinary excellence, and the quiet luxury of places that know how to slow time down.')
											])),
										A2(
										$elm$html$Html$a,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$href('#discover'),
												$elm$html$Html$Attributes$class('cta-link'),
												A2($elm$html$Html$Attributes$style, 'color', 'var(--gold-light)')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Explore Romance Journeys'),
												A3(
												$elm$html$Html$node,
												'svg',
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24'),
														A2($elm$html$Html$Attributes$attribute, 'stroke-width', '1.5'),
														A2($elm$html$Html$Attributes$attribute, 'stroke-linecap', 'round'),
														A2($elm$html$Html$Attributes$attribute, 'stroke-linejoin', 'round')
													]),
												_List_fromArray(
													[
														A3(
														$elm$html$Html$node,
														'line',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'x1', '5'),
																A2($elm$html$Html$Attributes$attribute, 'y1', '12'),
																A2($elm$html$Html$Attributes$attribute, 'x2', '19'),
																A2($elm$html$Html$Attributes$attribute, 'y2', '12')
															]),
														_List_Nil),
														A3(
														$elm$html$Html$node,
														'polyline',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'points', '12,5 19,12 12,19')
															]),
														_List_Nil)
													]))
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Data$reviews = _List_fromArray(
	[
		{avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', date: 'September 2024', destination: 'Santorini', id: 1, location: 'Milan, Italy', name: 'Sofia Marchetti', rating: 5, text: 'Voyager curated every detail we never thought to ask for. Our private caldera suite, the surprise yacht picnic on day three  -  it felt like someone who actually loved travel had planned it, not an algorithm.', tripImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80'},
		{avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', date: 'April 2024', destination: 'Kyoto', id: 2, location: 'San Francisco, USA', name: 'Marcus Chen', rating: 5, text: 'Three days into Kyoto I stopped taking photos because I wanted to actually be there. The ryokan Voyager chose had a garden I\'d walk through in a hundred lifetimes. Worth every dollar.', tripImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80'},
		{avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80', date: 'August 2024', destination: 'Serengeti', id: 3, location: 'London, UK', name: 'Amara Osei', rating: 5, text: 'Watching 10,000 wildebeest cross the Mara River from our private vehicle... I ugly-cried. The Voyager guide knew exactly where to position us. I\'ve booked my second safari already.', tripImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=700&q=80'}
	]);
var $author$project$Main$renderStories = function (model) {
	var renderReview = function (story) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('story-card reveal visible'),
					$author$project$Main$role('listitem')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('story-img-wrap')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('story-img'),
									$elm$html$Html$Attributes$src(story.tripImage),
									$elm$html$Html$Attributes$alt(story.destination)
								]),
							_List_Nil)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('story-content')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('story-dest label')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(story.destination)
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('story-text')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(story.text)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('story-author')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$img,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('story-avatar'),
											$elm$html$Html$Attributes$src(story.avatar),
											$elm$html$Html$Attributes$alt(story.name)
										]),
									_List_Nil),
									A2(
									$elm$html$Html$div,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('story-name')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(story.name)
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('story-location')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(story.location)
												]))
										]))
								]))
						]))
				]));
	};
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('stories'),
				$author$project$Main$ariaLabel('Traveler stories')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('label reveal visible'),
								A2($elm$html$Html$Attributes$style, 'margin-bottom', '12px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Real Travelers')
							])),
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('heading-xl heading-dark reveal visible'),
								A2($elm$html$Html$Attributes$style, 'color', 'var(--gold)')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Not Reviews.'),
								A2($elm$html$Html$br, _List_Nil, _List_Nil),
								$elm$html$Html$text('Stories.')
							])),
						A2(
						$elm$html$Html$p,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('body-copy reveal visible'),
								A2($elm$html$Html$Attributes$style, 'margin-top', '14px'),
								A2($elm$html$Html$Attributes$style, 'max-width', '440px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Every testimonial comes with the photo taken on the trip we planned.')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('stories-grid stagger-children visible'),
								$elm$html$Html$Attributes$id('stories-grid'),
								$author$project$Main$role('list'),
								$author$project$Main$ariaLabel('Traveler reviews')
							]),
						A2($elm$core$List$map, renderReview, $author$project$Data$reviews))
					]))
			]));
};
var $author$project$Main$renderToast = function (model) {
	var _v0 = model.toast;
	if (_v0.$ === 'Nothing') {
		return $elm$html$Html$text('');
	} else {
		var textStr = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('toast visible'),
					$elm$html$Html$Attributes$id('toast'),
					$author$project$Main$role('status')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('toast-icon')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('✦')
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('toast-text')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(textStr)
						]))
				]));
	}
};
var $author$project$Main$ClearTrip = {$: 'ClearTrip'};
var $author$project$Main$RemoveFromTrip = function (a) {
	return {$: 'RemoveFromTrip', a: a};
};
var $author$project$Main$ToggleTripPanel = {$: 'ToggleTripPanel'};
var $author$project$Main$ariaExpanded = function (valueStr) {
	return A2($elm$html$Html$Attributes$attribute, 'aria-expanded', valueStr);
};
var $author$project$Main$renderTripPanel = function (model) {
	var tripDests = A2(
		$elm$core$List$filterMap,
		function (id) {
			return $elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (d) {
						return _Utils_eq(d.id, id);
					},
					$author$project$Data$destinations));
		},
		model.itinerary);
	var totalCost = A3(
		$elm$core$List$foldl,
		F2(
			function (d, acc) {
				return acc + d.price;
			}),
		0,
		tripDests);
	var renderTripItem = function (dest) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('trip-item'),
					A2($elm$html$Html$Attributes$attribute, 'role', 'listitem')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$img,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('trip-item-img'),
							$elm$html$Html$Attributes$src(dest.image),
							$elm$html$Html$Attributes$alt(dest.name)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('trip-item-name')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(dest.name)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('trip-item-country')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(dest.country)
								]))
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('trip-item-remove'),
							$elm$html$Html$Events$onClick(
							$author$project$Main$RemoveFromTrip(dest.id)),
							$elm$html$Html$Attributes$title('Remove')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('✕')
						]))
				]));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$id('trip-panel'),
				$elm$html$Html$Attributes$class(
				model.isTripPanelOpen ? 'open' : '')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('trip-panel-handle'),
						$elm$html$Html$Attributes$id('trip-panel-handle'),
						$author$project$Main$ariaExpanded(
						model.isTripPanelOpen ? 'true' : 'false'),
						$elm$html$Html$Events$onClick($author$project$Main$ToggleTripPanel)
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('trip-panel-handle-text')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Your Trip')
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('trip-panel-handle-badge'),
								$elm$html$Html$Attributes$id('trip-count-badge')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt(
									$elm$core$List$length(model.itinerary)))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('trip-panel-inner'),
						$elm$html$Html$Attributes$id('trip-panel-inner')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('trip-panel-left')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$p,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('trip-panel-title')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Your Itinerary')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('trip-items'),
										$elm$html$Html$Attributes$id('trip-items'),
										$author$project$Main$role('list')
									]),
								A2($elm$core$List$map, renderTripItem, tripDests)),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn-ghost'),
										$elm$html$Html$Attributes$id('trip-clear-btn'),
										$elm$html$Html$Events$onClick($author$project$Main$ClearTrip)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Clear all')
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('trip-panel-right')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('trip-total')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('trip-total-label')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Estimated total')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('trip-total-amount'),
												$elm$html$Html$Attributes$id('trip-total')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												'$' + $elm$core$String$fromInt(totalCost))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('trip-total-note')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('per person · varies by date')
											]))
									])),
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('btn-primary'),
										$elm$html$Html$Attributes$id('trip-inquiry-btn'),
										$elm$html$Html$Events$onClick(
										$author$project$Main$OpenModal('itinerary'))
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$span,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text('Send Inquiry '),
												A3(
												$elm$html$Html$node,
												'svg',
												_List_fromArray(
													[
														A2($elm$html$Html$Attributes$attribute, 'width', '14'),
														A2($elm$html$Html$Attributes$attribute, 'height', '14'),
														A2($elm$html$Html$Attributes$attribute, 'viewBox', '0 0 24 24'),
														A2($elm$html$Html$Attributes$attribute, 'fill', 'none'),
														A2($elm$html$Html$Attributes$attribute, 'stroke', 'currentColor'),
														A2($elm$html$Html$Attributes$attribute, 'stroke-width', '2')
													]),
												_List_fromArray(
													[
														A3(
														$elm$html$Html$node,
														'line',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'x1', '5'),
																A2($elm$html$Html$Attributes$attribute, 'y1', '12'),
																A2($elm$html$Html$Attributes$attribute, 'x2', '19'),
																A2($elm$html$Html$Attributes$attribute, 'y2', '12')
															]),
														_List_Nil),
														A3(
														$elm$html$Html$node,
														'polyline',
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$attribute, 'points', '12,5 19,12 12,19')
															]),
														_List_Nil)
													]))
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('app-root')
			]),
		_List_fromArray(
			[
				$author$project$Main$renderHeader(model),
				$author$project$Main$renderMobileNav(model),
				$author$project$Main$renderHero(model),
				$author$project$Main$renderBookingBar(model),
				$author$project$Main$renderIntro(model),
				$author$project$Main$renderSplitSections(model),
				$author$project$Main$renderDiscover(model),
				$author$project$Main$renderFeaturedMosaic(model),
				$author$project$Main$renderExperiences(model),
				$author$project$Main$renderInsiderPickSection(model),
				$author$project$Main$renderProcess(model),
				$author$project$Main$renderStories(model),
				$author$project$Main$renderJoinCTA(model),
				$author$project$Main$renderFooter(model),
				$author$project$Main$renderModal(model),
				$author$project$Main$renderTripPanel(model),
				$author$project$Main$renderConfirmModal(model),
				$author$project$Main$renderToast(model)
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: function (_v0) {
			return _Utils_Tuple2($author$project$Main$initialModel, $elm$core$Platform$Cmd$none);
		},
		subscriptions: $author$project$Main$subscriptions,
		update: $author$project$Main$update,
		view: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));