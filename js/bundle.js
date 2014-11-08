require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./js/main":[function(require,module,exports){
var stylecow = require('stylecow');

module.exports = function (code, plugins, support) {
	stylecow.setConfig({
		support: support,
		plugins: plugins,
	});

	return stylecow.convert(code).toString();
}

},{"stylecow":51}],1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
var color = {
	namedHues: {
		'red': 0,
		'orangish red': 7.5,
		'red orange': 15,
		'orange red': 15,
		'reddish orange': 22.5,
		'orange': 30,
		'yellowish orange': 37.5,
		'orange yellow': 45,
		'yellow orange': 45,
		'orangish yellow': 52.5,
		'yellow': 60,
		'greenish yellow': 75,
		'yellow green': 90,
		'green yellow': 90,
		'yellowish green': 105,
		'green': 120,
		'bluish green': 150,
		'green blue': 180,
		'blue green': 180,
		'greenish blue': 210,
		'blue': 240,
		'purplish blue': 255,
		'blue purple': 270,
		'purple blue': 270,
		'bluish purple': 285,
		'purple': 300,
		'reddish purple': 315,
		'red purple': 330,
		'purple red': 330,
		'purplish red': 345
	},

	names: {
		'aliceblue': '#F0F8FF',
		'antiquewhite': '#FAEBD7',
		'aqua': '#00FFFF',
		'aquamarine': '#7FFFD4',
		'azure': '#F0FFFF',
		'beige': '#F5F5DC',
		'bisque': '#FFE4C4',
		'black': '#000000',
		'blanchedalmond': '#FFEBCD',
		'blue': '#0000FF',
		'blueviolet': '#8A2BE2',
		'brown': '#A52A2A',
		'burlywood': '#DEB887',
		'cadetblue': '#5F9EA0',
		'chartreuse': '#7FFF00',
		'chocolate': '#D2691E',
		'coral': '#FF7F50',
		'cornflowerblue': '#6495ED',
		'cornsilk': '#FFF8DC',
		'crimson': '#DC143C',
		'cyan': '#00FFFF',
		'darkblue': '#00008B',
		'darkcyan': '#008B8B',
		'darkgoldenrod': '#B8860B',
		'darkgray': '#A9A9A9',
		'darkgrey': '#A9A9A9',
		'darkgreen': '#006400',
		'darkkhaki': '#BDB76B',
		'darkmagenta': '#8B008B',
		'darkolivegreen': '#556B2F',
		'darkorange': '#FF8C00',
		'darkorchid': '#9932CC',
		'darkred': '#8B0000',
		'darksalmon': '#E9967A',
		'darkseagreen': '#8FBC8F',
		'darkslateblue': '#483D8B',
		'darkslategray': '#2F4F4F',
		'darkslategrey': '#2F4F4F',
		'darkturquoise': '#00CED1',
		'darkviolet': '#9400D3',
		'deeppink': '#FF1493',
		'deepskyblue': '#00BFFF',
		'dimgray': '#696969',
		'dimgrey': '#696969',
		'dodgerblue': '#1E90FF',
		'firebrick': '#B22222',
		'floralwhite': '#FFFAF0',
		'forestgreen': '#228B22',
		'fuchsia': '#FF00FF',
		'gainsboro': '#DCDCDC',
		'ghostwhite': '#F8F8FF',
		'gold': '#FFD700',
		'goldenrod': '#DAA520',
		'gray': '#80808@0',
		'grey': '#808080',
		'green': '#008000',
		'greenyellow': '#ADFF2F',
		'honeydew': '#F0FFF0',
		'hotpink': '#FF69B4',
		'indianred ': '#CD5C5C',
		'indigo ': '#4B0082',
		'ivory': '#FFFFF0',
		'khaki': '#F0E68C',
		'lavender': '#E6E6FA',
		'lavenderblush': '#FFF0F5',
		'lawngreen': '#7CFC00',
		'lemonchiffon': '#FFFACD',
		'lightblue': '#ADD8E6',
		'lightcoral': '#F08080',
		'lightcyan': '#E0FFFF',
		'lightgoldenrodyellow': '#FAFAD2',
		'lightgray': '#D3D3D3',
		'lightgrey': '#D3D3D3',
		'lightgreen': '#90EE90',
		'lightpink': '#FFB6C1',
		'lightsalmon': '#FFA07A',
		'lightseagreen': '#20B2AA',
		'lightskyblue': '#87CEFA',
		'lightslategray': '#778899',
		'lightslategrey': '#778899',
		'lightsteelblue': '#B0C4DE',
		'lightyellow': '#FFFFE0',
		'lime': '#00FF00',
		'limegreen': '#32CD32',
		'linen': '#FAF0E6',
		'magenta': '#FF00FF',
		'maroon': '#800000',
		'mediumaquamarine': '#66CDAA',
		'mediumblue': '#0000CD',
		'mediumorchid': '#BA55D3',
		'mediumpurple': '#9370D8',
		'mediumseagreen': '#3CB371',
		'mediumslateblue': '#7B68EE',
		'mediumspringgreen': '#00FA9A',
		'mediumturquoise': '#48D1CC',
		'mediumvioletred': '#C71585',
		'midnightblue': '#191970',
		'mintcream': '#F5FFFA',
		'mistyrose': '#FFE4E1',
		'moccasin': '#FFE4B5',
		'navajowhite': '#FFDEAD',
		'navy': '#000080',
		'oldlace': '#FDF5E6',
		'olive': '#808000',
		'olivedrab': '#6B8E23',
		'orange': '#FFA500',
		'orangered': '#FF4500',
		'orchid': '#DA70D6',
		'palegoldenrod': '#EEE8AA',
		'palegreen': '#98FB98',
		'paleturquoise': '#AFEEEE',
		'palevioletred': '#D87093',
		'papayawhip': '#FFEFD5',
		'peachpuff': '#FFDAB9',
		'peru': '#CD853F',
		'pink': '#FFC0CB',
		'plum': '#DDA0DD',
		'powderblue': '#B0E0E6',
		'purple': '#800080',
		'red': '#FF0000',
		'rebeccapurple': '#663399',
		'rosybrown': '#BC8F8F',
		'royalblue': '#4169E1',
		'saddlebrown': '#8B4513',
		'salmon': '#FA8072',
		'sandybrown': '#F4A460',
		'seagreen': '#2E8B57',
		'seashell': '#FFF5EE',
		'sienna': '#A0522D',
		'silver': '#C0C0C0',
		'skyblue': '#87CEEB',
		'slateblue': '#6A5ACD',
		'slategray': '#708090',
		'slategrey': '#708090',
		'snow': '#FFFAFA',
		'springgreen': '#00FF7F',
		'steelblue': '#4682B4',
		'tan': '#D2B48C',
		'teal': '#008080',
		'thistle': '#D8BFD8',
		'tomato': '#FF6347',
		'turquoise': '#40E0D0',
		'violet': '#EE82EE',
		'wheat': '#F5DEB3',
		'white': '#FFFFFF',
		'whitesmoke': '#F5F5F5',
		'yellow': '#FFFF00',
		'yellowgreen': '#9ACD32'
	},


	// hex: 00000000-FFFFFFFF
	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	HEX_RGBA: function (hex) {
		var r,g,b,a;

		switch (hex.length) {
			case 3:
				r = hex[0] + hex[0];
				g = hex[1] + hex[1];
				b = hex[2] + hex[2];
				a = 'ff';
				break;

			case 4:
				r = hex[0] + hex[0];
				g = hex[1] + hex[1];
				b = hex[2] + hex[2];
				a = hex[3] + hex[3];
				break;

			case 6:
				r = hex[0] + hex[1];
				g = hex[2] + hex[3];
				b = hex[4] + hex[5];
				a = 'ff';
				break;

			case 8:
				r = hex[0] + hex[1];
				g = hex[2] + hex[3];
				b = hex[4] + hex[5];
				a = hex[6] + hex[7];
				break;
		}

		return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), number(parseInt(a, 16) / 255, 1)];
	},


	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	// hex: 000000-FFFFFF
	RGBA_HEX: function (rgba) {
		var r = ((rgba[0] > 255) ? 255 : (rgba[0] < 0 ? 0 : rgba[0])).toString(16),
			g = ((rgba[1] > 255) ? 255 : (rgba[1] < 0 ? 0 : rgba[1])).toString(16),
			b = ((rgba[2] > 255) ? 255 : (rgba[2] < 0 ? 0 : rgba[2])).toString(16);

		if (r.length === 1) {
			r = '0' + r;
		}
		if (g.length === 1) {
			g = '0' + g;
		}
		if (b.length === 1) {
			b = '0' + b;
		}

		return (r + g + b).toUpperCase();
	},


	// gray: 0-255 / 0-1
	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	GRAY_RGBA: function (gray) {
		return [gray[0], gray[0], gray[0], gray[1]];
	},


	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	// hsla: 0-360 / 0-100 / 0-100 / 0-1
	RGBA_HSLA: function (rgba) {
		var r = rgba[0] / 255,
			g = rgba[1] / 255,
			b = rgba[2] / 255,
			a = rgba[3],
			min = Math.min(r, g, b),
			max = Math.max(r, g, b),
			delta = max - min,
			l = (max + min) / 2,
			h,
			s;

		if (delta === 0) {
			h = 0;
			s = 0;
		} else {
			if (l < 0.5) {
				s = delta / (max + min);
			} else {
				s = delta / (2 - max - min);
			}

			var delta_r = (((max - r) / 6) + (delta / 2)) / delta;
			var delta_g = (((max - g) / 6) + (delta / 2)) / delta;
			var delta_b = (((max - b) / 6) + (delta / 2)) / delta;

			if (r === max) {
				h = delta_b - delta_g;
			} else if (g === max) {
				h = (1 / 3) + delta_r - delta_b;
			} else if (b === max) {
				h = (2 / 3) + delta_g - delta_r;
			}

			if (h < 0) {
				h += 1;
			}

			if (h > 1) {
				h -= 1;
			}
		}

		return [Math.round(h * 360), (s.toFixed(2) * 100), (l.toFixed(2) * 100), a];
	},


	// hsla: 0-360 / 0-100 / 0-100 / 0-1
	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	HSLA_RGBA: function (hsla) {
		var h = hsla[0],
			s = hsla[1]/100,
			l = hsla[2]/100,
			a = hsla[3],
			r,
			g,
			b;

		if (h > 0) {
			h /= 360;
		}

		if (s === 0) {
			r = l;
			g = l;
			b = l;
		} else {
			var t1, t2, rt3, gt3, bt3;

			if (l < 0.5) {
				t2 = l * (1.0 + s);
			} else {
				t2 = (l + s) - (l * s);
			}

			t1 = 2.0 * l - t2;

			rt3 = h + 1.0/3.0;
			gt3 = h;
			bt3 = h - 1.0/3.0;

			if (rt3 < 0) {
				rt3 += 1.0;
			}
			if (rt3 > 1) {
				rt3 -= 1.0;
			}
			if (gt3 < 0) {
				gt3 += 1.0;
			}
			if (gt3 > 1) {
				gt3 -= 1.0;
			}
			if (bt3 < 0) {
				bt3 += 1.0;
			}
			if (bt3 > 1) {
				bt3 -= 1.0;
			}

			if (6.0 * rt3 < 1) {
				r = t1 + (t2 - t1) * 6.0 * rt3;
			} else if (2.0 * rt3 < 1) {
				r = t2;
			} else if (3.0 * rt3 < 2) {
				r = t1 + (t2 - t1) * ((2.0/3.0) - rt3) * 6.0;
			} else {
				r = t1;
			}

			if (6.0 * gt3 < 1) {
				g = t1 + (t2 - t1) * 6.0 * gt3;
			} else if (2.0 * gt3 < 1) {
				g = t2;
			} else if (3.0 * gt3 < 2) {
				g = t1 + (t2 - t1) * ((2.0/3.0) - gt3) * 6.0;
			} else {
				g = t1;
			}

			if (6.0 * bt3 < 1) {
				b = t1 + (t2 - t1) * 6.0 * bt3;
			} else if (2.0 * bt3 < 1) {
				b = t2;
			} else if (3.0 * bt3 < 2) {
				b = t1 + (t2 - t1) * ((2.0/3.0) - bt3) * 6.0;
			} else {
				b = t1;
			}
		}

		r = Math.round(255 * r);
		g = Math.round(255 * g);
		b = Math.round(255 * b);

		return [r, g, b, a];
	},


	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	// hwba: 0-360 / 0-100 / 0-100 / 0-1
	RGBA_HWBA: function (rgba) {
		var r = rgba[0],
			g = rgba[1],
			b = rgba[2],
			a = rgba[3],
			h = color.RGBA_HSLA(rgba)[0],
			w = 1/255 * Math.min(r, Math.min(g, b)),
			b = 1 - 1/255 * Math.max(r, Math.max(g, b));

		w = Math.round(100 * w);
		b = Math.round(100 * b);

		return [h, w, b, a];
	},


	// hwba: 0-360 / 0-100 / 0-100 / 0-1
	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	HWBA_RGBA: function (hwba) {
		var h = hwba[0] / 360,
			wh = hwba[1] / 100,
			bl = hwba[2] / 100,
			ratio = wh + bl,
			i, v, f, n;

		if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		}

		i = Math.floor(6 * h);
		v = 1 - bl;
		f = 6 * h - i;

		if ((i & 0x01) != 0) {
			f = 1 - f;
		}

		n = wh + f * (v - wh);

		switch (i) {
			default:
			case 6:
			case 0:
				r = v;
				g = n;
				b = wh;
				break;

			case 1:
				r = n;
				g = v;
				b = wh;
				break;

			case 2:
				r = wh;
				g = v;
				b = n;
				break;

			case 3:
				r = wh;
				g = n;
				b = v;
				break;

			case 4:
				r = n;
				g = wh;
				b = v;
				break;

			case 5:
				r = v;
				g = wh;
				b = n;
				break;
		}

		r = Math.round(255 * r);
		g = Math.round(255 * g);
		b = Math.round(255 * b);

		return [r, g, b, hwba[3]];
	},


	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	toRGBA: function (value, method) {
		if ((typeof value === 'object') && value.type !== undefined) {
			if (value.type === 'Function') {
				return color.toRGBA(value.getValue(), value.name);
			}
			
			return color.toRGBA(value.name);
		}

		if (typeof value === 'string') {
			if (value[0] === '#') {
				return color.HEX_RGBA(value.substr(1));
			}
			if (value.toLowerCase() === 'transparent') {
				return [0, 0, 0, 0];
			}
			if (color.names[value.toLowerCase()]) {
				return color.HEX_RGBA(color.names[value.toLowerCase()].substr(1));
			}
			if (color.namedHues[value.toLowerCase()] !== undefined) {
				return color.HSLA_RGBA([color.namedHues[value.toLowerCase()], 100, 50, 1]);
			}
		}

		switch (method) {
			case 'rgb':
			case 'rgba':
				if (value[3] === undefined) {
					value[3] = 1;
				}

				return [number(value[0], 255), number(value[1], 255), number(value[2], 255), number(value[3], 1)];

			case 'hsl':
			case 'hsla':
				if (value[3] === undefined) {
					value[3] = 1;
				}

				if (color.namedHues[value[0].toLowerCase()] !== undefined) {
					value[0] = color.namedHues[value[0].toLowerCase()];
				}

				return color.HSLA_RGBA([parseInt(value[0]), number(value[2], 100), number(value[3], 100), number(value[4], 1)]);

			case 'hwb':
			case 'hwba':
				if (value[3] === undefined) {
					value[3] = 1;
				}

				if (color.namedHues[value[0].toLowerCase()] !== undefined) {
					value[0] = color.namedHues[value[0].toLowerCase()];
				}

				return color.HWBA_RGBA([parseInt(value[0]), number(value[2], 100), number(value[3], 100), number(value[4], 1)]);

			case 'gray':
				if (value[1] === undefined) {
					value[1] = 1;
				}

				return color.GRAY_RGBA([number(value[0], 255), number(value[1], 1)]);
		}

		return [0, 0, 0, 1];
	}
};


