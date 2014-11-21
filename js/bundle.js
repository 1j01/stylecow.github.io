require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./js/main":[function(require,module,exports){
var stylecow = require('stylecow');

module.exports = function (code, plugins, support) {
	stylecow.setConfig({
		support: support,
		plugins: plugins,
	});

	return stylecow.convert(code).toString();
}

},{"stylecow":57}],1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":3,"ieee754":4,"is-array":5}],3:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],4:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],5:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],6:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":7}],7:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],8:[function(require,module,exports){
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
				return color.toRGBA(value.getContent(), value.name);
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([

		// adds -moz- vendor prefix
		{
			disable: {
				firefox: 10.0
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.parent({type: 'Declaration'}).cloneBefore().search({type: 'Function', name: 'linear-gradient'}).forEach(function (fn) {
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
					fn.parent({type: 'Declaration'}).cloneBefore().search({type: 'Function', name: 'linear-gradient'}).forEach(function (fn) {
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
					fn.parent({type: 'Declaration'}).cloneBefore().search({type: 'Function', name: 'linear-gradient'}).forEach(function (fn) {
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
					fn.parent({type: 'Declaration'}).cloneBefore().search({type: 'Function', name: 'linear-gradient'}).forEach(function (fn) {
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
						fn.setContent(newArgs);
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
(function (Buffer){
(function (stylecow) {
	var SourceMapGenerator = require('source-map').SourceMapGenerator;
	var sourceMapTransfer = require('multi-stage-sourcemap').transfer;
	var fs = require('fs');
	var path = require('path');

	stylecow.Code = function (css, options) {
		options = options || {};

		this.file = options.file || '';
		this.sourceMap = options.sourceMap;
		this.indentStr = '';
		this.indent = [];
		this.column = 1;
		this.line = 1;
		this.code = '';
		this.map = false;
		this.style = stylecow.Code.styles[options.style || 'normal'];

		if (!this.style) {
			throw new stylecow.Error('Code style not valid', {
				style: options.style
			});
		}

		if (this.sourceMap) {
			if (this.sourceMap === 'embed' || this.sourceMap === true) {
				this.sourceMapRoot = path.dirname(this.file);
			} else {
				this.sourceMapRoot = path.dirname(this.sourceMap);
			}

			this.map = new SourceMapGenerator({
				file: path.relative(this.sourceMapRoot, this.file),
				root: path.resolve(stylecow.cwd(), path.dirname(this.sourceMapRoot))
			});

			//find the previous sourceMap for multi-level source maps
			if (options.previousSourceMap === undefined) {
				var comment = css.firstChild({
					type: 'Comment',
					name: /^[#@]\ssourceMappingURL=/
				});

				if (comment) {
					var inlineSourceMap = comment.name.split('sourceMappingURL=')[1].trim();
					comment.remove();

					if (inlineSourceMap.indexOf('data:application/json;base64,') === 0) {
						options.previousSourceMap = JSON.parse((new Buffer(inlineSourceMap.substr(29), 'base64')).toString());
					} else {
						var rel = path.resolve(stylecow.cwd(), path.dirname(css.getData('sourceFile')) || '');
						options.previousSourceMap = JSON.parse(fs.readFileSync(path.resolve(rel, inlineSourceMap)));
					}
				}
			}

			css.toCode(this);

			if (options.previousSourceMap) {
				this.map = JSON.parse(sourceMapTransfer({
					fromSourceMap: this.map.toString(),
					toSourceMap: options.previousSourceMap
				}));
			} else {
				this.map = this.map.toJSON();
			}

			if (this.sourceMap === 'embed') {
				this.code += '\n/*# sourceMappingURL=data:application/json;base64,' + (new Buffer(JSON.stringify(this.map))).toString('base64') + ' */\n';
			} else if (typeof this.sourceMap === 'string') {
				this.code += '\n/*# sourceMappingURL=' + path.relative(path.dirname(this.file), this.sourceMap) + ' */\n';
			}
		} else {
			css.toCode(this);
		}
	}

	stylecow.Code.styles = {
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

	stylecow.Code.prototype = {
		save: function () {
			save(this.file, this.code);

			if ((typeof this.sourceMap === 'string') && this.sourceMap !== 'embed') {
				save(this.sourceMap, JSON.stringify(this.map));
			}
		},
		append: function (code, original) {
			if (this.map && original) {
				this.map.addMapping({
					generated: {
						line: this.line,
						column: this.column
					},
					source: path.relative(this.sourceMapRoot, original.getData('sourceFile')),
					original: {
						line: original.getData('sourceLine'),
						column: original.getData('sourceColumn')
					},
					name: code
				});
			}

			for (var i = 0, l = code.length; i < l; i++) {
				this.code += code[i];

				if (code[i] === '\n') {
					++this.line;
					this.code += this.indentStr;
					this.column = this.indentStr.length;
				} else {
					++this.column;
				}
			}
		},
		pushIndent: function (code) {
			this.indent.push(code);
			this.indentStr = this.indent.join('');
		},
		popIndent: function () {
			this.indent.pop();
			this.indentStr = this.indent.join('');
		}
	};

	function save (file, content) {
		file = path.resolve(stylecow.cwd(), file);

		var dir = path.dirname(file);

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		fs.writeFileSync(file, content);
	}

})(require('./index'));

}).call(this,require("buffer").Buffer)
},{"./index":57,"buffer":2,"fs":1,"multi-stage-sourcemap":59,"path":6,"source-map":61}],43:[function(require,module,exports){
(function (stylecow) {

	stylecow.Argument = function () {
		this.type = 'Argument';
	};

	stylecow.Argument.prototype = Object.create(stylecow.Base, {
		toString: {
			value: function () {
				return this.join(' ');
			}
		},

		toCode: {
			value: function (code) {
				var latest = this.length - 1;

				this.forEach(function (child, k) {
					child.toCode(code);

					if (k !== latest) {
						code.append(' ');
					}
				});
			}
		}
	});
})(require('../index'));

},{"../index":57}],44:[function(require,module,exports){
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
			value: function (code) {
				code.append('@' + this._name + ' ', this);

				var latest = this.length - 1;

				this.forEach(function (child, k) {
					child.toCode(code);

					if (k !== latest) {
						code.append(code.style.valueJoiner);
					}
				});

				code.append(code.style.ruleEnd);
			}
		}
	});

})(require('../index'));

},{"../index":57}],45:[function(require,module,exports){
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
				if (this._data && (key in this._data)) {
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

		try {
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
		} catch (error) {
			throw new stylecow.Error('Error executing a task', {
				line: element.getData('sourceLine'),
				column: element.getData('sourceColumn'),
				file: element.getData('sourceFile'),
				error: error
			});
		}
	}

})(require('../index'));

},{"../index":57}],46:[function(require,module,exports){
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
			value: function (code) {
				if (!this._name || code.style.comments === 'none' || (code.style.comments === 'important' && !this.important)) {
					return false;
				}

				code.append(code.style.commentStart + this._name + code.style.commentEnd, this);
			}
		}
	});
})(require('../index'));

},{"../index":57}],47:[function(require,module,exports){
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
		},

		toCode: {
			value: function (code) {
				code.append(this.name, this);
			}
		}
	});
})(require('../index'));

},{"../index":57}],48:[function(require,module,exports){
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
			value: function (code) {
				code.append(this.name + code.style.ruleColon, this);

				var latest = this.length - 1;

				this.forEach(function (child, k) {
					child.toCode(code);

					if (k !== latest) {
						code.append(code.style.valueJoiner);
					}
				});

				code.append(code.style.ruleEnd);
			}
		}
	});
})(require('../index'));

},{"../index":57}],49:[function(require,module,exports){
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
			value: function (code) {
				code.append(this.name + '(', this);

				var latest = this.length - 1;

				this.forEach(function (child, k) {
					child.toCode(code);

					if (k !== latest) {
						code.append(code.style.argumentJoiner);
					}
				});

				code.append(')');
			}
		}
	});
})(require('../index'));

},{"../index":57}],50:[function(require,module,exports){
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
		},

		toCode: {
			value: function (code) {
				code.append(this.toString(), this);
			}
		}
	});
})(require('../index'));

},{"../index":57}],51:[function(require,module,exports){
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
			value: function (code) {
				var latest;
				var content = [];
				var conditions = [];
				var selectors = [];
				var values = [];

				code.append('@' + this._name, this);

				this.forEach(function (child) {
					if (child.type === 'Selector') {
						selectors.push(child);
					} else if (child.type === 'Condition') {
						conditions.push(child);
					} else if (child.type === 'Value') {
						values.push(child);
					} else {
						content.push(child);
					}
				});

				if (selectors.length) {
					code.append(' ');

					latest = selectors.length - 1;

					selectors.forEach(function (child, k) {
						child.toCode(code);

						if (k !== latest) {
							code.append(code.style.selectorJoiner);
						}
					});
				}

				if (conditions.length) {
					conditions.forEach(function (child, k) {
						code.append(' ');
						child.toCode(code);
					});
				}

				if (values.length) {
					values.forEach(function (child, k) {
						code.append(' ');
						child.toCode(code);
					});
				}

				code.pushIndent(code.style.indent);
				code.append(code.style.rulesetStart);

				latest = content.length - 1;

				content.forEach(function (child, k) {
					child.toCode(code);
					
					if (k !== latest) {
						code.append(code.style.linebreak);
					}
				});

				code.popIndent();
				code.append(code.style.rulesetEnd);
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

},{"../index":57}],52:[function(require,module,exports){
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
			value: function (code) {
				this.forEach(function (child) {
					child.toCode(code);

					code.append(code.style.linebreak);
				});
			}
		}
	});
})(require('../index'));

},{"../index":57}],53:[function(require,module,exports){
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
			value: function (code) {
				var latest;
				var selectors = [];
				var content = [];

				this.forEach(function (child) {
					if (child.type === 'Selector') {
						selectors.push(child);
					} else {
						content.push(child);
					}
				});

				latest = selectors.length - 1;

				selectors.forEach(function (child, k) {
					child.toCode(code);

					if (k !== latest) {
						code.append(code.style.selectorJoiner);
					}
				});

				code.pushIndent(code.style.indent);
				code.append(code.style.rulesetStart);

				latest = content.length - 1;

				content.forEach(function (child, k) {
					child.toCode(code);
					
					if (k !== latest) {
						code.append(code.style.linebreak);
					}
				});

				code.popIndent();
				code.append(code.style.rulesetEnd);
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

	function appendCode (info, code) {
		for (var i = 0, l = code.length; i < l; i++) {
			info.code += code[i];

			if (code[i] === "\n") {
				++info.line;
				info.column = 0;
			} else {
				++info.column;
			}
		}
	}

})(require('../index'));

},{"../index":57}],54:[function(require,module,exports){
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
			value: function (code) {
				this.forEach(function (child) {
					child.toCode(code);
				});
			}
		}
	});
})(require('../index'));

},{"../index":57}],55:[function(require,module,exports){
(function (stylecow) {

	stylecow.Value = function () {
		this.type = 'Value';
	};

	stylecow.Value.prototype = Object.create(stylecow.Argument.prototype);
})(require('../index'));

},{"../index":57}],56:[function(require,module,exports){
(function (stylecow) {

	stylecow.Error = function (message, data) {
		this.message = message;
		this.data = data;
	};

	stylecow.Error.prototype = {

		toString: function () {
			var string = this.message;

			for (var key in this.data) {
				if (this.data.hasOwnProperty(key)) {
					if (this.data[key] instanceof Error) {
						string += printError(this.data[key]);
					} else {
						string += printInfo(key, this.data[key]);
					}
				}
			}

			return string;
		},

		toCode: function () {
			var code = 'body > * {'
					+ 'display: none;'
				+ '}'
				+ 'body::before {'
					+ 'content: "' + this.toString().replace(/\n/g, ' \\A ').replace(/"/, '\\"') + '";'
					+ 'background: white;'
					+ 'color: black;'
					+ 'font-family: monospace;'
					+ 'white-space: pre;'
				+ '}';

			return code;
		}
	};

	function printInfo (key, name) {
		return '\n' + key + ': ' + name;
	}

	function printError (error) {
		var string = '\nError: ' + error.message;

		if (error.fileName) {
			string += '\nError file: ' + error.fileName;
		}

		if (error.lineNumber) {
			string += '\nError line: ' + error.lineNumber;
		}

		string += '\n' + error.stack;

		return string;
	}
})(require('./index'));

},{"./index":57}],57:[function(require,module,exports){
(function (process){
(function (stylecow) {
	var fs = require('fs');
	var path = require('path');


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
	require('./code');
	require('./parser');


	//Properties
	stylecow.pluginPrefix = 'stylecow-plugin-';
	stylecow.support = {};
	stylecow.tasks = {};


	//Change the current directory
	var cwd = process.cwd();

	stylecow.cwd = function (newCwd) {
		if (newCwd === undefined) {
			return cwd;
		}
		cwd = newCwd;
	};


	//Default config
	stylecow.defaults = {
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


	//Create from code string
	stylecow.create = function (code) {
		return stylecow.parse(code);
	};


	//Read a css file
	stylecow.createFromFile = function (file) {
		var fullfile = path.resolve(stylecow.cwd(), file);

		if (!fs.existsSync(fullfile)) {
			throw new stylecow.Error('Input file `' + fullfile + '` not found');
		}

		return stylecow.create(fs.readFileSync(fullfile, 'utf8')).setData('sourceFile', file);
	};

	//Merges two css files
	stylecow.merge = function (to, from) {
		var sourceFile = from.getData('sourceFile');

		from.children().forEach(function (child) {
			child.setData('sourceFile', sourceFile);
			to.push(child);
		});
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
		stylecow.tasks = {};

		if (config.plugins) {
			config.plugins.forEach(function (name) {
				if (name[0] === '.' || name[0] === '/') {
					require(name)(stylecow);
				} else {
					require(stylecow.pluginPrefix + name)(stylecow);
				}
			});
		}
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

}).call(this,require('_process'))
},{"./code":42,"./css/argument":43,"./css/atrule":44,"./css/base":45,"./css/comment":46,"./css/condition":47,"./css/declaration":48,"./css/function":49,"./css/keyword":50,"./css/nested-atrule":51,"./css/root":52,"./css/rule":53,"./css/selector":54,"./css/value":55,"./error":56,"./index":57,"./parser":58,"_process":7,"fs":1,"path":6}],58:[function(require,module,exports){
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
            this.col = 1;
            this.line = 1;
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
                this.col = 1;
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

        try {
            return parser.run();
        } catch (error) {
            throw new stylecow.Error('Error parsing the css code', {
                line: parser.line,
                column: parser.col,
                buffer: parser.buffer,
                error: error
            });
        }
    };

})(require('./index'));

},{"./index":57}],59:[function(require,module,exports){
/**
 * Created by azu on 2014/07/02.
 * LICENSE : MIT
 */
"use strict";
module.exports = {
    transfer: require("./lib/multi-stage-sourcemap")
};
},{"./lib/multi-stage-sourcemap":60}],60:[function(require,module,exports){
"use strict";
var sourceMap = require("source-map");
var Generator = sourceMap.SourceMapGenerator;
var Consumer = sourceMap.SourceMapConsumer;
/**
 * return re-mapped rawSourceMap string
 * @param {object} mappingObject
 * @param {string} mappingObject.fromSourceMap
 * @param {string} mappingObject.toSourceMap
 * @returns {string}
 */
function transfer(mappingObject) {
    var fromSourceMap = mappingObject.fromSourceMap;
    var toSourceMap = mappingObject.toSourceMap;
    var fromSMC = new Consumer(fromSourceMap);
    var toSMC = new Consumer(toSourceMap);
    var resultMap = new Generator();
    fromSMC.eachMapping(function (mapping) {
        var generatedPosition = {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
        };
        var fromOriginalPosition = {
            line: mapping.originalLine,
            column: mapping.originalColumn
        };
        // from's generated position -> to's original position
        var originalPosition = toSMC.originalPositionFor(fromOriginalPosition);
        if (originalPosition.source !== null) {
            resultMap.addMapping({
                source: originalPosition.source,
                name : originalPosition.name,
                generated: generatedPosition,
                original: originalPosition
            });
        }
    });
    return resultMap.toString();
}

module.exports = transfer;
},{"source-map":61}],61:[function(require,module,exports){
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = require('./source-map/source-map-generator').SourceMapGenerator;
exports.SourceMapConsumer = require('./source-map/source-map-consumer').SourceMapConsumer;
exports.SourceNode = require('./source-map/source-node').SourceNode;

},{"./source-map/source-map-consumer":66,"./source-map/source-map-generator":67,"./source-map/source-node":68}],62:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet() {
    this._array = [];
    this._set = {};
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var isDuplicate = this.has(aStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      this._set[util.toSetString(aStr)] = idx;
    }
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    return Object.prototype.hasOwnProperty.call(this._set,
                                                util.toSetString(aStr));
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (this.has(aStr)) {
      return this._set[util.toSetString(aStr)];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  exports.ArraySet = ArraySet;

});

},{"./util":69,"amdefine":70}],63:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64 = require('./base64');

  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string via the out parameter.
   */
  exports.decode = function base64VLQ_decode(aStr, aOutParam) {
    var i = 0;
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (i >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }
      digit = base64.decode(aStr.charAt(i++));
      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aStr.slice(i);
  };

});

},{"./base64":64,"amdefine":70}],64:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var charToIntMap = {};
  var intToCharMap = {};

  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    .split('')
    .forEach(function (ch, index) {
      charToIntMap[ch] = index;
      intToCharMap[index] = ch;
    });

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  exports.encode = function base64_encode(aNumber) {
    if (aNumber in intToCharMap) {
      return intToCharMap[aNumber];
    }
    throw new TypeError("Must be between 0 and 63: " + aNumber);
  };

  /**
   * Decode a single base 64 digit to an integer.
   */
  exports.decode = function base64_decode(aChar) {
    if (aChar in charToIntMap) {
      return charToIntMap[aChar];
    }
    throw new TypeError("Not a valid base 64 digit: " + aChar);
  };

});

},{"amdefine":70}],65:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   */
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the next
    //      closest element that is less than that element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element which is less than the one we are searching for, so we
    //      return null.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      // Found the element we are looking for.
      return aHaystack[mid];
    }
    else if (cmp > 0) {
      // aHaystack[mid] is greater than our needle.
      if (aHigh - mid > 1) {
        // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
      }
      // We did not find an exact match, return the next closest one
      // (termination case 2).
      return aHaystack[mid];
    }
    else {
      // aHaystack[mid] is less than our needle.
      if (mid - aLow > 1) {
        // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
      }
      // The exact needle element was not found in this haystack. Determine if
      // we are in termination case (2) or (3) and return the appropriate thing.
      return aLow < 0
        ? null
        : aHaystack[aLow];
    }
  }

  /**
   * This is an implementation of binary search which will always try and return
   * the next lowest value checked if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   */
  exports.search = function search(aNeedle, aHaystack, aCompare) {
    return aHaystack.length > 0
      ? recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare)
      : null;
  };

});

},{"amdefine":70}],66:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');
  var binarySearch = require('./binary-search');
  var ArraySet = require('./array-set').ArraySet;
  var base64VLQ = require('./base64-vlq');

  /**
   * A SourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names, true);
    this._sources = ArraySet.fromArray(sources, true);

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this.file = file;
  }

  /**
   * Create a SourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns SourceMapConsumer
   */
  SourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap(aSourceMap) {
      var smc = Object.create(SourceMapConsumer.prototype);

      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot);
      smc.file = aSourceMap._file;

      smc.__generatedMappings = aSourceMap._mappings.slice()
        .sort(util.compareByGeneratedPositions);
      smc.__originalMappings = aSourceMap._mappings.slice()
        .sort(util.compareByOriginalPositions);

      return smc;
    };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._sources.toArray().map(function (s) {
        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
      }, this);
    }
  });

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    get: function () {
      if (!this.__generatedMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    get: function () {
      if (!this.__originalMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  SourceMapConsumer.prototype._nextCharIsMappingSeparator =
    function SourceMapConsumer_nextCharIsMappingSeparator(aStr) {
      var c = aStr.charAt(0);
      return c === ";" || c === ",";
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var str = aStr;
      var temp = {};
      var mapping;

      while (str.length > 0) {
        if (str.charAt(0) === ';') {
          generatedLine++;
          str = str.slice(1);
          previousGeneratedColumn = 0;
        }
        else if (str.charAt(0) === ',') {
          str = str.slice(1);
        }
        else {
          mapping = {};
          mapping.generatedLine = generatedLine;

          // Generated column.
          base64VLQ.decode(str, temp);
          mapping.generatedColumn = previousGeneratedColumn + temp.value;
          previousGeneratedColumn = mapping.generatedColumn;
          str = temp.rest;

          if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
            // Original source.
            base64VLQ.decode(str, temp);
            mapping.source = this._sources.at(previousSource + temp.value);
            previousSource += temp.value;
            str = temp.rest;
            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
              throw new Error('Found a source, but no line and column');
            }

            // Original line.
            base64VLQ.decode(str, temp);
            mapping.originalLine = previousOriginalLine + temp.value;
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;
            str = temp.rest;
            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
              throw new Error('Found a source and line, but no column');
            }

            // Original column.
            base64VLQ.decode(str, temp);
            mapping.originalColumn = previousOriginalColumn + temp.value;
            previousOriginalColumn = mapping.originalColumn;
            str = temp.rest;

            if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
              // Original name.
              base64VLQ.decode(str, temp);
              mapping.name = this._names.at(previousName + temp.value);
              previousName += temp.value;
              str = temp.rest;
            }
          }

          this.__generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            this.__originalMappings.push(mapping);
          }
        }
      }

      this.__generatedMappings.sort(util.compareByGeneratedPositions);
      this.__originalMappings.sort(util.compareByOriginalPositions);
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  SourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator);
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  SourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      var mapping = this._findMapping(needle,
                                      this._generatedMappings,
                                      "generatedLine",
                                      "generatedColumn",
                                      util.compareByGeneratedPositions);

      if (mapping && mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source != null && this.sourceRoot != null) {
          source = util.join(this.sourceRoot, source);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: util.getArg(mapping, 'name', null)
        };
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * availible.
   */
  SourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor(aSource) {
      if (!this.sourcesContent) {
        return null;
      }

      if (this.sourceRoot != null) {
        aSource = util.relative(this.sourceRoot, aSource);
      }

      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)];
      }

      var url;
      if (this.sourceRoot != null
          && (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
        if (url.scheme == "file"
            && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == "/")
            && this._sources.has("/" + aSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
        }
      }

      throw new Error('"' + aSource + '" is not in the SourceMap.');
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };

      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }

      var mapping = this._findMapping(needle,
                                      this._originalMappings,
                                      "originalLine",
                                      "originalColumn",
                                      util.compareByOriginalPositions);

      if (mapping) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null)
        };
      }

      return {
        line: null,
        column: null
      };
    };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      var sourceRoot = this.sourceRoot;
      mappings.map(function (mapping) {
        var source = mapping.source;
        if (source != null && sourceRoot != null) {
          source = util.join(sourceRoot, source);
        }
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name
        };
      }).forEach(aCallback, context);
    };

  exports.SourceMapConsumer = SourceMapConsumer;

});

},{"./array-set":62,"./base64-vlq":63,"./binary-search":65,"./util":69,"amdefine":70}],67:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64VLQ = require('./base64-vlq');
  var util = require('./util');
  var ArraySet = require('./array-set').ArraySet;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util.getArg(aArgs, 'file', null);
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = [];
    this._sourcesContents = null;
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator.fromSourceMap =
    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };

        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };

          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }

        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);

      this._validateMapping(generated, original, source, name);

      if (source != null && !this._sources.has(source)) {
        this._sources.add(source);
      }

      if (name != null && !this._names.has(name)) {
        this._names.add(name);
      }

      this._mappings.push({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }

      if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = {};
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
  SourceMapGenerator.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
            'or the source map\'s "file" property. Both were omitted.'
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      // Make "sourceFile" relative if an absolute Url is passed.
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet();
      var newNames = new ArraySet();

      // Find mappings for the "sourceFile"
      this._mappings.forEach(function (mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            // Copy mapping
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source)
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }

        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }

        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }

      }, this);
      this._sources = newSources;
      this._names = newNames;

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util.join(aSourceMapPath, sourceFile);
          }
          if (sourceRoot != null) {
            sourceFile = util.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var mapping;

      // The mappings must be guaranteed to be in sorted order before we start
      // serializing them or else the generated line numbers (which are defined
      // via the ';' separators) will be all messed up. Note: it might be more
      // performant to maintain the sorting as we insert them, rather than as we
      // serialize them, but the big O is the same either way.
      this._mappings.sort(util.compareByGeneratedPositions);

      for (var i = 0, len = this._mappings.length; i < len; i++) {
        mapping = this._mappings[i];

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            result += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            if (!util.compareByGeneratedPositions(mapping, this._mappings[i - 1])) {
              continue;
            }
            result += ',';
          }
        }

        result += base64VLQ.encode(mapping.generatedColumn
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;

        if (mapping.source != null) {
          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
                                     - previousSource);
          previousSource = this._sources.indexOf(mapping.source);

          // lines are stored 0-based in SourceMap spec version 3
          result += base64VLQ.encode(mapping.originalLine - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;

          result += base64VLQ.encode(mapping.originalColumn
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;

          if (mapping.name != null) {
            result += base64VLQ.encode(this._names.indexOf(mapping.name)
                                       - previousName);
            previousName = this._names.indexOf(mapping.name);
          }
        }
      }

      return result;
    };

  SourceMapGenerator.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
                                                    key)
          ? this._sourcesContents[key]
          : null;
      }, this);
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }

      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this);
    };

  exports.SourceMapGenerator = SourceMapGenerator;

});

},{"./array-set":62,"./base64-vlq":63,"./util":69,"amdefine":70}],68:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;
  var util = require('./util');

  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
  // operating systems these days (capturing the result).
  var REGEX_NEWLINE = /(\r?\n)/;

  // Matches a Windows-style newline, or any character.
  var REGEX_CHARACTER = /\r\n|[\s\S]/g;

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   * @param aRelativePath Optional. The path that relative sources in the
   *        SourceMapConsumer should be relative to.
   */
  SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode();

      // All even indices of this array are one line of the generated code,
      // while all odd indices are the newlines between two adjacent lines
      // (since `REGEX_NEWLINE` captures its match).
      // Processed fragments are removed from this array, by calling `shiftNextLine`.
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var shiftNextLine = function() {
        var lineContents = remainingLines.shift();
        // The last line of a file might not have a newline.
        var newLine = remainingLines.shift() || "";
        return lineContents + newLine;
      };

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null;

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping !== null) {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            var code = "";
            // Associate first line with "lastMapping"
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
            // The remaining code is added without mapping
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[0];
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn);
            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            // No more remaining code, continue
            lastMapping = mapping;
            return;
          }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[0];
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[0] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      // We have processed all mappings.
      if (remainingLines.length > 0) {
        if (lastMapping) {
          // Associate the remaining code in the current line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        // and add the remaining lines without any mapping
        node.add(remainingLines.join(""));
      }

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });

      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code);
        } else {
          var source = aRelativePath
            ? util.join(aRelativePath, mapping.source)
            : mapping.source;
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  source,
                                  code,
                                  mapping.name));
        }
      }
    };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk instanceof SourceNode) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
                       line: this.line,
                       column: this.column,
                       name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild instanceof SourceNode) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i] instanceof SourceNode) {
          this.children[i].walkSourceContents(aFn);
        }
      }

      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null
          && original.line !== null
          && original.column !== null) {
        if(lastOriginalSource !== original.source
           || lastOriginalLine !== original.line
           || lastOriginalColumn !== original.column
           || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      chunk.match(REGEX_CHARACTER).forEach(function (ch, idx, array) {
        if (REGEX_NEWLINE.test(ch)) {
          generated.line++;
          generated.column = 0;
          // Mappings end at eol
          if (idx + 1 === array.length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column += ch.length;
        }
      });
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  exports.SourceNode = SourceNode;

});

},{"./source-map-generator":67,"./util":69,"amdefine":70}],69:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;

  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
  var dataUrlRegexp = /^data:.+\,.+$/;

  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    };
  }
  exports.urlParse = urlParse;

  function urlGenerate(aParsedUrl) {
    var url = '';
    if (aParsedUrl.scheme) {
      url += aParsedUrl.scheme + ':';
    }
    url += '//';
    if (aParsedUrl.auth) {
      url += aParsedUrl.auth + '@';
    }
    if (aParsedUrl.host) {
      url += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url += ":" + aParsedUrl.port
    }
    if (aParsedUrl.path) {
      url += aParsedUrl.path;
    }
    return url;
  }
  exports.urlGenerate = urlGenerate;

  /**
   * Normalizes a path, or the path portion of a URL:
   *
   * - Replaces consequtive slashes with one slash.
   * - Removes unnecessary '.' parts.
   * - Removes unnecessary '<dir>/..' parts.
   *
   * Based on code in the Node.js 'path' core module.
   *
   * @param aPath The path or url to normalize.
   */
  function normalize(aPath) {
    var path = aPath;
    var url = urlParse(aPath);
    if (url) {
      if (!url.path) {
        return aPath;
      }
      path = url.path;
    }
    var isAbsolute = (path.charAt(0) === '/');

    var parts = path.split(/\/+/);
    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
      part = parts[i];
      if (part === '.') {
        parts.splice(i, 1);
      } else if (part === '..') {
        up++;
      } else if (up > 0) {
        if (part === '') {
          // The first part is blank if the path is absolute. Trying to go
          // above the root is a no-op. Therefore we can remove all '..' parts
          // directly after the root.
          parts.splice(i + 1, up);
          up = 0;
        } else {
          parts.splice(i, 2);
          up--;
        }
      }
    }
    path = parts.join('/');

    if (path === '') {
      path = isAbsolute ? '/' : '.';
    }

    if (url) {
      url.path = path;
      return urlGenerate(url);
    }
    return path;
  }
  exports.normalize = normalize;

  /**
   * Joins two paths/URLs.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be joined with the root.
   *
   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
   *   first.
   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
   *   is updated with the result and aRoot is returned. Otherwise the result
   *   is returned.
   *   - If aPath is absolute, the result is aPath.
   *   - Otherwise the two paths are joined with a slash.
   * - Joining for example 'http://' and 'www.example.com' is also supported.
   */
  function join(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    if (aPath === "") {
      aPath = ".";
    }
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) {
      aRoot = aRootUrl.path || '/';
    }

    // `join(foo, '//www.example.org')`
    if (aPathUrl && !aPathUrl.scheme) {
      if (aRootUrl) {
        aPathUrl.scheme = aRootUrl.scheme;
      }
      return urlGenerate(aPathUrl);
    }

    if (aPathUrl || aPath.match(dataUrlRegexp)) {
      return aPath;
    }

    // `join('http://', 'www.example.com')`
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
      aRootUrl.host = aPath;
      return urlGenerate(aRootUrl);
    }

    var joined = aPath.charAt(0) === '/'
      ? aPath
      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

    if (aRootUrl) {
      aRootUrl.path = joined;
      return urlGenerate(aRootUrl);
    }
    return joined;
  }
  exports.join = join;

  /**
   * Make a path relative to a URL or another path.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be made relative to aRoot.
   */
  function relative(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }

    aRoot = aRoot.replace(/\/$/, '');

    // XXX: It is possible to remove this block, and the tests still pass!
    var url = urlParse(aRoot);
    if (aPath.charAt(0) == "/" && url && url.path == "/") {
      return aPath.slice(1);
    }

    return aPath.indexOf(aRoot + '/') === 0
      ? aPath.substr(aRoot.length + 1)
      : aPath;
  }
  exports.relative = relative;

  /**
   * Because behavior goes wacky when you set `__proto__` on objects, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
  function toSetString(aStr) {
    return '$' + aStr;
  }
  exports.toSetString = toSetString;

  function fromSetString(aStr) {
    return aStr.substr(1);
  }
  exports.fromSetString = fromSetString;

  function strcmp(aStr1, aStr2) {
    var s1 = aStr1 || "";
    var s2 = aStr2 || "";
    return (s1 > s2) - (s1 < s2);
  }

  /**
   * Comparator between two mappings where the original positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same original source/line/column, but different generated
   * line and column the same. Useful when searching for a mapping with a
   * stubbed out mapping.
   */
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp;

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp || onlyCompareOriginal) {
      return cmp;
    }

    cmp = strcmp(mappingA.name, mappingB.name);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp) {
      return cmp;
    }

    return mappingA.generatedColumn - mappingB.generatedColumn;
  };
  exports.compareByOriginalPositions = compareByOriginalPositions;

  /**
   * Comparator between two mappings where the generated positions are
   * compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same generated line and column, but different
   * source/name/original line and column the same. Useful when searching for a
   * mapping with a stubbed out mapping.
   */
  function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
    var cmp;

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp || onlyCompareGenerated) {
      return cmp;
    }

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  };
  exports.compareByGeneratedPositions = compareByGeneratedPositions;

});

},{"amdefine":70}],70:[function(require,module,exports){
(function (process,__filename){
/** vim: et:ts=4:sw=4:sts=4
 * @license amdefine 0.1.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/amdefine for details
 */

/*jslint node: true */
/*global module, process */
'use strict';

/**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
function amdefine(module, requireFn) {
    'use strict';
    var defineCache = {},
        loaderCache = {},
        alreadyCalled = false,
        path = require('path'),
        makeRequire, stringRequire;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
        var i, part;
        for (i = 0; ary[i]; i+= 1) {
            part = ary[i];
            if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
            } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                    //End of the line. Keep at least one non-dot
                    //path segment at the front so it can be mapped
                    //correctly to disk. Otherwise, there is likely
                    //no path mapping for a path starting with '..'.
                    //This can still fail, but catches the most reasonable
                    //uses of ..
                    break;
                } else if (i > 0) {
                    ary.splice(i - 1, 2);
                    i -= 2;
                }
            }
        }
    }

    function normalize(name, baseName) {
        var baseParts;

        //Adjust any relative paths.
        if (name && name.charAt(0) === '.') {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
            }
        }

        return name;
    }

    /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(id) {
        function load(value) {
            loaderCache[id] = value;
        }

        load.fromText = function (id, text) {
            //This one is difficult because the text can/probably uses
            //define, and any relative paths and requires should be relative
            //to that id was it would be found on disk. But this would require
            //bootstrapping a module/require fairly deeply from node core.
            //Not sure how best to go about that yet.
            throw new Error('amdefine does not implement load.fromText');
        };

        return load;
    }

    makeRequire = function (systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
            if (typeof deps === 'string') {
                //Synchronous, single module require('')
                return stringRequire(systemRequire, exports, module, deps, relId);
            } else {
                //Array of dependencies with a callback.

                //Convert the dependencies to modules.
                deps = deps.map(function (depName) {
                    return stringRequire(systemRequire, exports, module, depName, relId);
                });

                //Wait for next tick to call back the require call.
                process.nextTick(function () {
                    callback.apply(null, deps);
                });
            }
        }

        amdRequire.toUrl = function (filePath) {
            if (filePath.indexOf('.') === 0) {
                return normalize(filePath, path.dirname(module.filename));
            } else {
                return filePath;
            }
        };

        return amdRequire;
    };

    //Favor explicit value, passed in if the module wants to support Node 0.4.
    requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
    };

    function runFactory(id, deps, factory) {
        var r, e, m, result;

        if (id) {
            e = loaderCache[id] = {};
            m = {
                id: id,
                uri: __filename,
                exports: e
            };
            r = makeRequire(requireFn, e, m, id);
        } else {
            //Only support one define call per file
            if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
            }
            alreadyCalled = true;

            //Use the real variables from node
            //Use module.exports for exports, since
            //the exports in here is amdefine exports.
            e = module.exports;
            m = module;
            r = makeRequire(requireFn, e, m, module.id);
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return r(depName);
            });
        }

        //Call the factory with the right dependencies.
        if (typeof factory === 'function') {
            result = factory.apply(m.exports, deps);
        } else {
            result = factory;
        }

        if (result !== undefined) {
            m.exports = result;
            if (id) {
                loaderCache[id] = m.exports;
            }
        }
    }

    stringRequire = function (systemRequire, exports, module, id, relId) {
        //Split the ID by a ! so that
        var index = id.indexOf('!'),
            originalId = id,
            prefix, plugin;

        if (index === -1) {
            id = normalize(id, relId);

            //Straight module lookup. If it is one of the special dependencies,
            //deal with it, otherwise, delegate to node.
            if (id === 'require') {
                return makeRequire(systemRequire, exports, module, relId);
            } else if (id === 'exports') {
                return exports;
            } else if (id === 'module') {
                return module;
            } else if (loaderCache.hasOwnProperty(id)) {
                return loaderCache[id];
            } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                return loaderCache[id];
            } else {
                if(systemRequire) {
                    return systemRequire(originalId);
                } else {
                    throw new Error('No module with ID: ' + id);
                }
            }
        } else {
            //There is a plugin in play.
            prefix = id.substring(0, index);
            id = id.substring(index + 1, id.length);

            plugin = stringRequire(systemRequire, exports, module, prefix, relId);

            if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
            } else {
                //Normalize the ID normally.
                id = normalize(id, relId);
            }

            if (loaderCache[id]) {
                return loaderCache[id];
            } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                return loaderCache[id];
            }
        }
    };

    //Create a define function specific to the module asking for amdefine.
    function define(id, deps, factory) {
        if (Array.isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        } else if (typeof id !== 'string') {
            factory = id;
            id = deps = undefined;
        }

        if (deps && !Array.isArray(deps)) {
            factory = deps;
            deps = undefined;
        }

        if (!deps) {
            deps = ['require', 'exports', 'module'];
        }

        //Set up properties for this module. If an ID, then use
        //internal cache. If no ID, then use the external variables
        //for this node module.
        if (id) {
            //Put the module in deep freeze until there is a
            //require call for it.
            defineCache[id] = [id, deps, factory];
        } else {
            runFactory(id, deps, factory);
        }
    }

    //define.require, which has access to all the values in the
    //cache. Useful for AMD modules that all have IDs in the file,
    //but need to finally export a value to node based on one of those
    //IDs.
    define.require = function (id) {
        if (loaderCache[id]) {
            return loaderCache[id];
        }

        if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
        }
    };

    define.amd = {};

    return define;
}

module.exports = amdefine;

}).call(this,require('_process'),"/node_modules/stylecow/node_modules/source-map/node_modules/amdefine/amdefine.js")
},{"_process":7,"path":6}],"stylecow-plugin-color":[function(require,module,exports){
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

},{"stylecow-color":8}],"stylecow-plugin-fixes":[function(require,module,exports){
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

},{"./src/calc":9,"./src/clip":10,"./src/column-break":11,"./src/float":12,"./src/inline-block":13,"./src/min-height":14,"./src/opacity":15,"./src/pseudoelements":16,"./src/vmin":17}],"stylecow-plugin-flex":[function(require,module,exports){
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

},{"./src/animation":18,"./src/appearance":19,"./src/background":20,"./src/border":21,"./src/box-shadow":22,"./src/box-sizing":23,"./src/calc":24,"./src/column":25,"./src/cursor":26,"./src/document":27,"./src/fullscreen":28,"./src/grid":29,"./src/inline-block":30,"./src/linear-gradient":31,"./src/mask":32,"./src/object":33,"./src/pseudoelements":34,"./src/region":35,"./src/sizing":36,"./src/sticky":37,"./src/transform":38,"./src/transition":39,"./src/typography":40,"./src/user-select":41}],"stylecow-plugin-rem":[function(require,module,exports){
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
						return fn.parent().setContent(value.join(','));
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
