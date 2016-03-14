# Magico

Magic object accessor for javascript!

```javascript
const Magico = require('magico');

var originalObj = { a: 1, b: 2, c: { d: ['first', 'second'] } };

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