function number (color, max) {
	if (typeof color === 'string') {
		if (color.indexOf('%') !== -1) {
			color = ((max / 100) * parseFloat(color, 10));
		} else {
			color = parseFloat(color, 10);
		}
	}

	if (max === 1) {
		color = parseFloat(color.toFixed(2));
	} else {
		color = Math.round(color);
	}

	if (color > max) {
		return max;
	}

	if (color < 0) {
		return 0;
	}

	return color;
}


module.exports = color;

},{}],3:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Normalizes the calc function

	stylecow.addTask({
		"Function": {
			calc: function (fn) {
				var keyword = fn[0];
				keyword.name = keyword.name.replace(/([\w\%])\s*([\+\-])\s*/g, '$1 $2 ');
			}
		}
	});
};

},{}],4:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Add the old syntax of rect()

	stylecow.addTask({
		disable: {
			explorer: 8.0
		},
		"Function": {
			rect: function (fn) {
				var declaration = fn.parent({type: 'Declaration', name: 'clip'});

				if (declaration) {
					declaration.after('*clip: rect(' + fn.join(' ') + ')');
				}
			}
		}
	});
};

},{}],5:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds support of break-before, break-after, break-inside in webkit using the non-standard -webkit-column-break-
	stylecow.addTask({
		disable: {
			chrome: 21.0,
			safari: 6.1,
			android: 4.4,
			ios: 7.0
		},
		Declaration: function (declaration) {
			if (declaration.is({
				name: ['break-before', 'break-after', 'break-inside'],
				value: 'column'
			})) {
				declaration.before('-webkit-column-' + declaration.name + ':always');
			}
		}
	});
};

},{}],6:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Fix the double margin bug in ie6 on float block elements

	stylecow.addTask({
		disable: {
			explorer: 7.0
		},
		Declaration: {
			float: function (declaration) {
				if (declaration.is({
					value: ['left', 'right']
				})) {
					declaration.after('_display: inline');
				}
			}
		}
	});
};

},{}],7:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds support in explorer < 8

	stylecow.addTask({
		disable: {
			explorer: 8.0
		},
		Declaration: {
			display: function (declaration) {
				if (declaration.is({
					value: 'inline-block'
				})) {
					declaration.after(new stylecow.Declaration('*zoom')).setContent('1');
					declaration.after(new stylecow.Declaration('*display')).setContent('inline');
				}
			}
		}
	});
};

},{}],8:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds support in explorer < 8

	stylecow.addTask({
		disable: {
			explorer: 7.0
		},
		Declaration: {
			'min-height': function (declaration) {
				declaration.before('_height:' + declaration.value);
			}
		}
	});
};

},{}],9:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds support in explorer < 9

	stylecow.addTask({
		disable: {
			explorer: 9.0
		},
		Declaration: {
			opacity: function (declaration) {
				var rule = declaration.parent({type: 'Rule'});

				if (rule) {
					rule.addOldMsFilter('alpha(opacity=' + (parseFloat(declaration.value, 10) * 100) + ')');
				}
			}
		}
	});
};

},{}],10:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Convert two-colon pseudoelements to one-colon for explorer < 9

	stylecow.addTask({
		disable: {
			explorer: 9.0
		},
		Keyword: {
			"::after": function (keyword) {
				keyword.name = ':after';
			},
			"::before": function (keyword) {
				keyword.name = ':before';
			},
			"::first-line": function (keyword) {
				keyword.name = ':first-line';
			},
			"::first-letter": function (keyword) {
				keyword.name = ':first-letter';
			}
		}
	});
};

},{}],11:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//add ie9 fallback that support vm instead vmin

	stylecow.addTask({
		disable: {
			explorer: 10.0
		},
		Declaration: function (declaration) {
			if (declaration.getContent().join(', ').indexOf('vmin') !== -1) {
				var clone = declaration.cloneBefore();

				clone.search({
					type: 'Keyword',
					name: /([0-9\.]+)vmin/
				}).forEach(function (keyword) {
					keyword.name = keyword.name.slice(0, -2);
				});
				clone.vendor = 'ms';
			}
		}
	});
};

},{}],12:[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^animation/})) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			},
			NestedAtRule: {
				"keyframes": function (atrule) {
					atrule.cloneBefore().name = '-moz-' + atrule.name;
				}
			}
		},

		//Adds -o- vendor prefixes
		{
			disable: {
				opera: 12.1
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^animation/})) {
					declaration.cloneBefore().name = '-o-' + declaration.name;
				}
			},
			NestedAtRule: {
				"keyframes": function (atrule) {
					atrule.cloneBefore().name = '-o-' + atrule.name;
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^animation/})) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			},
			NestedAtRule: {
				"keyframes": function (atrule) {
					atrule.cloneBefore().name = '-webkit-' + atrule.name;
				}
			}
		}
	]);
};

},{}],13:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: false
			},
			Declaration: {
				"appearance": function (declaration) {
					declaration.cloneBefore().name = '-moz-appearance';
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: {
				"appearance": function (declaration) {
					declaration.cloneBefore().name = '-webkit-appearance';
				}
			}
		}
	]);
};

},{}],14:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: 4.0
			},
			Declaration: {
				"background-size": function (declaration) {
					declaration.cloneBefore().name = '-moz-background-size';
				},
				"background-clip": function (declaration) {
					declaration.cloneBefore().name = '-moz-background-clip';
				},
				"background-origin": function (declaration) {
					declaration.cloneBefore().name = '-moz-background-origin';
				}
			}
		},

		//Adds -o- vendor prefixes
		{
			disable: {
				opera: 10.5
			},
			Declaration: {
				"background-size": function (declaration) {
					declaration.cloneBefore().name = '-o-background-size';
				},
				"background-clip": function (declaration) {
					declaration.cloneBefore().name = '-o-background-clip';
				},
				"background-origin": function (declaration) {
					declaration.cloneBefore().name = '-o-background-origin';
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				android: 3.0
			},
			Declaration: {
				"background-size": function (declaration) {
					declaration.cloneBefore().name = '-webkit-background-size';
				},
				"background-clip": function (declaration) {
					declaration.cloneBefore().name = '-webkit-background-clip';
				},
				"background-origin": function (declaration) {
					declaration.cloneBefore().name = '-webkit-background-origin';
				}
			}
		}
	]);
};

},{}],15:[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([
		//Fix old syntax in firefox <13 in border-radius
		{
			disable: {
				firefox: 13.0
			},
			Declaration: {
				'border-top-left-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius-topleft';
				},
				'border-top-right-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius-topright';
				},
				'border-bottom-left-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius-bottomleft';
				},
				'border-bottom-right-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius-bottomright';
				}
			}
		},

		//Adds -moz- vendor prefix to border-radius
		{
			disable: {
				firefox: 4.0
			},
			Declaration: {
				'border-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius';
				}
			}
		},

		//Adds -webkit- vendor prefix to border-radius
		{
			disable: { 
				chrome: 5.0,
				safari: 5.0,
				ios: 4.0,
				android: 2.2
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^border-.*radius$/})) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		//Adds -webkit- vendor prefix to border-start,end,after,before
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^border-(start|end|after|before)/})) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		//Adds -moz- vendor prefix to border-start,end
		{
			disable: { 
				firefox: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^border-(start|end)/})) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		//Adds -moz- vendor prefix to border-image
		{
			disable: { 
				firefox: 15.0
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^border-image/})) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		//Adds -o- vendor prefix to border-image
		{
			disable: { 
				opera: 15.0
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^border-image/})) {
					declaration.cloneBefore().name = '-o-' + declaration.name;
				}
			}
		},

		//Adds -webkit- vendor prefix to border-image
		{
			disable: { 
				chrome: 16.0,
				safari: 6.0,
				android: 4.4
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^border-image/})) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		}
	]);
};

},{}],16:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: 4.0
			},
			Declaration: {
				"box-shadow": function (declaration) {
					declaration.cloneBefore().name = '-moz-box-shadow';
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: 10.0,
				safari: 5.1,
				ios: 5.0,
				android: 4.0
			},
			Declaration: {
				"box-shadow": function (declaration) {
					declaration.cloneBefore().name = '-webkit-box-shadow';
				}
			}
		}
	]);
};

},{}],17:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: 29.0
			},
			Declaration: {
				"box-sizing": function (declaration) {
					declaration.cloneBefore().name = '-moz-box-sizing';
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: 10.0,
				safari: 5.1,
				ios: 5.0,
				android: 4.0
			},
			Declaration: {
				"box-sizing": function (declaration) {
					declaration.cloneBefore().name = '-webkit-box-sizing';
				}
			}
		}
	]);
};

},{}],18:[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([
		//Adds -moz- vendor prefix
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.has({type: 'Function', name: 'calc'})) {
					declaration.cloneBefore().search({type: 'Function', name: 'calc'}).forEach(function (fn) {
						fn.name = '-moz-' + fn.name;
					});
				}
			}
		},

		//Adds -webkit- vendor prefix
		{
			disable: {
				chrome: 26.0,
				safari: 6.1,
				ios: 7.0
			},
			Declaration: function (declaration) {
				if (declaration.has({type: 'Function', name: 'calc'})) {
					declaration.cloneBefore().search({type: 'Function', name: 'calc'}).forEach(function (fn) {
						fn.name = '-webkit-' + fn.name;
					});
				}
			}
		}
	]);
};

},{}],19:[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([
		// Adds -moz- vendor prefixes
		{
			disable: {
				firefox: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^column/})) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		// Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^column/})) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		}
	]);
};

},{}],20:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefix to cursor: zoom-in / zoom-out
		{
			disable: {
				firefox: 24.0
			},
			Declaration: {
				'cursor': function (declaration) {
					if (declaration.has({type: 'Keyword', name: ['zoom-in', 'zoom-out']})) {
						declaration.cloneBefore().search({type: 'Keyword', name: ['zoom-in', 'zoom-out']}).forEach(function (keyword) {
							keyword.name = '-moz-' + keyword;
						});
					}
				}
			}
		},

		//Adds -moz- vendor prefix to cursor: grab / grabbing
		{
			disable: {
				firefox: 27.0
			},
			Declaration: {
				'cursor': function (declaration) {
					if (declaration.has({type: 'Keyword', name: ['grab', 'grabbing']})) {
						declaration.cloneBefore().search({type: 'Keyword', name: ['grab', 'grabbing']}).forEach(function (keyword) {
							keyword.name = '-moz-' + keyword;
						});
					}
				}
			}
		},

		//Adds -webkit- vendor prefix to some cursor values
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: {
				'cursor': function (declaration) {
					if (declaration.has({type: 'Keyword', name: ['zoom-in', 'zoom-out', 'grab', 'grabbing']})) {
						declaration.cloneBefore().search({type: 'Keyword', name: ['zoom-in', 'zoom-out', 'grab', 'grabbing']}).forEach(function (keyword) {
							keyword.name = '-webkit-' + keyword;
						});
					}
				}
			}
		}
	]);
};

},{}],21:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -moz- vendor prefix

	stylecow.addTask({
		disable: {
			firefox: false
		},
		NestedAtRule: {
			"document": function (atrule) {
				atrule.cloneBefore().name = '-moz-document';
			}
		}
	});
};

},{}],22:[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([
		//Adds -moz-full-screen vendor prefix
		{
			disable: {
				firefox: false
			},
			Rule: function (rule) {
				if (rule.has({type: 'Keyword', name: ':fullscreen'})) {
					rule.cloneBefore().search({type: 'Keyword', name: ':fullscreen'}).forEach(function (keyword) {
						keyword.name = ':-moz-full-screen';
					});
				}
			}
		},

		//Adds -webkit-full-screen vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Rule: function (rule) {
				if (rule.has({type: 'Keyword', name: ':fullscreen'})) {
					rule.cloneBefore().search({type: 'Keyword', name: ':fullscreen'}).forEach(function (keyword) {
						keyword.name = ':-webkit-full-screen';
					});
				}
			}
		},

		//Adds -ms-fullscreen vendor prefix
		{
			disable: {
				explorer: false
			},
			Rule: function (rule) {
				if (rule.has({type: 'Keyword', name: ':fullscreen'})) {
					rule.cloneBefore().search({type: 'Keyword', name: ':fullscreen'}).forEach(function (keyword) {
						keyword.name = ':-ms-fullscreen';
					});
				}
			}
		}
	]);
};

},{}],23:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -ms- vendor prefix

	stylecow.addTask({
		disable: {
			explorer: false
		},
		Declaration: function (declaration) {
			if (declaration.is({name: 'display', value: 'grid'})) {
				return declaration.cloneBefore().value = '-ms-grid';
			}

			if (declaration.is({name: /^grid.*$/})) {
				return declaration.cloneBefore().name = '-ms-' + declaration.name;
			}
		}
	});
};

},{}],24:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -moz- vendor prefix

	stylecow.addTask({
		disable: {
			firefox: 3.0
		},
		Declaration: {
			display: function (declaration) {
				if (declaration.is({value: 'inline-block'})) {
					declaration.cloneAfter().setContent('-moz-inline-block');
				}
			}
		}
	});
};

},{}],25:[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([

		// adds -moz- vendor prefix
		{
			disable: {
				firefox: 10.0
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.ancestor({type: 'Declaration'}).cloneBefore().search({type: 'Function', name: 'linear-gradient'}).forEach(function (fn) {
						fn.name = '-moz-linear-gradient';
						fn[0].replaceWith(fixDirection(fn[0]));
					});
				}
			}
		},

		// adds -o- vendor prefix
		{
			disable: {
				opera: 12.1
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.ancestor({type: 'Declaration'}).cloneBefore().search({type: 'Function', name: 'linear-gradient'}).forEach(function (fn) {
						fn.name = '-o-linear-gradient';
						fn[0].replaceWith(fixDirection(fn[0]));
					});
				}
			}
		},

		// adds -webkit- vendor prefix
		{
			disable: {
				chrome: 26.0,
				safari: 6.1,
				ios: 7.0,
				android: 4.4
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.ancestor({type: 'Declaration'}).cloneBefore().search({type: 'Function', name: 'linear-gradient'}).forEach(function (fn) {
						fn.name = '-webkit-linear-gradient';
						fn[0].replaceWith(fixDirection(fn[0]));
					});
				}
			}
		},

		// adds the old syntax -webkit-gradient
		{
			disable: {
				chrome: 10.0,
				safari: 5.1,
				android: 4.0
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.ancestor({type: 'Declaration'}).cloneBefore().search({type: 'Function', name: 'linear-gradient'}).forEach(function (fn) {
						var newArgs = ['linear'];

						//Calculate the gradient direction
						var point = 'to bottom';

						if (fn[0].is({name: /(top|bottom|left|right|deg)/})) {
							point = fn.shift().toString();
						}

						switch (point) {
							case 'to bottom':
								newArgs.push('left top', 'left bottom');
								break;

							case 'to top':
								newArgs.push('left bottom', 'left top');
								break;

							case 'to right':
								newArgs.push('left top', 'right top');
								break;

							case 'to left':
								newArgs.push('right top', 'left top');
								break;

							default:
								if (/^\ddeg$/.test(point)) {
									newArgs.push(parseInt(point, 10) + 'deg');
								} else {
									newArgs.push('left top', 'left bottom');
								}
						}

						//Gradient colors and color stops
						var total = fn.length - 1;

						fn.forEach(function (param, i) {
							var text;

							if (i === 0) {
								text = 'from';
							} else if (i === total) {
								text = 'to';
							} else {
								text = 'color-stop';
							}

							newArgs.push(text + '(' + param + ')');
						});

						//Apply the changes
						fn.name = '-webkit-gradient';
						fn.setValue(newArgs);
					});
				}
			}
		}
	]);
};

