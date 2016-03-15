Magico
=======

[![Build Status](https://travis-ci.org/lyfeyaj/magico.svg?branch=master)](https://travis-ci.org/lyfeyaj/magico)

Magic object accessor for javascript!

# Install

```bash
$ npm install --save magico
```

# Usage

```javascript
```

## 类方法

```javascript
const Magico = require('magico');

let obj = {
  a: 1,
  b: 2,
  c: {
    d: ['first', 'second'],
    e: {
      f: [1, 2, 3, 4, 5, 6]
    }
  }
};

// Magico.get(obj, path)

Magico.get(obj, 'c.d[0]')       // => 'first'
Magico.get(obj, 'a')            // => 1
Magico.get(obj, 'c.e.f')        // => [1, 2, 3, 4, 5, 6]

Magico.get(obj, ['c', 'd', 0]); // => 'first'
Magico.get(obj, ['a']);         // => 1

// Magico.set(obj, path)



var originalObj = ;

var obj = new Magico(originalObj);

var obj = Magico.wrap(originalObj);

obj('c.d[1]');

obj.get('c.d[1]');

obj.set('c.d[1]', 'first changed'); // return `true` or `false`

obj.exists('c.d.e');

obj.remove('c.d.e');

obj.toObject() // return modified obj

Magico.get(originalObj, 'c.d[1]');
Magico.set(originalObj, 'c.d[1]', 'first changed');
Magico.exists(originalObj, 'c.d.e') // return `true` or `false`;
```
