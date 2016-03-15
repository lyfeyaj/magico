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
```

## Class methods


### Magico.set(object, path, value)

Set the value of object under the corresponding path.
If success return true, else return false
```javascript
Magico.set(obj, 'a', 3);  // => true
Magico.set(obj, 'c.d[0]','zero'); // => true
Magico.set(obj, 'e.d.a', '2');  // => true
```
The final object 
```javascript
{ a: 3,
  b: 2,
  c: { d: [ 'zero', 'second' ], e: { f: [1, 2, 3, 4, 5, 6] } },
  e: { d: { a: '2' } } }
```
### Magico.get(obj, path)

get the value of object under the corresponding path.
```javascript
Magico.get(obj, 'a') // => 3
Magico.get(obj, 'c.d[0]') // => 'zero'
Magico.get(obj, 'e.d.a') // => '2'
```
### Magico.exists(obj, path)
Check if the value of the obj under the corresponding path exists
```javascript
Magico.exists(obj, 'a'); // => true
Magico.exists(obj, 'c.d[0]'); // => true
Magico.exists(obj, 'd'); // => false
Magico.exists(obj, 'c.d[2]'); // => false
```
### Magico.remove(obj, path)
remove the value of object under the corresponding path
```javascript
Magico.remove(obj, 'e.d') // => true
Magico.remove(obj, 'c.d[1]') // => true
Magico.remove(obj, 'd') // => false
Magico.remove(obj, 'c.d[2]') // => false
 ```
The final object 
```javascript
{ a: 3,
  b: 2, 
  c: { d: [ 'zero' ], 
  e: {}
```
### Magico.wrap(obj)
Return Magico instance witch wrapd the obj for later use
```javascript
const instance = Magico.wrap(obj);
 ```
 Then,you do not need to pass obj to method everytime

## Instance methods
You can create instance using the class method Magico.wrap(obj) or new Magico(obj)
```javascript
const instance1 = Magico.wrap(obj);
const instance2 = new Magico(obj);
```
set, get, exists, remove all these methods are similar to class methods
```javascript
const instance = new Magico(obj)
instance.get(path);
instance.set(path, value);
instance.exists(path);
instance.remove(path);
```
### instance.toObject()
return the changed obj;
```javascript
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
const instance = new Magico(obj);
instance.toObject() // => { a: 3, b: 2, c: { d: [ 'zero' ], e: { f: [Object] } }, e: {} }
instance.set('c.d[0]', 'second'); // => return true
instance.toObject() // => { a: 3, b: 2, c: { d: [ 'second' ], e: { f: [Object] } }, e: {} }
```