function fixDirection (direction) {
	switch (direction.toString()) {
		case 'to top':
			return 'bottom';

		case 'to bottom':
			return 'top';

		case 'to left':
			return 'right';

		case 'to right':
			return 'left';

		default:
			return direction;
	}
}

},{}],26:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -webkit- vendor prefix

	stylecow.addTask({
		disable: {
			chrome: false,
			safari: false,
			android: false,
			ios: false
		},
		Declaration: function (declaration) {
			if (declaration.is({name: /^mask/})) {
				declaration.cloneBefore().name = '-webkit-' + declaration.name;
			}
		}
	});
};

},{}],27:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -o- vendor prefix

	stylecow.addTask({
		disable: {
			opera: 15.0
		},
		Declaration: {
			"object-fit": function (declaration) {
				declaration.cloneBefore().name = '-o-object-fit';
			},
			"object-position": function (declaration) {
				declaration.cloneBefore().name = '-o-object-position';
			}
		}
	});
};

},{}],28:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Add -moz- vendor prefix in ::input-placeholder for Firefox > 18 and ::selection
		{
			disable: {
				firefox: false
			},
			RuleBefore: function (rule) {
				var hasPseudoelement = rule.children({type: 'Selector'}).has({type: 'Keyword', name: ['::input-placeholder', '::selection']});

				if (hasPseudoelement) {
					rule.cloneBefore().children({type: 'Selector'}).search({type: 'Keyword', name: ['::input-placeholder', '::selection']}).forEach(function (keyword) {
						keyword.name = (keyword.name === '::input-placeholder') ? '::-moz-placeholder' : '::-moz-selection';
					});
				}
			}
		},

		// Add -webkit- vendor prefix in ::input-placeholder
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			RuleBefore: function (rule) {
				var hasPseudoelement = rule.children({type: 'Selector'}).has({type: 'Keyword', name: '::input-placeholder'});

				if (hasPseudoelement) {
					rule.cloneBefore().children({type: 'Selector'}).search({type: 'Keyword', name: '::input-placeholder'}).forEach(function (keyword) {
						keyword.name = '::-webkit-input-placeholder';
					});
				}
			}
		},

		// Add -ms- vendor prefix in ::input-placeholder
		{
			disable: {
				explorer: false
			},
			RuleBefore: function (rule) {
				var hasPseudoelement = rule.children({type: 'Selector'}).has({type: 'Keyword', name: '::input-placeholder'});

				if (hasPseudoelement) {
					rule.cloneBefore().children({type: 'Selector'}).search({type: 'Keyword', name: '::input-placeholder'}).forEach(function (keyword) {
						keyword.name = '::-ms-input-placeholder';
					});
				}
			}
		}
	]);
};

},{}],29:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -webkit- vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: 'region-fragment'})) {
					return declaration.cloneBefore().name = '-webkit-region-fragment';
				}

				if (declaration.is({name: /^flow/})) {
					return declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		// Adds -ms- vendor prefix
		{
			disable: {
				explorer: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^flow/})) {
					return declaration.cloneBefore().name = '-ms-' + declaration.name;
				}
			}
		}
	]);
};

},{}],30:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Firefox supports "-moz-available" property rather than "-moz-fill-available"',
		{
			disable: {
				firefox: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^(min-|max-)?(width|height)$/, value: 'fill-available'})) {
					declaration.cloneBefore().value = '-moz-available';
				}
			}
		},

		//Adds -moz- vendor prefix to max|min|fit-content
		{
			disable: { firefox: false },
			Declaration: function (declaration) {
				if (declaration.is({name: /^(min-|max-)?(width|height)$/, value: ['max-content', 'min-content', 'fit-content']})) {
					declaration.cloneBefore().value = '-moz-' + declaration.value;
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: false,
				safari: false,
				opera: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^(min-|max-)?(width|height)$/, value: ['fill-available', 'max-content', 'min-content', 'fit-content']})) {
					declaration.cloneBefore().value = '-webkit-' + declaration.value;
				}
			}
		}
	]);
};

},{}],31:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -webkit- vendor prefix

	stylecow.addTask({
		disable: {
			chrome: false,
			safari: false,
			android: false,
			ios: false
		},
		Declaration: {
			position: function (declaration) {
				if (declaration.value === 'sticky') {
					declaration.cloneBefore().setContent('-webkit-sticky');
				}
			}
		}
	});
};

},{}],32:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Add -moz- vendor prefix
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^(transform.*|perspective.*|backface-visibility)$/})) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		//Add -webkit- vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^(transform.*|perspective.*|backface-visibility)$/})) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		//Add -o- vendor prefix
		{
			disable: { opera:
				12.1
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^transform/})) {
					declaration.cloneBefore().name = '-o-' + declaration.name;
				}
			}
		},

		//Add -ms- vendor prefix
		{
			disable: {
				explorer: 10.0
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^transform/})) {
					declaration.cloneBefore().name = '-ms-' + declaration.name;
				}
			}
		}
	]);
};

},{}],33:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -moz- vendor prefix
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^transition/}) && !declaration.has({vendor: true})) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		// Adds -webkit- vendor prefix
		{
			disable: {
				chrome: 26.0,
				safari: 6.1,
				android: 4.4
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^transition/}) && !declaration.has({vendor: true})) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		// Adds -o- vendor prefix
		{
			disable: {
				opera: 12.1
			},
			Declaration: function (declaration) {
				if (declaration.is({name: /^transition/}) && !declaration.has({vendor: true})) {
					declaration.cloneBefore().name = '-o-' + declaration.name;
				}
			}
		},

		// Adds -moz- vendor prefix to transition-property: transform|transform-origin
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.is({name: ['-moz-transition', '-moz-transition-property']})) {
					declaration.search({type: 'Keyword', name: ['transform', 'transform-origin']}).forEach(function (keyword) {
						keyword.name = '-moz-' + keyword.name;
					});
				}
			}
		},

		// Adds -webkit- vendor prefix to transition-property: transform|transform-origin
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is({name: ['-webkit-transition', '-webkit-transition-property']})) {
					declaration.search({type: 'Keyword', name: ['transform', 'transform-origin']}).forEach(function (keyword) {
						keyword.name = '-webkit-' + keyword.name;
					});
				}
			}
		},

		// Adds -o- vendor prefix to transition-property: transform|transform-origin
		{
			disable: {
				opera: 12.1
			},
			Declaration: function (declaration) {
				if (declaration.is({name: ['-o-transition', '-o-transition-property']})) {
					declaration.search({type: 'Keyword', name: ['transform', 'transform-origin']}).forEach(function (keyword) {
						keyword.name = '-o-' + keyword.name;
					});
				}
			}
		},

		// Adds -ms- vendor prefix to transition-property: transform|transform-origin
		{
			disable: {
				explorer: 10.0
			},
			Declaration: function (declaration) {
				if (declaration.is({name: ['transition', 'transition-property']}) && declaration.has({type: 'Keyword', name: ['transform', 'transform-origin']})) {
					declaration.cloneBefore().search({type: 'Keyword', name: ['transform', 'transform-origin']}).forEach(function (keyword) {
						keyword.name = '-ms-' + keyword.name;
					});
				}
			}
		}
	]);
};

},{}],34:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -moz- vendor prefix
		{
			disable: {
				firefox: false
			},
			Declaration: {
				"text-align-last": function (declaration) {
					declaration.cloneBefore().name = '-moz-text-align-last';
				},
				"font-feature-settings": function (declaration) {
					declaration.cloneBefore().name = '-moz-font-feature-settings';
				},
				"hyphens": function (declaration) {
					declaration.cloneBefore().name = '-moz-hyphens';
				},
				"tab-size": function (declaration) {
					declaration.cloneBefore().name = '-moz-tab-size';
				}
			}
		},

		// Adds -webkit- vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: {
				"font-feature-settings": function (declaration) {
					declaration.cloneBefore().name = '-webkit-font-feature-settings';
				},
				"text-size-adjust": function (declaration) {
					declaration.cloneBefore().name = '-webkit-text-size-adjust';
				},
				"hyphens": function (declaration) {
					declaration.cloneBefore().name = '-webkit-hyphens';
				}
			}
		},

		// Adds -ms- vendor prefix to text-size-adjust
		{
			disable: {
				explorer: false
			},
			Declaration: {
				"text-size-adjust": function (declaration) {
					declaration.cloneBefore().name = '-ms-text-size-adjust';
				},
				"hyphens": function (declaration) {
					declaration.cloneBefore().name = '-ms-hyphens';
				}
			}
		},

		// Adds -o- vendor prefix to text-overflow
		{
			disable: {
				opera: 11.0
			},
			Declaration: {
				"text-overflow": function (declaration) {
					declaration.cloneBefore().name = '-o-text-overflow';
				}
			}
		},

		// Adds -o- vendor prefix to tab-size
		{
			disable: {
				opera: 15.0
			},
			Declaration: {
				"tab-size": function (declaration) {
					declaration.cloneBefore().name = '-o-tab-size';
				}
			}
		}
	]);
};

},{}],35:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -moz- vendor prefix
		{
			disable: {
				firefox: false
			},
			Declaration: {
				"user-select": function (declaration) {
					declaration.cloneBefore().name = '-moz-user-select';
				}
			}
		},

		// Adds -webkit- vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: {
				"user-select": function (declaration) {
					declaration.cloneBefore().name = '-webkit-user-select';
				}
			}
		},

		// Adds -ms- vendor prefix
		{
			disable: {
				explorer: false
			},
			Declaration: {
				"user-select": function (declaration) {
					declaration.cloneBefore().name = '-ms-user-select';
				}
			}
		}
	]);
};

},{}],36:[function(require,module,exports){
(function (stylecow) {
	stylecow.codeStyles = {
		"normal": {
			"indent": "\t",
			"linebreak": "\n",
			"selectorJoiner": ", ",
			"argumentJoiner": ", ",
			"valueJoiner": ", ",
			"ruleColon": ": ",
			"ruleEnd": ";",
			"comments": "all", // (all|important|none)
			"commentStart": "/*",
			"commentEnd": "*/",
			"rulesetStart": " {\n",
			"rulesetEnd": "\n}"
		},
		"minify": {
			"indent": "",
			"linebreak": "",
			"selectorJoiner": ",",
			"argumentJoiner": ",",
			"valueJoiner": ",",
			"ruleColon": ":",
			"ruleEnd": ";",
			"comments": "none",
			"commentStart": "/*",
			"commentEnd": "*/",
			"rulesetStart": "{",
			"rulesetEnd": "}"
		}
	};

	stylecow.defaults = {
		code: "normal",
		support: {
			"explorer": 8.0,
			"firefox": 30.0,
			"chrome": 35.0,
			"safari": 6.0,
			"opera": 22.0,
			"android": 4.0,
			"ios": 6.0
		},
		plugins: []
	};

})(require('./index'));

},{"./index":51}],37:[function(require,module,exports){
(function (stylecow) {

	stylecow.Argument = function () {
		this.type = 'Argument';
	};

	stylecow.Argument.prototype = Object.create(stylecow.Base, {

		toString: {
			value: function () {
				return this.join(' ');
			}
		}
	});
})(require('../index'));

},{"../index":51}],38:[function(require,module,exports){
(function (stylecow) {

	stylecow.AtRule = function (name) {
		this.type = 'AtRule';
		this.name = name;
	};

	stylecow.AtRule.prototype = Object.create(stylecow.Base, {

		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				name = name || '';

				if (name[0] === '@') {
					name = name.substr(1);
				}

				var vendor = name.match(/^@\-(\w+)\-/);
				this.vendor = vendor ? vendor[0] : null;
				this._name = name;
			}
		},

		toString: {
			value: function () {
				return '@' + this._name + ' ' + this.join(' ') + ';';
			}
		},

		toCode: {
			value: function () {
				var value = this.map(function (child) {
					return child.toCode();
				}).join(stylecow.codeStyle.valueJoiner);

				return value ? ('@' + this._name + ' ' + value + stylecow.codeStyle.ruleEnd) : '';
			}
		}
	});

})(require('../index'));

},{"../index":51}],39:[function(require,module,exports){
(function (stylecow) {
	var Collection = function () {};

	Collection.prototype = Object.create(Array.prototype, {
		children: {
			value: function (match) {
				var result = new Collection;

				for (var i = 0, t = this.length; i < t; ++i) {
					if (this[i].is(match)) {
						result.push(this[i]);
					}
				};

				return result;
			}
		},

		firstChild: {
			value: function (match) {
				for (var i = 0, t = this.length; i < t; ++i) {
					if (this[i].is(match)) {
						return this[i];
					}
				};
			}
		},

		hasChild: {
			value: function (match) {
				return this.some(function (child) {
					return child.is(match);
				});
			}
		},

		search: {
			value: function (match, result) {
				result = result || new Collection;

				for (var i = 0, t = this.length; i < t; i++) {
					if (this[i].is(match)) {
						result.push(this[i]);
					} else {
						this[i].search(match, result);
					}
				}

				return result;
			}
		},

		searchFirst: {
			value: function (match) {
				for (var i = 0, t = this.length; i < t; i++) {
					if (this[i].is(match)) {
						return this[i];
					}
					
					var found = this[i].searchFirst(match);

					if (found) {
						return found;
					}
				}
			}
		},

		has: {
			value: function (match) {
				for (var i = 0, t = this.length; i < t; i++) {
					if (this[i].is(match) || this[i].has(match)) {
						return true;
					}
				}

				return false;
			}
		}
	});

	stylecow.Base = Object.create(Collection.prototype, {
		executeTasks: {
			value: function (tasks, vendor) {
				if (vendor) {
					if (this.vendor && this.vendor !== vendor) {
						return this.remove();
					}
				} else {
					vendor = this.vendor;
				}

				executeTasks(tasks[this.type + 'Before'], this);

				var k = 0;

				while (this[k]) {
					var child = this[k];

					if (child.executed) {
						++k;
						continue;
					}

					child.executeTasks(tasks, vendor);

					k = 0;
				}

				executeTasks(tasks[this.type], this);

				this.executed = true;
			}
		},

		clone: {
			value: function () {
				var clone = new stylecow[this.type](this.name);

				this.forEach(function (child) {
					clone.push(child.clone());
				});

				clone._data = this._data;

				return clone;
			}
		},

		cloneBefore: {
			value: function () {
				return this.before(this.clone());
			}
		},

		cloneAfter: {
			value: function () {
				return this.after(this.clone());
			}
		},

		is: {
			value: function (match) {
				if (!match) {
					return true;
				}

				if (match.type && !equals(this.type, match.type)) {
					return false;
				}

				if (match.name && !equals(this.name, match.name)) {
					return false;
				}

				if (match.value && !equals(this.value, match.value)) {
					return false;
				}

				if (match.vendor && !equals(this.vendor, match.vendor)) {
					return false;
				}

				if (match.string && !equals(this.toString(), match.string)) {
					return false;
				}

				return true;
			}
		},

		parent: {
			value: function (match) {
				if (this._parent) {
					if (!match || this._parent.is(match)) {
						return this._parent;
					}

					return this._parent.parent(match);
				}
			}
		},

		empty: {
			value: function () {
				this.splice(0);

				return this;
			}
		},

		setContent: {
			value: function (content) {
				this.splice(0);

				if (content instanceof Array) {
					content.forEach(function (child) {
						stylecow.parse(child, this);
					}, this);
				} else {
					stylecow.parse(content, this);
				}

				return this;
			}
		},

		getContent: {
			value: function () {
				return this.map(function (child) {
					return child.toString();
				});
			}
		},

		getData: {
			value: function (key) {
				if (('_data' in this) && (key in this._data)) {
					return this._data[key];
				}

				if (this._parent) {
					return this._parent.getData(key);
				}
			}
		},

		setData: {
			value: function (key, value) {
				if (!('_data' in this)) {
					this._data = {};
				}

				this._data[key] = value;

				return this;
			}
		},

		index: {
			value: function () {
				if (this._parent) {
					return this._parent.indexOf(this);
				}

				return -1;
			}
		},

		push: {
			value: function () {
				prepareChildren(this, arguments, 0);

				return Array.prototype.push.apply(this, arguments);
			}
		},

		unshift: {
			value: function () {
				prepareChildren(this, arguments, 0);

				return Array.prototype.unshift.apply(this, arguments);
			}
		},

		splice: {
			value: function () {
				if (arguments.length > 2) {
					prepareChildren(this, arguments, 2);
				}

				return Array.prototype.splice.apply(this, arguments);
			}
		},

		next: {
			value: function () {
				var index = this.index();

				if (index !== -1) {
					return this._parent[index + 1];
				}
			}
		},

		prev: {
			value: function () {
				var index = this.index();

				if (index > 0) {
					return this._parent[index - 1];
				}
			}
		},

		add: {
			value: function (child, index) {
				if (typeof child === 'string') {
					var root = new stylecow[this.type];
					stylecow.parse(child, root);

					if (root._parent) {
						root = root._parent;
					}

					if (index === undefined) {
						this.push.apply(this, root);
					} else {
						this.splice.apply(this, [index, 0].concat(root.slice(0)));
					}

					return root[0];
				}

				if (index === undefined || index > this.length) {
					this.push(child);
				} else {
					this.splice(index, 0, child);
				}

				return child;
			}
		},

		before: {
			value: function (child) {
				var index = this.index();

				if (index !== -1) {
					return this._parent.add(child, index);
				}
			}
		},

		after: {
			value: function (child) {
				var index = this.index();

				if (index !== -1) {
					if (index === this.length) {
						return this._parent.add(child);
					}

					return this._parent.add(child, index + 1);
				}
			}
		},

		replaceWith: {
			value: function (child) {
				var index = this.index();

				if (index !== -1) {
					var parent = this._parent;
					this.remove();

					return parent.add(child, index);
				}
			}
		},

		remove: {
			value: function () {
				if (this._parent) {
					var index = this.index();

					if (index !== -1) {
						this._parent.splice(index, 1);
						this._parent = null;
					}
				}

				this.forEach(function (child) {
					child._parent = null;
					child.remove();
				});

				this.splice(0);

				return this;
			}
		},

		toCode: {
			value: function () {
				return this.toString();
			}
		}
	});

	function prepareChildren (parent, children, from) {
		for (var i = children.length - 1; i >= from; i--) {
			if (children[i]._parent) {
				var index = children[i].index();

				if (index !== -1) {
					children[i]._parent.splice(index, 1);
				}
			}

			children[i]._parent = parent;
		};
	}

	function equals (value, needle) {
		if (needle === true) {
			return value ? true : false;
		}

		if (typeof needle === 'string') {
			return (needle === value);
		}

		if (needle instanceof Array) {
			return (needle.indexOf(value) !== -1);
		}

		if (needle instanceof RegExp) {
			return needle.test(value);
		}

		return true;
	}

	function executeTasks (tasks, element) {
		if (!tasks) {
			return;
		}

		var i, name = element.name;

		if (tasks.hasOwnProperty('*')) {
			for (i = tasks['*'].length - 1; i >= 0; i--) {
				tasks['*'][i](element);
			};
		}

		if (tasks.hasOwnProperty(name)) {
			for (i = tasks[name].length - 1; i >= 0; i--) {
				tasks[name][i](element);
			};
		}
	}

})(require('../index'));

},{"../index":51}],40:[function(require,module,exports){
(function (stylecow) {

	stylecow.Comment = function (name) {
		this.type = 'Comment';
		this.name = name;
	};

	stylecow.Comment.prototype = Object.create(stylecow.Base, {
		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				name = name || '';

				this.important = (name.trim()[0] === '!');
				this._name = name;
			}
		},

		toString: {
			value: function () {
				return '/* ' + this._name + ' */';
			}
		},

		toCode: {
			value: function () {
				if (!this._name || stylecow.codeStyle.comments === 'none' || (stylecow.codeStyle.comments === 'important' && !this.important)) {
					return '';
				}

				return stylecow.codeStyle.commentStart + this._name + stylecow.codeStyle.commentEnd;
			}
		}
	});
})(require('../index'));

},{"../index":51}],41:[function(require,module,exports){
(function (stylecow) {

	stylecow.Condition = function (name) {
		this.type = 'Condition';
		this.name = name;
	};

	stylecow.Condition.prototype = Object.create(stylecow.Base, {

		toString: {
			value: function () {
				return this.name;
			}
		}
	});
})(require('../index'));

},{"../index":51}],42:[function(require,module,exports){
(function (stylecow) {

	stylecow.Declaration = function (name) {
		this.type = 'Declaration';
		this.name = name;
	};

	stylecow.Declaration.prototype = Object.create(stylecow.Base, {

		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				name = name || '';

				if (name[0] === '*' || name[0] === '_') {
					this.vendor = 'ms';
				} else if (name[0] === '-') {
					var vendor = name.match(/^\-(\w+)\-/);
					this.vendor = vendor ? vendor[0] : null;
				} else {
					this.vendor = null;
				}

				this._name = name;
			}
		},

		value: {
			get: function () {
				return this.join(', ');
			},
			set: function (value) {
				this.setValue(value);
			}
		},

		toString: {
			value: function () {
				return this.name + ': ' + this.join(', ') + ';';
			}
		},

		toCode: {
			value: function () {
				var value = this.map(function (child) {
					return child.toCode();
				}).join(stylecow.codeStyle.valueJoiner);

				if (this.name === '-ms-filter') {
					value = "'" + value + "'";
				}

				return this.name + stylecow.codeStyle.ruleColon + value + stylecow.codeStyle.ruleEnd;
			}
		}
	});
})(require('../index'));

},{"../index":51}],43:[function(require,module,exports){
(function (stylecow) {

	stylecow.Function = function (name) {
		this.type = 'Function';
		this.name = name;
	};

	stylecow.Function.prototype = Object.create(stylecow.Base, {

		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				name = name || '';

				var vendor = name.match(/^([:]+)?\-(\w+)\-/);
				this.vendor = vendor ? vendor[0] : null;
				this._name = name;
			}
		},

		value: {
			get: function () {
				return this.join(', ');
			},
			set: function (value) {
				this.setValue(value);
			}
		},

		toString: {
			value: function () {
				return this.name + '(' + this.join(', ') + ')';
			}
		},

		toCode: {
			value: function () {
				return this.name + '(' + this.map(function (child) {
					return child.toCode();
				}).join(stylecow.codeStyle.argumentJoiner) + ')';
			}
		}
	});
})(require('../index'));

},{"../index":51}],44:[function(require,module,exports){
(function (stylecow) {

	stylecow.Keyword = function (name) {
		this.type = 'Keyword';
		this.name = name;
	};

	stylecow.Keyword.prototype = Object.create(stylecow.Base, {

		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				name = name || '';

				this.vendor = null;
				this.quoted = false;

				if (name[0] === '"' || name[0] === "'") {
					this.quoted = true;
					name = name.slice(1, -1);
				} else if (name[0] === '-') {
					var vendor = name.match(/^\-(\w+)\-/);
					this.vendor = vendor ? vendor[0] : null;
				}

				this._name = name;
			}
		},

		toString: {
			value: function () {
				return this.quoted ? ('"' + this.name + '"') : this.name;
			}
		}
	});
})(require('../index'));

},{"../index":51}],45:[function(require,module,exports){
(function (stylecow) {

	stylecow.NestedAtRule = function (name) {
		this.type = 'NestedAtRule';
		this.name = name;
	};

	stylecow.NestedAtRule.prototype = Object.create(stylecow.AtRule.prototype, {

		toString: {
			value: function () {
				var stringIn = [];
				var stringOut = [];
				var conditions = [];
				var selectors = [];

				this.forEach(function (child) {
					var string = child.toString();

					if (string) {
						if (child.type === 'Selector') {
							selectors.push(child);
						} else if (child.type === 'Condition') {
							conditions.push(child);
						} else if (child.type === 'Value') {
							stringOut.push(child);
						} else {
							stringIn.push(child);
						}
					}
				});

				if (selectors.length) {
					stringOut.push(selectors.join(', '));
				}

				if (conditions.length) {
					stringOut.push(conditions.join(' '));
				}

				stringOut = stringOut.join(' ');

				if (stringOut) {
					stringOut += ' ';
				}

				stringIn = "\t" + stringIn.join("\n").replace(/\n/g, '\n' + "\t");

				return '@' + this._name + ' ' + stringOut + "{\n" + stringIn + "\n}";
			}
		},

		toCode: {
			value: function () {
				var stringIn = [];
				var stringOut = [];
				var conditions = [];
				var selectors = [];

				this.forEach(function (child) {
					var string = child.toCode();

					if (string) {
						if (child.type === 'Selector') {
							selectors.push(string);
						} else if (child.type === 'Condition') {
							conditions.push(string);
						} else if (child.type === 'Value') {
							stringOut.push(string);
						} else {
							stringIn.push(string);
						}
					}
				});

				if (!stringIn.length) {
					return '';
				}

				if (selectors.length) {
					stringOut.push(selectors.join(stylecow.codeStyle.selectorJoiner));
				}

				if (conditions.length) {
					stringOut.push(conditions.join(' '));
				}

				stringIn = arrayUnique(stringIn).join(stylecow.codeStyle.linebreak);
				stringOut = stringOut.join(' ');

				if (stringOut) {
					stringOut = ' ' +  stringOut;
				}

				if (stylecow.codeStyle.indent) {
					stringIn = stylecow.codeStyle.indent + stringIn.replace(/\n/g, '\n' + stylecow.codeStyle.indent);
				}

				return '@' + this._name + stringOut + stylecow.codeStyle.rulesetStart + stringIn + stylecow.codeStyle.rulesetEnd;
			}
		}
	});

	function arrayUnique (array) {
		var i, k, a = [];

		for (i = array.length - 1; i >= 0; i--) {
			k = a.indexOf(array[i]);

			if (k === -1) {
				a.unshift(array[i]);
			}
		}

		return a;
	}

})(require('../index'));

},{"../index":51}],46:[function(require,module,exports){
(function (stylecow) {

	stylecow.Root = function () {
		this.type = 'Root';
	};

	stylecow.Root.prototype = Object.create(stylecow.Base, {

		toString: {
			value: function () {
				return this.map(function (child) {
					return child.toString();
				}).filter(function (string) {
					return string ? true : false;
				}).join("\n");
			}
		},

		toCode: {
			value: function () {
				return this.map(function (child) {
					return child.toCode();
				}).filter(function (string) {
					return string ? true : false;
				}).join(stylecow.codeStyle.linebreak);
			}
		}
	});
})(require('../index'));

},{"../index":51}],47:[function(require,module,exports){
(function (stylecow) {

	stylecow.Rule = function () {
		this.type = 'Rule';
	};

	stylecow.Rule.prototype = Object.create(stylecow.Root.prototype, {

		addOldMsFilter: {
			value: function (filter) {
				var declaration = this.children({type: 'Declaration', name: '-ms-filter'}).pop();

				var value = new stylecow.Value;
				value.add(new stylecow.Keyword(filter));

				if (declaration) {
					if (declaration.value === 'none') {
						declaration.empty().push(value);
					} else if (!declaration.search({type: 'Keyword', name: filter}).length) {
						declaration.push(value);
					}
				} else {
					this.add(new stylecow.Declaration('-ms-filter')).add(value);
				}
			}
		},

		toString: {
			value: function () {
				var declarations = [];
				var selectors = [];

				this.forEach(function (child) {
					var string = child.toString();

					if (string) {
						if (child.is({type: 'Selector'})) {
							selectors.push(child);
						} else {
							declarations.push(child);
						}
					}
				});

				declarations = "\t" + declarations.join("\n").replace(/\n/g, '\n' + "\t");

				return selectors.join(', ') + " {\n" + declarations + "\n}";
			}
		},

		toCode: {
			value: function () {
				var declarations = [];
				var selectors = [];

				this.forEach(function (child) {
					var string = child.toCode();

					if (string) {
						if (child.type === 'Selector') {
							selectors.push(string);
						} else {
							declarations.push(string);
						}
					}
				});

				declarations = arrayUnique(declarations);
				selectors = arrayUnique(selectors);

				if (!declarations.length) {
					return '';
				}

				declarations = declarations.join(stylecow.codeStyle.linebreak);

				if (stylecow.codeStyle.indent) {
					declarations = stylecow.codeStyle.indent + declarations.replace(/\n/g, '\n' + stylecow.codeStyle.indent);
				}

				return selectors.join(stylecow.codeStyle.selectorJoiner) + stylecow.codeStyle.rulesetStart + declarations + stylecow.codeStyle.rulesetEnd;
			}
		}
	});

	function arrayUnique (array) {
		var i, k, a = [];

		for (i = array.length - 1; i >= 0; i--) {
			k = a.indexOf(array[i]);

			if (k === -1) {
				a.unshift(array[i]);
			}
		}

		return a;
	}

})(require('../index'));

},{"../index":51}],48:[function(require,module,exports){
(function (stylecow) {

	stylecow.Selector = function () {
		this.type = 'Selector';
	};

	stylecow.Selector.prototype = Object.create(stylecow.Base, {
		toString: {
			value: function () {
				return this.join('');
			}
		},

		toCode: {
			value: function () {
				return this.map(function (child) {
					return child.toCode();
				}).join('');
			}
		}
	});
})(require('../index'));

},{"../index":51}],49:[function(require,module,exports){
(function (stylecow) {

	stylecow.Value = function () {
		this.type = 'Value';
	};

	stylecow.Value.prototype = Object.create(stylecow.Base, {

		name: {
			get: function () {
				return this.join(' ');
			}
		},

		toString: {
			value: function () {
				return this.name;
			}
		}
	});
})(require('../index'));

},{"../index":51}],50:[function(require,module,exports){
(function (stylecow) {

	stylecow.Error = function (message, data, prevError) {
		this.message = message;
		this.data = data;
		this.prevError = prevError;
	};

	stylecow.Error.prototype = {

		getFirstError: function () {
			if (this.prevError instanceof stylecow.Error) {
				return this.prevError.getFirstError();
			}

			return this;
		},

		toFullString: function () {
			var string = this.toString();

			if (this.prevError instanceof stylecow.Error) {
				string += '\n------------------\n' + this.prevError.toFullString();
			}

			return string;
		},

		toString: function () {
			var string = this.message;

			for (var key in this.data) {
				if (this.data.hasOwnProperty(key)) {
					string += '\n' + key + ': ' + this.data[key];
				}
			}

			return string;
		},

		toCode: function () {
			var root = stylecow.Root.create('body>*{display:none;}');
			var rule = root.add(new stylecow.Rule());

			rule.content = [
				'content: "' + this.toString().replace(/\n/g, ' \\A ').replace(/"/, '\\"') + '"',
				'background: white',
				'color: black',
				'font-family: monospace',
				'white-space: pre'
			];
			rule.selector = 'body::before';
			
			return root;
		}
	};
})(require('./index'));

},{"./index":51}],51:[function(require,module,exports){
(function (stylecow) {
	var fs = require('fs');

	//CSS elements
	require('./css/base');
	require('./css/argument');
	require('./css/atrule');
	require('./css/comment');
	require('./css/condition');
	require('./css/declaration');
	require('./css/function');
	require('./css/keyword');
	require('./css/nested-atrule');
	require('./css/selector');
	require('./css/root');
	require('./css/rule');
	require('./css/value');

	//Utils
	require('./error');
	require('./parser');
	require('./config');


	//Properties
	stylecow.pluginPrefix = 'stylecow-plugin-';
	stylecow.support = {};
	stylecow.tasks = {};
	stylecow.codeStyle = stylecow.codeStyles[stylecow.defaults.code];


	//Create from code string
	stylecow.create = function (code) {
		return stylecow.parse(code);
		//try {
		//} catch (error) {
		//	return error.getFirstError().toCode();
		//}
	};


	//Read a css file
	stylecow.createFromFile = function (file) {
		return stylecow.create(fs.readFileSync(file, 'utf8')).setData('sourceFile', file);
	};


	//Register new tasks
	stylecow.addTask = function (task) {
		if (task instanceof Array) {
			return task.forEach(stylecow.addTask);
		}

		if (needFix(stylecow.support, task.disable)) {
			var name, val, k;

			for (name in task) {
				if (name === 'disable') {
					continue;
				}

				if (task.hasOwnProperty(name)) {
					val = task[name];

					if (val instanceof Function) {
						val = {'*': val};
					}

					if (!stylecow.tasks[name]) {
						stylecow.tasks[name] = {};
					}

					for (k in val) {
						if (val.hasOwnProperty(k)) {
							if (!stylecow.tasks[name][k]) {
								stylecow.tasks[name][k] = [];
							}

							stylecow.tasks[name][k].push(val[k]);
						}
					}
				}
			}
		}
	};


	//Set configuration
	stylecow.setConfig = function (config) {
		stylecow.support = config.support;
		stylecow.codeStyle = stylecow.codeStyles[config.code];
		stylecow.tasks = {};

		config.plugins.forEach(function (name) {
			if (name[0] === '.' || name[0] === '/') {
				require(name)(stylecow);
			} else {
				require(stylecow.pluginPrefix + name)(stylecow);
			}
		});
	};


	//Convert a string
	stylecow.convert = function (code) {
		var css = stylecow.create(code);

		css.executeTasks(stylecow.tasks);

		return css;
	};


	//Convert from a file
	stylecow.convertFromFile = function (file) {
		var css = stylecow.createFromFile(file);

		css.executeTasks(stylecow.tasks);

		return css;
	};


	function needFix (minSupport, disablePlugin) {
		if (!disablePlugin || !minSupport) {
			return true;
		}

		for (var browser in disablePlugin) {
			if (minSupport[browser] === false) {
				continue;
			}

			if (disablePlugin[browser] === false || minSupport[browser] < disablePlugin[browser]) {
				return true;
			}
		}

		return false;
	}

})(require('./index'));

},{"./config":36,"./css/argument":37,"./css/atrule":38,"./css/base":39,"./css/comment":40,"./css/condition":41,"./css/declaration":42,"./css/function":43,"./css/keyword":44,"./css/nested-atrule":45,"./css/root":46,"./css/rule":47,"./css/selector":48,"./css/value":49,"./error":50,"./index":51,"./parser":52,"fs":1}],52:[function(require,module,exports){
(function (stylecow) {
    var collapsedSpaces = [' ', '\t', '\n', '\r'];
    var collapsedSelector = collapsedSpaces.concat(['>', '~', '+', ',', '{']);
    var collapsedValue = collapsedSpaces.concat([',']);

    var keyChars = ['{', '}', ':', ' ', '*', '.', '[', '#', '+', '>', '~', ';', '(', ')', ',', '/', '&', '@'];

    var COMMENT         = 1;
    var FUNCTION        = 2;
    var KEYWORD         = 4;
    var DECLARATION     = 8;
    var RULE            = 16;
    var SELECTOR        = 32;
    var VALUE           = 64;
    var CONDITION       = 128;

    var HAS_SELECTOR    = 256;
    var HAS_URL         = 512;
    var HAS_VALUE       = 1024;
    var HAS_CONDITION   = 2048;

    var IS_OPENED       = 4096;
    
    var COLLAPSE_SELEC  = 8192;
    var COLLAPSE_VALUE  = 16384;

    var types = {
        AtRule:         DECLARATION,
        Argument:       VALUE | COLLAPSE_VALUE,
        Comment:        COMMENT,
        Condition:      CONDITION,
        Declaration:    DECLARATION,
        Function:       FUNCTION | COLLAPSE_VALUE,
        Keyword:        KEYWORD,
        NestedAtRule:   RULE | HAS_SELECTOR | COLLAPSE_SELEC,
        Selector:       SELECTOR | COLLAPSE_SELEC,
        Root:           RULE | COLLAPSE_SELEC | IS_OPENED,
        Rule:           RULE | HAS_SELECTOR | COLLAPSE_SELEC,
        Value:          VALUE | COLLAPSE_VALUE
    };

    var atRulesTypes = {
        '@media':       RULE | HAS_CONDITION | COLLAPSE_SELEC,
        '@keyframes':   RULE | HAS_VALUE | COLLAPSE_SELEC,
        '@font-face':   RULE | COLLAPSE_SELEC,
        '@supports':    RULE | HAS_CONDITION | COLLAPSE_SELEC,
        '@document':    RULE | HAS_SELECTOR | COLLAPSE_SELEC,
        '@import':      DECLARATION | HAS_URL | HAS_CONDITION,
        '@charset':     DECLARATION | HAS_VALUE,
        '@namespace':   DECLARATION | HAS_VALUE | HAS_URL,
    };

    var uniqueArgumentFunctions = ['url', 'src'];

    var Parser = function (code, parent) {
        this.code = code;
        this.parent = parent;
    };

    Parser.prototype = {
        add: function (item) {
            item._data = {
                sourceColumn: this.col,
                sourceLine: this.line
            };

            this.current.push(item);

            return item;
        },

        down: function (item) {
            this.current = this.add(item);
            this.treeTypes.push(this.currType);

            if ((this.current.type === 'AtRule' || this.current.type === 'NestedAtRule') && atRulesTypes['@' + this.current.name]) {
                this.currType = atRulesTypes['@' + this.current.name];
            } else {
                this.currType = types[item.type];
            }

            return this;
        },

        up: function () {
            if (!this.current._parent) {
                switch (this.current.type) {
                    case 'Value':
                        this.current._parent = new stylecow.Declaration;
                        break;

                    case 'Argument':
                        this.current._parent = new stylecow.Function;
                        break;

                    case 'Function':
                    case 'Keyword':
                        this.current._parent = new stylecow.Value;
                        break;

                    case 'Condition':
                    case 'Selector':
                        this.current._parent = new stylecow.Rule;
                        break;

                    default:
                        this.current._parent = new stylecow.Root;
                        break;
                }

                this.treeTypes.unshift(types[this.current._parent.type]);
                this.current._parent.push(this.current);
            }

            this.current = this.current._parent;
            this.currType = this.treeTypes.pop();

            return this;
        },

        run: function () {
            this.pos = 0;
            this.col = 0;
            this.line = 0;
            this.buffer = '';
            this.currChar = '';
            this.length = this.code.length;

            this.treeTypes = [];
            this.currType = types[this.parent.type];
            this.current = this.parent;

            if (this.currType & RULE) {
                this.currType = this.currType | IS_OPENED;
            }

            while (this.next()) {
                if (this.seek()) {
                    continue;
                }

                if (keyChars.indexOf(this.currChar) !== -1) {
                    if (!this[this.currChar]()) {
                        this.buffer += this.currChar;
                    } else {
                        this.buffer = '';
                    }
                } else {
                    this.buffer += this.currChar;
                }
            }

            if (this.buffer) {
                this.end();
            }

            return this.parent;
        },

        next: function () {
            this.currChar = this.code[this.pos];
            ++this.pos;

            if (this.pos > this.length) {
                return false;
            }

            if (this.currChar === '\n') {
                ++this.line;
                this.col = 0;
            } else {
                ++this.col;
            }

            return true;
        },

        seek: function () {
            //Quotes
            if (this.currChar === '"' || this.currChar === "'") {
                var c = this.currChar;
                this.buffer += this.currChar;

                while (this.next()) {
                    this.buffer += this.currChar;

                    if (this.currChar === c) {
                        break;
                    }
                }

                return true;
            }

            if (this.currType & COLLAPSE_SELEC) {
                if (this.buffer.trim()) {
                    this.collapse(collapsedSelector);
                    return false;
                }
            }

            else if (this.currType & COLLAPSE_VALUE) {
                if (this.buffer.trim()) {
                    this.collapse(collapsedValue);
                    return false;
                }
            }

            if (!this.buffer && collapsedSpaces.indexOf(this.currChar) !== -1) {
                return true;
            }
        },

        end: function () {
            if (this.currType & VALUE || this.currType & SELECTOR) {
                this.add(new stylecow.Keyword(this.buffer));
            }

            else if (this.currType & FUNCTION) {
                this.add(new stylecow.Argument).add(new stylecow.Keyword(this.buffer));
            }

            else if (this.currType & DECLARATION) {
                this.add(new stylecow.Value).add(new stylecow.Keyword(this.buffer));
            }
        },

        collapse: function (validChars) {
            if (validChars.indexOf(this.currChar) !== -1) {
                var c = this.currChar.trim();
                var next = this.code[this.pos];

                while (validChars.indexOf(next) !== -1) {
                    if (collapsedSpaces.indexOf(next) === -1) {
                        if (c) {
                            break;
                        }

                        c = next;
                    }
                    this.next();
                    next = this.code[this.pos];
                }

                this.currChar = c || ' ';
            }
        },

        '{': function () {
            if (this.currType & RULE) {
                if (!this.buffer) {
                    this.currType = this.currType | IS_OPENED;
                    return true;
                }

                if (this.currType & IS_OPENED) {
                    this.down(new stylecow.Rule).notOpenedRuleOrDeclaration();

                    if (this.currType & SELECTOR) {
                        this.up();
                    }
                    
                    this.currType = this.currType | IS_OPENED;

                    return true;
                }

                this.notOpenedRuleOrDeclaration();

                if (this.currType & SELECTOR) {
                    this.up();
                }

                this.currType = this.currType | IS_OPENED;
                return true;
            }

            if (this.currType & SELECTOR) {
                this.selector();
                this.up();
                this.currType = this.currType | IS_OPENED;
                return true;
            }
        },

        '}': function () {
            if (this.currType & RULE) {
                this.up();
                return true;
            }

            else if (this.currType & DECLARATION) {
                this.up().up();
                return true;
            }

            else if (this.currType & VALUE) {
                if (this.buffer) {
                    this.add(new stylecow.Keyword(this.buffer));
                }
                this.up().up().up();
                return true;
            }
        },

        ':': function () {
            if (this.currType & RULE) {
                if (this.currType & IS_OPENED) {
                    if (this.isNested()) {
                        return this.down(new stylecow.Rule).notOpenedRuleOrDeclaration();
                    }

                    this.down(new stylecow.Declaration(this.buffer)).down(new stylecow.Value);
                    return true;
                }
            }

            else if (this.buffer && this.buffer.substr(-1) !== ':') {
                return this.selector();
            }
        },

        ' ': function () {
            if (this.currType & VALUE) {
                this.add(new stylecow.Keyword(this.buffer));
                return true;
            }

            else if (this.currType & RULE) {
                if (this.currType & IS_OPENED) {
                    return this.down(new stylecow.Rule).notOpenedRuleOrDeclaration(true);
                } else {
                    return this.notOpenedRuleOrDeclaration(true);
                }
            }

            else if (this.currType & DECLARATION) {
                return this.notOpenedRuleOrDeclaration(true);
            }
        },

        ',': function () {
            if (this.currType & FUNCTION) {
                if (this.buffer) {
                    this.add(new stylecow.Argument).add(new stylecow.Keyword(this.buffer));
                }

                this.down(new stylecow.Argument);

                return true;
            }

            if (this.currType & DECLARATION) {
                if (this.buffer) {
                    this.add(new stylecow.Value).add(new stylecow.Keyword(this.buffer));
                }

                this.down(new stylecow.Value);
                return true;
            }

            if (this.currType & VALUE) {
                if (this.buffer) {
                    this.add(new stylecow.Keyword(this.buffer));
                }

                var child = new stylecow[this.current.type];
                this.up().down(child);
                return true;
            }

            if (this.currType & RULE) {
                if (this.currType & IS_OPENED) {
                    this.down(new stylecow.Rule);
                }

                return this.notOpenedRuleOrDeclaration();
            }

            if (this.currType & SELECTOR) {
                this.selector();
                this.up().down(new stylecow.Selector);
                return true;
            }
        },

        '*': function () {
            return this.selectorOrRule();
        },

        '.': function () {
            return this.selectorOrRule();
        },

        '[': function () {
            return this.selectorOrRule();
        },

        '#': function () {
            return this.selectorOrRule();
        },

        '+': function () {
            return this.selectorOrRule(true);
        },

        '>': function () {
            return this.selectorOrRule(true);
        },

        '~': function () {
            return this.selectorOrRule(true);
        },

        ';': function () {
            if (this.currType & VALUE) {
                if (this.buffer) {
                    this.add(new stylecow.Keyword(this.buffer));
                }
                this.up().up();
                return true;
            }

            else if (this.currType & DECLARATION) {
                if (this.buffer) {
                    this.notOpenedRuleOrDeclaration();
                }
                this.up();
                return true;
            }
        },

        '(': function () {
            if (this.buffer) {
                if (this.currType & VALUE || this.currType & SELECTOR || this.currType & HAS_URL) {
                    this.down(new stylecow.Function(this.buffer));

                    if (uniqueArgumentFunctions.indexOf(this.buffer) !== -1) {
                        this.buffer = '';

                        while (this.next()) {
                            if (this.currChar === ')') {
                                return this[')']();
                            }

                            this.buffer += this.currChar;
                        }
                    }

                    this.down(new stylecow.Argument);
                    return true;
                }
            } else {
                if (this.currType & DECLARATION || (this.currType & RULE && !(this.currType & IS_OPENED))) {
                    return this.notOpenedRuleOrDeclaration();
                }
            }
        },

        ')': function () {
            if (this.current.type === 'Argument') {
                if (this.buffer) {
                    this.add(new stylecow.Keyword(this.buffer));
                }

                this.up().up();
                return true;
            }

            if (this.currType & FUNCTION) {
                if (this.buffer) {
                    this.add(new stylecow.Argument).add(new stylecow.Keyword(this.buffer));
                }

                this.up();
                return true;
            }
        },

        '&': function () {
            if (this.currType & RULE) {
                this.down(new stylecow.Rule);

                return this.notOpenedRuleOrDeclaration(true);
            }
        },

        '@': function () {
            if (this.currType & RULE) {
                this.buffer += this.currChar;

                while (this.next() && collapsedSpaces.indexOf(this.currChar) === -1) {
                    this.buffer += this.currChar;
                }

                var nested;

                if (atRulesTypes[this.buffer]) {
                    nested = atRulesTypes[this.buffer] & RULE;
                } else {
                    nested = this.isNested();
                }

                if (nested) {
                    this.down(new stylecow.NestedAtRule(this.buffer));
                } else {
                    this.down(new stylecow.AtRule(this.buffer));
                }

                return true;
            }
        },

        '/': function () {
            if (this.code[this.pos] === '*') {
                var c = '';

                this.next();

                while (this.next()) {
                    c += this.currChar;

                    if (this.currChar === '*' && this.code[this.pos] === '/') {
                        this.add(new stylecow.Comment(c.slice(0, -1)));
                        this.next();
                        return true;
                    }
                }
            }
        },

        selectorOrRule: function (operator) {
            if (this.currType & SELECTOR) {
                return this.selector(operator);
            }

            if (this.currType & RULE) {
                if (this.currType & IS_OPENED) {
                    this.down(new stylecow.Rule);
                }
                
                return this.notOpenedRuleOrDeclaration(operator);
            }
        },

        selector: function (operator) {
            if (this.buffer) {
                this.add(new stylecow.Keyword(this.buffer));
                this.buffer = '';
            }

            if (operator) {
                this.add(new stylecow.Keyword(this.currChar));
                return true;
            }
        },

        isNested: function () {
            var isNested = this.code.indexOf('{', this.pos);

            return (isNested !== -1 && isNested < this.code.indexOf(';', this.pos) && isNested < this.code.indexOf('}', this.pos));
        },

        notOpenedRuleOrDeclaration: function (operator) {
            if (this.currType & HAS_VALUE) {
                if ((this.buffer[0] !== '"' && this.buffer[0] !== "'") || !(this.currType & HAS_URL)) {
                    this.add(new stylecow.Value).add(new stylecow.Keyword(this.buffer));
                    this.currType = this.currType ^ HAS_VALUE;
                    return true;
                }
            }

            if (this.currType & HAS_URL) {
                var matches = this.buffer.trim().match(/^(url\(|'|")['"]?([^'"\)]+)/);

                if (matches) {
                    this.add(new stylecow.Function('url')).add(new stylecow.Argument).add(new stylecow.Keyword(matches[2]));
                    this.currType = this.currType ^ HAS_URL;
                    return true;
                }
            }

            if (this.currType & HAS_SELECTOR) {
                this.down(new stylecow.Selector);
                return this.selector(operator);
            }

            if (this.currType & HAS_CONDITION) {
                this.buffer += this.currChar;
                var deep = (this.currChar === '(') ? 1 : 0;

                while (this.next()) {
                    if (this.currChar === '(') {
                        ++deep;
                    }

                    else if (this.currChar === ')') {
                        --deep;
                    }

                    else if (!deep) {
                        if (this.currChar === '{') {
                            this.current.add(new stylecow.Condition(this.buffer.trim()));
                            this.currType = this.currType ^ HAS_CONDITION;
                            this.currType = this.currType | IS_OPENED;
                            return true;
                        }

                        else if (this.currChar === ';') {
                            this.current.add(new stylecow.Condition(this.buffer.trim()));
                            this.currType = this.currType ^ HAS_CONDITION;
                            this.up();
                            return true;
                        }
                    }

                    this.buffer += this.currChar;
                }
            }
        }
    };

    stylecow.parse = function (code, parent) {
        if (typeof parent === 'string') {
            parent = new stylecow[parent];
        } else {
            parent = parent || new stylecow.Root();
        }

        var parser = new Parser('' + code, parent);

        return parser.run();
    };

})(require('./index'));

},{"./index":51}],"stylecow-plugin-color":[function(require,module,exports){
//http://dev.w3.org/csswg/css-color/

var color = require('stylecow-color');

module.exports = function (stylecow) {

	stylecow.addTask({

		//Convert hex + alpha values to rgba values
		Keyword: function (keyword) {
			if (keyword.name[0] === '#' && (keyword.name.length === 5 || keyword.name.length === 9) && keyword.ancestor({type: 'Declaration'})) {
				var rgba = color.toRGBA(keyword.name);

				if (rgba[3] === 1) {
					keyword.name = '#' + color.RGBA_HEX(rgba);
				} else {
					keyword.replaceWith('rgba(' + color.toRGBA(keyword.name).join(',') + ')');
				}
			}
		},

		"Function": {

			//Convert gray() function to rgba/hex values
			gray: function (fn) {
				var rgba = color.toRGBA(fn.getContent(), 'gray');

				if (rgba[3] === 1) {
					fn.replaceWith('#' + color.RGBA_HEX(rgba));
				} else {
					fn.setContent(rgba);
					fn.name = 'rgba';
				}
			},

			//Convert color() function to rgba/hex values
			color: function (fn) {
				var args = fn[0];
				var rgba;

				rgba = color.toRGBA(args[0]);
				args[0].remove();

				args.forEach(function (adjust) {
					var args = adjust.getContent();

					switch (adjust.name) {
						case 'alpha':
						case 'a':
							rgba[3] = modify(rgba[3], args[0], 1);
							break;

						case 'red':
							rgba[0] = modify(rgba[0], args[0], 255);
							break;

						case 'green':
							rgba[1] = modify(rgba[1], args[0], 255);
							break;

						case 'blue':
							rgba[2] = modify(rgba[2], args[0], 255);
							break;

						case 'rgb':
							rgba[0] = modify(rgba[0], args[0], 255);
							rgba[1] = modify(rgba[1], args[1], 255);
							rgba[2] = modify(rgba[2], args[2], 255);
							break;

						case 'saturation':
						case 's':
							var hsla = color.RGBA_HSLA(rgba);
							hsla[1] = modify(hsla[1], args[0], 100);
							rgba = color.HSLA_RGBA(hsla);
							break;

						case 'lightness':
						case 'l':
							var hsla = color.RGBA_HSLA(rgba);
							hsla[2] = modify(hsla[2], args[0], 100);
							rgba = color.HSLA_RGBA(hsla);
							break;

						case 'whiteness':
						case 'w':
							var hwba = color.RGBA_HWBA(rgba);
							hwba[1] = modify(hwba[1], args[0], 100);
							rgba = color.HWBA_RGBA(hwba);
							break;

						case 'blackness':
						case 'b':
							var hwba = color.RGBA_HWBA(rgba);
							hwba[2] = modify(hwba[2], args[0], 100);
							rgba = color.HWBA_RGBA(hwba);
							break;

						case 'blend':
							var c = color.toRGBA(adjust[0][0]);
							var p = adjust[0][1].toString();

							rgba[0] = blend(rgba[0], c[0], p, 255);
							rgba[1] = blend(rgba[1], c[1], p, 255);
							rgba[2] = blend(rgba[2], c[2], p, 255);
							break;

						case 'blenda':
							var c = color.toRGBA(adjust[0][0]);
							var p = adjust[0][1].toString();

							rgba[0] = blend(rgba[0], c[0], p, 255);
							rgba[1] = blend(rgba[1], c[1], p, 255);
							rgba[2] = blend(rgba[2], c[2], p, 255);
							rgba[3] = blend(rgba[3], c[3], p, 1);
							break;

						case 'tint':
							rgba[0] = blend(rgba[0], 255, args[0], 255);
							rgba[1] = blend(rgba[1], 255, args[0], 255);
							rgba[2] = blend(rgba[2], 255, args[0], 255);
							break;

						case 'shade':
							rgba[0] = blend(rgba[0], 0, args[0], 255);
							rgba[1] = blend(rgba[1], 0, args[0], 255);
							rgba[2] = blend(rgba[2], 0, args[0], 255);
							break;

						case 'contrast':
							var hsla = color.RGBA_HSLA(rgba);
							var hwba = color.RGBA_HWBA(rgba);

							if (hsla[2] < 50) { //is dark +50%
								hwba[1] = modify(hwba[1], args[0], 100);
							} else {
								hwba[2] = modify(hwba[2], args[0], 100);
							}
							rgba = color.HWBA_RGBA(hwba);
					}
				});


				if (rgba[3] === 1) {
					fn.replaceWith('#' + color.RGBA_HEX(rgba));
				} else {
					fn.setContent(rgba).name = 'rgba';
				}
			}
		}
	});
};


function modify (base, value, max) {
	var mode;

	if (value[0] === '+' || value[0] === '-') {
		mode = value[0];
		value = value.substr(1);
	}

	if (value.indexOf('%') !== -1) {
		value = ((max / 100) * parseFloat(value, 10));
	} else {
		value = parseFloat(value, 10);
	}

	if (max === 1) {
		value = parseFloat(value.toFixed(2));
	} else {
		value = Math.round(value);
	}

	if (mode === '+') {
		base += value;
	} else if (mode === '-') {
		base -= value;
	} else {
		base = value;
	}

	if (base > max) {
		return max;
	}

	if (base < 0) {
		return 0;
	}

	return base;
}

function blend (base, value, percentage, max) {
	percentage = parseFloat(percentage);

	base = (base / 100) * percentage;
	value = (value / 100) * (100 - percentage);
	
	base += value;

	if (max === 1) {
		base = parseFloat(base.toFixed(2));
	} else {
		base = Math.round(base);
	}

	if (base > max) {
		return max;
	}

	if (base < 0) {
		return 0;
	}

	return base;
}

},{"stylecow-color":2}],"stylecow-plugin-fixes":[function(require,module,exports){
module.exports = function (stylecow) {
	require('./src/calc')(stylecow);
	require('./src/clip')(stylecow);
	require('./src/column-break')(stylecow);
	require('./src/float')(stylecow);
	require('./src/inline-block')(stylecow);
	require('./src/min-height')(stylecow);
	require('./src/opacity')(stylecow);
	require('./src/pseudoelements')(stylecow);
	require('./src/vmin')(stylecow);
};

},{"./src/calc":3,"./src/clip":4,"./src/column-break":5,"./src/float":6,"./src/inline-block":7,"./src/min-height":8,"./src/opacity":9,"./src/pseudoelements":10,"./src/vmin":11}],"stylecow-plugin-flex":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([
		
		// Old ms flex syntax
		{
			disable: {
				explorer: 11.0
			},
			Declaration: function (declaration) {
				if (declaration.is({
					name: 'display',
					value: ['flex', 'inline-flex']
				})) {
					return declaration.before('display: -ms-' + declaration.value + 'box');
				}
				
				if (declaration.name === 'flex-wrap') {
					return declaration.before('-ms-flex-wrap: ' + (declaration.value === 'nowrap' ? 'none' : declaration.value));
				}
				
				if (declaration.name === 'flex-grow') {
					return declaration.cloneBefore().name = '-ms-flex-positive';
				}
				
				if (declaration.name === 'flex-shrink') {
					return declaration.cloneBefore().name = '-ms-flex-negative';
				}
				
				if (declaration.name === 'order') {
					return declaration.cloneBefore().name = '-ms-flex-order';
				}
				
				if (declaration.name === 'justify-content') {
					return declaration.before('-ms-flex-pack: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-items') {
					return declaration.before('-ms-flex-align: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-self') {
					return declaration.before('-ms-flex-item-align: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-content') {
					return declaration.before('-ms-flex-line-pack: ' + alignmentValue(declaration.value));
				}

				if (declaration.is({name: /^flex/})) {
					return declaration.cloneBefore().name = '-ms-' + declaration.name;
				}
			}
		},

		// Old webkit flex syntax
		{
			disable: {
				chrome: 21.0,
				safari: 6.1,
				android: 4.4,
				ios: 7.0
			},
			Declaration: {
				display: function (declaration) {
					if (declaration.is({
						name: 'display',
						value: ['flex', 'inline-flex']
					})) {
						declaration.before('display: -webkit-' + declaration.value.replace('flex', 'box'));
					}
				},
				"flex-direction": function (declaration) {
					var orient, direction;

					switch (declaration.value) {
						case 'row':
							orient = 'horizontal';
							break;

						case 'row-reverse':
							orient = 'horizontal';
							direction = 'reverse';
							break;

						case 'column':
							orient = 'vertical';
							break;

						case 'column-reverse':
							orient = 'vertical';
							direction = 'reverse';
							break;

						default:
							return false;
					}

					declaration.before('-webkit-box-orient:' + orient);

					if (direction) {
						declaration.before('-webkit-box-direction:' + direction);
					}
				},
				order: function (declaration) {
					var value = (declaration.value == 0) ? 1 : property.value;

					declaration.before('-webkit-box-ordinal-group:' + value);
				},
				"justify-content": function (declaration) {
					var value = alignmentValue(declaration.value);

					if ((value === 'space-between') || (value === 'space-around')) {
						value = 'justify';
					}

					declaration.before('-webkit-box-pack:' + value);
				},
				"align-items": function (declaration) {
					declaration.before('-webkit-box-align:' + alignmentValue(declaration.value));
				},
				"flex-grow": function (declaration) {
					declaration.before('-webkit-box-flex:' + declaration.value);
				},
				"flex": function (declaration) {
					declaration.before('-webkit-box-flex:' + declaration.value);
				}
			}
		},

		// -webkit- vendor prefixes to new sintax
		{
			disable: {
				chrome: 21.0,
				safari: 6.1,
				android: 4.4,
				ios: 7.0
			},
			Declaration: function (declaration) {
				if (declaration.is({
					name: 'display',
					value: ['flex', 'inline-flex']
				})) {
					return declaration.cloneBefore().setContent('-webkit-' + declaration.value);
				}

				if (declaration.is({
					name: /^(flex.*|align.*|justify-content|order)$/
				})) {
					return declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		}
	]);
};

function alignmentValue (value) {
	if (value === 'flex-start') {
		return 'start';
	}

	if (value === 'flex-end') {
		return 'end';
	}

	return value;
}

},{}],"stylecow-plugin-initial":[function(require,module,exports){
var initials = {
	'animation': 'none',
	'animation-delay': '0',
	'animation-direction': 'normal',
	'animation-duration': '0',
	'animation-fill-mode': 'none',
	'animation-iteration-count': '1',
	'animation-name': 'none',
	'animation-play-state': 'running',
	'animation-timing-function': 'ease',
	'backface-visibility': 'visible',
	'background': '0',
	'background-attachment': 'scroll',
	'background-clip': 'border-box',
	'background-color': 'transparent',
	'background-image': 'none',
	'background-origin': 'padding-box',
	'background-position': '0 0',
	'background-repeat': 'repeat',
	'background-size': 'auto auto',
	'border': '0',
	'border-style': 'none',
	'border-width': 'medium',
	'border-color': 'inherit',
	'border-bottom': '0',
	'border-bottom-color': 'inherit',
	'border-bottom-left-radius': '0',
	'border-bottom-right-radius': '0',
	'border-bottom-style': 'none',
	'border-bottom-width': 'medium',
	'border-collapse': 'separate',
	'border-image': 'none',
	'border-left': '0',
	'border-left-color': 'inherit',
	'border-left-style': 'none',
	'border-left-width': 'medium',
	'border-radius': '0',
	'border-right': '0',
	'border-right-color': 'inherit',
	'border-right-style': 'none',
	'border-right-width': 'medium',
	'border-spacing': '0',
	'border-top': '0',
	'border-top-color': 'inherit',
	'border-top-left-radius': '0',
	'border-top-right-radius': '0',
	'border-top-style': 'none',
	'border-top-width': 'medium',
	'bottom': 'auto',
	'box-shadow': 'none',
	'box-sizing': 'content-box',
	'caption-side': 'top',
	'clear': 'none',
	'clip': 'auto',
	'color': 'inherit',
	'columns': 'auto',
	'column-count': 'auto',
	'column-fill': 'balance',
	'column-gap': 'normal',
	'column-rule': 'medium none currentColor',
	'column-rule-color': 'currentColor',
	'column-rule-style': 'none',
	'column-rule-width': 'none',
	'column-span': '1',
	'column-width': 'auto',
	'content': 'normal',
	'counter-increment': 'none',
	'counter-reset': 'none',
	'cursor': 'auto',
	'direction': 'ltr',
	'display': 'inline',
	'empty-cells': 'show',
	'float': 'none',
	'font': 'normal',
	'font-family': 'inherit',
	'font-size': 'medium',
	'font-style': 'normal',
	'font-variant': 'normal',
	'font-weight': 'normal',
	'height': 'auto',
	'hyphens': 'none',
	'left': 'auto',
	'letter-spacing': 'normal',
	'line-height': 'normal',
	'list-style': 'none',
	'list-style-image': 'none',
	'list-style-position': 'outside',
	'list-style-type': 'disc',
	'margin': '0',
	'margin-bottom': '0',
	'margin-left': '0',
	'margin-right': '0',
	'margin-top': '0',
	'max-height': 'none',
	'max-width': 'none',
	'min-height': '0',
	'min-width': '0',
	'opacity': '1',
	'orphans': '0',
	'outline': '0',
	'outline-color': 'invert',
	'outline-style': 'none',
	'outline-width': 'medium',
	'overflow': 'visible',
	'padding': '0',
	'padding-bottom': '0',
	'padding-left': '0',
	'padding-right': '0',
	'padding-top': '0',
	'page-break-after': 'auto',
	'page-break-before': 'auto',
	'page-break-inside': 'auto',
	'perspective': 'none',
	'perspective-origin': '50% 50%',
	'position': 'static',
	'right': 'auto',
	'tab-size': '8',
	'table-layout': 'auto',
	'text-align': 'inherit',
	'text-align-last': 'auto',
	'text-decoration': 'none',
	'text-decoration-color': 'inherit',
	'text-decoration-line': 'none',
	'text-decoration-style': 'solid',
	'text-indent': '0',
	'text-shadow': 'none',
	'text-transform': 'none',
	'top': 'auto',
	'transform': 'none',
	'transform-style': 'flat',
	'transition': 'none',
	'transition-delay': '0s',
	'transition-duration': '0s',
	'transition-property': 'none',
	'transition-timing-function': 'ease',
	'unicode-bidi': 'normal',
	'vertical-align': 'baseline',
	'visibility': 'visible',
	'white-space': 'normal',
	'widows': '0',
	'width': 'auto',
	'word-spacing': 'normal',
	'z-index': 'auto'
};

module.exports = function (stylecow) {

	stylecow.addTask({
		disable: {
			firefox: 19.0,
			chrome: 1.0,
			safari: 1.2,
			opera: 15.0,
			explorer: false
		},
		Declaration: function (declaration) {
			if (declaration.value === 'initial') {
				declaration.setContent(initials[declaration.name] || 'inherit');
			}
		}
	});
};

},{}],"stylecow-plugin-matches":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask({
		"Function": {
			":matches": function (fn) {
				var selector = fn.parent({type: 'Selector'});
				var value = selector.toString();
				var search = fn.toString();

				fn.getContent().forEach(function (replace) {
					selector.before(new stylecow.Selector()).setContent(value.replace(search, replace));
				});

				selector.remove();
			}
		}
	});
};

},{}],"stylecow-plugin-nested-rules":[function(require,module,exports){
module.exports = function (stylecow) {

	var operators = ['>', '~', '+'];

	stylecow.addTask({
		Rule: function (rule) {
			var ruleSelectors = rule.children({type: 'Selector'});
			var index = rule.index();

			var i = 0;

			rule.children({type: 'Rule'}).forEach(function (child) {
				child.children({type: 'Selector'}).forEach(function (childSelector) {
					var prepend;

					if (childSelector[0].name === '&') {
						childSelector[0].remove();
						prepend = /^\w/.test(childSelector[0].name);
					} else if (operators.indexOf(childSelector[0].name) === -1) {
						childSelector.unshift(new stylecow.Keyword(' '));
					}

					ruleSelectors.forEach(function (ruleSelector) {
						var selector = child.add(new stylecow.Selector);

						if (prepend) {
							ruleSelector.slice(0, -1).forEach(function (child) {
								selector.push(child.clone());
							});

							childSelector.slice(0, 1).forEach(function (child) {
								selector.push(child.clone());
							});

							ruleSelector.slice(-1).forEach(function (child) {
								selector.push(child.clone());
							});

							childSelector.slice(1).forEach(function (child) {
								selector.push(child.clone());
							});
						} else {
							ruleSelector.forEach(function (child) {
								selector.push(child.clone());
							});

							childSelector.forEach(function (child) {
								selector.push(child.clone());
							});
						}
					});

					childSelector.remove();
				});

				var prev = child.prev();

				rule.parent().add(child, index + i + 1);

				if (prev.type === 'Comment') {
					child.before(prev);
					++i;
				}

				++i;
			});

			if (rule.children({type: 'Selector'}).length === rule.length) {
				rule.remove();
			}
		}
	});
};

},{}],"stylecow-plugin-prefixes":[function(require,module,exports){
module.exports = function (stylecow) {
	require('./src/animation')(stylecow);
	require('./src/appearance')(stylecow);
	require('./src/background')(stylecow);
	require('./src/border')(stylecow);
	require('./src/box-shadow')(stylecow);
	require('./src/box-sizing')(stylecow);
	require('./src/calc')(stylecow);
	require('./src/column')(stylecow);
	require('./src/cursor')(stylecow);
	require('./src/document')(stylecow);
	require('./src/fullscreen')(stylecow);
	require('./src/inline-block')(stylecow);
	require('./src/linear-gradient')(stylecow);
	require('./src/grid')(stylecow);
	require('./src/mask')(stylecow);
	require('./src/object')(stylecow);
	require('./src/pseudoelements')(stylecow);
	require('./src/region')(stylecow);
	require('./src/sizing')(stylecow);
	require('./src/sticky')(stylecow);
	require('./src/transform')(stylecow);
	require('./src/transition')(stylecow);
	require('./src/typography')(stylecow);
	require('./src/user-select')(stylecow);
};

},{"./src/animation":12,"./src/appearance":13,"./src/background":14,"./src/border":15,"./src/box-shadow":16,"./src/box-sizing":17,"./src/calc":18,"./src/column":19,"./src/cursor":20,"./src/document":21,"./src/fullscreen":22,"./src/grid":23,"./src/inline-block":24,"./src/linear-gradient":25,"./src/mask":26,"./src/object":27,"./src/pseudoelements":28,"./src/region":29,"./src/sizing":30,"./src/sticky":31,"./src/transform":32,"./src/transition":33,"./src/typography":34,"./src/user-select":35}],"stylecow-plugin-rem":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask({
		disable: {
			firefox: 3.6,
			explorer: 9.0,
			safari: 5.0,
			opera: 11.6,
			ios: 4.0
		},

		//Set the default value of a rem (16px)
		RootBefore: function (root) {
			root.setData('rem', 16);
		},

		//Changes the default value on :root or html selectors
		RuleBefore: function (rule) {
			if (rule.hasChild({type: 'Selector', string: [':root', 'html']})) {
				rule.children({type: 'Declaration', name: 'font-size'}).forEach(function (declaration) {
					rule.parent({type: 'Root'}).setData('rem', toPixels(declaration.getContent().join(', ')));
				});
			}
		},

		//Add the fallback
		Declaration: function (declaration) {
			var value = declaration.getContent().join(', ');

			if (value.indexOf('rem') === -1) {
				return false;
			}

			declaration.cloneBefore().setContent(value.replace(/([0-9\.]+)rem/, function (match) {
				if (match[0] === '.') {
					match = '0' + match;
				}

				return (declaration.getData('rem') * parseFloat(match, 10)) + 'px';
			}));
		}
	});
};

