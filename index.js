'use strict';

var SEPERATOR = /\[|\.|\]/;
var STRING_DETECTOR = '[object String]';
var ARRAY_DETECTOR = '[object Array]';

function isString (str) {
  return Object.prototype.toString.call(str) === STRING_DETECTOR;
}

function isArray (str) {
  return Object.prototype.toString.call(str) === ARRAY_DETECTOR;
}

function isInteger (str) {
  return /^(0|[1-9]\d*)$/.test(str);
}

function isNil (obj) {
  return obj !== obj || obj === undefined || obj === null;
}

function compact (array) {
  array = array || [];
  return array.filter(function(el) {
    return el === 0 || Boolean(el).valueOf();
  });
}

function _eval (type, obj, path, value) {
  if (isString(path)) {
    path = compact(path.trim().split(SEPERATOR));
  }

  if (!path || !isArray(path) || path.length === 0) return;

  path = path.slice();

  var key = path.shift();

  // console.log(type, obj, isNil(obj), path);
  if (isNil(obj)) return;
  switch (type) {
    case 'get':

      if (path.length === 0) {
        return obj[key];
      }
      break;
    case 'set':
      if (path.length) {
        if (typeof obj[key] === 'undefined') {
          obj[key] = {};
        }

        if (isNil(obj[key])) return false;
      } else {
        obj[key] = value;
        return true;
      }
      break;
    case 'remove':
      if (path.length === 0) {

        if (isArray(obj) && isInteger(key)) {
          key = Number(key);

          if (obj.length - 1 < key) return false;

          obj.splice(key, 1);
        } else {
          if (!Object.hasOwnProperty.call(obj, key)) return false;

          delete obj[key];
        }

        return true;
      }
      break;
    case 'exists':
      if (path.length === 0) {
        if (isArray(obj) && isInteger(key)) {
          key = Number(key);
          return obj.length - 1 >= key;
        } else {
          return Object.hasOwnProperty.call(obj, key);
        }
      }
      break;
    default:
      return;
  }

  return _eval(type, obj[key], path, value);
}

function Magico(obj) {
  this._obj = obj;
}

Magico.wrap = function (obj) {
  return new Magico(obj);
};

Magico.set = function (obj, path, value) {
  return !!_eval('set', obj, path, value);
};

Magico.get = function (obj, path) {
  return _eval('get', obj, path);
};

Magico.exists = function (obj, path) {
  return !!_eval('exists', obj, path);
};

Magico.remove = function (obj, path) {
  return !!_eval('remove', obj, path);
};

Magico.prototype.set = function (path, value) {
  return Magico.set(this._obj, path, value);
};

Magico.prototype.get = function (path) {
  return Magico.get(this._obj, path);
};

Magico.prototype.exists = function (path) {
  return Magico.exists(this._obj, path);
};

Magico.prototype.remove = function (path) {
  return Magico.remove(this._obj, path);
};

Magico.prototype.toObject = function () {
  return this._obj;
};

module.exports = Magico;