function toPixels (value) {
	if (value[0] === '.') {
		value = '0' + value;
	}

	if (value.indexOf('px') !== -1) {
		return parseInt(value, 10);
	}

	if (value.indexOf('em') !== -1) {
		return parseFloat(value, 10) * 16;
	}

	if (value.indexOf('pt') !== -1) {
		return parseFloat(value, 10) * 14;
	}

	if (value.indexOf('%') !== -1) {
		return parseFloat(value, 10)/100 * 16;
	}

	return 16;
};

},{}],"stylecow-plugin-variables":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask({

		//Use var() function
		"Function": {
			var: function (fn) {
				var arguments = fn.getContent();
				var value = fn.parent({type: 'Rule'}).getData(arguments[0]);

				if (value) {
					if (fn.parent().is({type: ['Value', 'Argument']}) && (value.length > 1)) {
						return fn.parent().setContent(value);
					}

					return fn.replaceWith(value.join(' '));
				}

				if (arguments[1]) {
					fn.replaceWith(arguments[1]);
				}
			}
		},

		//Save new --variables
		Declaration: function (declaration) {
			if (declaration.name.indexOf('--') === 0) {
				var rule = declaration.parent({type: 'Rule'});

				if (rule.hasChild({type: 'Selector', string: [':root', 'html']})) {
					rule.parent({type: 'Root'}).setData(declaration.name, declaration.getContent());
				} else {
					rule.setData(declaration.name, declaration.getContent());
				}

				declaration.remove();
			}
		}
	});
};

},{}]},{},["./js/main"]);
