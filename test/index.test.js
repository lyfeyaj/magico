var expect = require('chai').expect;

var Magico = require('../');

describe('Magico', function() {
  var obj;

  beforeEach(function() {
    obj = { a: 1, b: 2, c: { d: { e: ['first', 'second'] } }, d: null };
  });

  describe('.wrap(obj)', function() {
    it('should return an instance of Magico', function() {
      expect(Magico.wrap(obj)).to.be.an.instanceof(Magico);
    });
  });

  describe('.get(obj, path)', function() {
    it('should return the correct value with a valid string path', function() {
      expect(Magico.get(obj, 'a')).to.equal(1);
      expect(Magico.get(obj, 'b')).to.equal(2);
      expect(Magico.get(obj, 'd')).to.be.null;
      expect(Magico.get(obj, 'c.d')).to.deep.eq({ e: ['first', 'second'] });
      expect(Magico.get(obj, 'c.d.e')).to.deep.eq(['first', 'second']);
      expect(Magico.get(obj, 'c.d["e"]')).to.deep.eq(['first', 'second']);
      expect(Magico.get(obj, 'c.d["e"][0]')).to.deep.eq('first');
    });

    it('should return undefined with an invalid string path', function() {
      expect(Magico.get(obj, 'a.nonExists')).to.be.undefined;
      expect(Magico.get(obj, 'a.d.e.f')).to.be.undefined;
    });

    it('should return the correct value with a valid array path', function() {
      expect(Magico.get(obj, ['a'])).to.equal(1);
      expect(Magico.get(obj, ['b'])).to.equal(2);
      expect(Magico.get(obj, ['d'])).to.be.null;
      expect(Magico.get(obj, ['c', 'd'])).to.deep.eq({ e: ['first', 'second'] });
      expect(Magico.get(obj, ['c', 'd', 'e'])).to.deep.eq(['first', 'second']);
      expect(Magico.get(obj, ['c', 'd', 'e', 0])).to.deep.eq('first');
    });

    it('should return undefined with an invalid array path', function() {
      expect(Magico.get(obj, ['a', 'nonExists'])).to.be.undefined;
      expect(Magico.get(obj, ['a', 'd', 'e', 'f'])).to.be.undefined;
    });
  });

  describe('.exists(obj, path)', function() {
    it('should return true with a valid string path', function() {
      expect(Magico.exists(obj, 'a')).to.be.true;
      expect(Magico.exists(obj, 'b')).to.be.true;
      expect(Magico.exists(obj, 'd')).to.be.true;
      expect(Magico.exists(obj, 'c.d')).to.be.true;
      expect(Magico.exists(obj, 'c.d.e')).to.be.true;
      expect(Magico.exists(obj, 'c.d["e"]')).to.be.true;
      expect(Magico.exists(obj, 'c.d["e"][0]')).to.be.true;
    });

    it('should return false with an invalid string path', function() {
      expect(Magico.exists(obj, 'a.nonExists')).to.be.false;
      expect(Magico.exists(obj, 'a.d.e.f')).to.be.false;
    });

    it('should return true with a valid array path', function() {
      expect(Magico.exists(obj, ['a'])).to.be.true;
      expect(Magico.exists(obj, ['b'])).to.be.true;
      expect(Magico.exists(obj, ['d'])).to.be.true;
      expect(Magico.exists(obj, ['c', 'd'])).to.be.true;
      expect(Magico.exists(obj, ['c', 'd', 'e'])).to.be.true;
      expect(Magico.exists(obj, ['c', 'd', 'e', 0])).to.be.true;
    });

    it('should return false with an invalid array path', function() {
      expect(Magico.exists(obj, ['a', 'nonExists'])).to.be.false;
      expect(Magico.exists(obj, ['a', 'd', 'e', 'f'])).to.be.false;
      expect(Magico.exists(obj, ['c', 'd', 'e', 2])).to.be.false;
    });
  });

  describe('.set(obj, path, value)', function() {
    it('should set the correct value for a valid string path and return true', function() {
      var result1 = Magico.set(obj, 'xyz', 'abc');
      expect(result1).to.be.true;
      expect(obj).to.have.property('xyz', 'abc');

      var result2 = Magico.set(obj, 'opq.rst', 'abc');
      expect(result2).to.be.true;
      expect(obj).to.have.deep.property('opq.rst', 'abc');
    });

    it('should not set value for a valid string path of `null` or `NaN` value', function() {
      var result = Magico.set(obj, 'd.f', 'null value');
      expect(result).to.be.false;
      expect(obj).have.property('d', null);
    });

    it('should set the correct value for a valid array path and return true', function() {
      var result1 = Magico.set(obj, ['xyz'], 'abc');
      expect(result1).to.be.true;
      expect(obj).to.have.property('xyz', 'abc');

      var result2 = Magico.set(obj, ['opq', 'rst'], 'abc');
      expect(result2).to.be.true;
      expect(obj).to.have.deep.property('opq.rst', 'abc');
    });

    it('should not set value for a valid array path of `null` or `NaN` value', function() {
      var result = Magico.set(obj, ['d', 'f'], 'null value');
      expect(result).to.be.false;
      expect(obj).have.property('d', null);
    });
  });

  describe('.remove(obj, path)', function() {
    it('should return true for a valid string path', function() {
      expect(Magico.remove(obj, 'a')).to.be.true;
      expect(Magico.remove(obj, 'b')).to.be.true;
      expect(Magico.remove(obj, 'c.d.e')).to.be.true;
      expect(Magico.remove(obj, 'c.d')).to.be.true;

      expect(obj).to.not.have.property('a');
      expect(obj).to.not.have.property('b');
      expect(obj).to.not.have.deep.property('c.d.e');
      expect(obj).to.not.have.deep.property('c.d');
    });

    it('should return false for an invalid string path', function() {
      expect(Magico.remove(obj, 'a.b')).to.be.false;
      expect(Magico.remove(obj, 'b.c')).to.be.false;
      expect(Magico.remove(obj, 'c.d.e.f')).to.be.false;
      expect(Magico.remove(obj, 'c.d.z')).to.be.false;
    });

    it('should return true for a valid array path', function() {
      expect(Magico.remove(obj, ['a'])).to.be.true;
      expect(Magico.remove(obj, ['b'])).to.be.true;
      expect(Magico.remove(obj, ['c', 'd', 'e'])).to.be.true;
      expect(Magico.remove(obj, ['c', 'd'])).to.be.true;

      expect(obj).to.not.have.property('a');
      expect(obj).to.not.have.property('b');
      expect(obj).to.not.have.deep.property('c.d.e');
      expect(obj).to.not.have.deep.property('c.d');
    });

    it('should return false for an invalid array path', function() {
      expect(Magico.remove(obj, ['a', 'b'])).to.be.false;
      expect(Magico.remove(obj, ['b', 'c'])).to.be.false;
      expect(Magico.remove(obj, ['c', 'd', 'e', 'f'])).to.be.false;
      expect(Magico.remove(obj, ['c', 'd', 'z'])).to.be.false;
    });
  });
});

describe('Magico.prototype', function() {
  var obj;
  var magico;
  beforeEach(function() {
    obj = { a: 1, b: 2, c: { d: { e: ['first', 'second'] } }, d: null };
    magico = new Magico(obj);
  });

  describe('.get(obj, path)', function() {
    it('should return the correct value with a valid string path', function() {
      expect(magico.get('a')).to.equal(1);
      expect(magico.get('b')).to.equal(2);
      expect(magico.get('d')).to.be.null;
      expect(magico.get('c.d')).to.deep.eq({ e: ['first', 'second'] });
      expect(magico.get('c.d.e')).to.deep.eq(['first', 'second']);
      expect(magico.get('c.d["e"]')).to.deep.eq(['first', 'second']);
      expect(magico.get('c.d["e"][0]')).to.deep.eq('first');
    });

    it('should return undefined with an invalid string path', function() {
      expect(magico.get('a.nonExists')).to.be.undefined;
      expect(magico.get('a.d.e.f')).to.be.undefined;
    });

    it('should return the correct value with a valid array path', function() {
      expect(magico.get(['a'])).to.equal(1);
      expect(magico.get(['b'])).to.equal(2);
      expect(magico.get(['d'])).to.be.null;
      expect(magico.get(['c', 'd'])).to.deep.eq({ e: ['first', 'second'] });
      expect(magico.get(['c', 'd', 'e'])).to.deep.eq(['first', 'second']);
      expect(magico.get(['c', 'd', 'e', 0])).to.deep.eq('first');
    });

    it('should return undefined with an invalid array path', function() {
      expect(magico.get(['a', 'nonExists'])).to.be.undefined;
      expect(magico.get(['a', 'd', 'e', 'f'])).to.be.undefined;
    });
  });

  describe('.exists(obj, path)', function() {
    it('should return true with a valid string path', function() {
      expect(magico.exists('a')).to.be.true;
      expect(magico.exists('b')).to.be.true;
      expect(magico.exists('d')).to.be.true;
      expect(magico.exists('c.d')).to.be.true;
      expect(magico.exists('c.d.e')).to.be.true;
      expect(magico.exists('c.d["e"]')).to.be.true;
      expect(magico.exists('c.d["e"][0]')).to.be.true;
    });

    it('should return false with an invalid string path', function() {
      expect(magico.exists('a.nonExists')).to.be.false;
      expect(magico.exists('a.d.e.f')).to.be.false;
    });

    it('should return true with a valid array path', function() {
      expect(magico.exists(['a'])).to.be.true;
      expect(magico.exists(['b'])).to.be.true;
      expect(magico.exists(['d'])).to.be.true;
      expect(magico.exists(['c', 'd'])).to.be.true;
      expect(magico.exists(['c', 'd', 'e'])).to.be.true;
      expect(magico.exists(['c', 'd', 'e', 0])).to.be.true;
    });

    it('should return false with an invalid array path', function() {
      expect(magico.exists(['a', 'nonExists'])).to.be.false;
      expect(magico.exists(['a', 'd', 'e', 'f'])).to.be.false;
      expect(magico.exists(['c', 'd', 'e', 2])).to.be.false;
    });
  });

  describe('.set(obj, path, value)', function() {
    it('should set the correct value for a valid string path and return true', function() {
      var result1 = magico.set('xyz', 'abc');
      expect(result1).to.be.true;
      expect(obj).to.have.property('xyz', 'abc');

      var result2 = magico.set('opq.rst', 'abc');
      expect(result2).to.be.true;
      expect(obj).to.have.deep.property('opq.rst', 'abc');
    });

    it('should not set value for a valid string path of `null` or `NaN` value', function() {
      var result = magico.set('d.f', 'null value');
      expect(result).to.be.false;
      expect(obj).have.property('d', null);
    });

    it('should set the correct value for a valid array path and return true', function() {
      var result1 = magico.set(['xyz'], 'abc');
      expect(result1).to.be.true;
      expect(obj).to.have.property('xyz', 'abc');

      var result2 = magico.set(['opq', 'rst'], 'abc');
      expect(result2).to.be.true;
      expect(obj).to.have.deep.property('opq.rst', 'abc');
    });

    it('should not set value for a valid array path of `null` or `NaN` value', function() {
      var result = magico.set(['d', 'f'], 'null value');
      expect(result).to.be.false;
      expect(obj).have.property('d', null);
    });
  });

  describe('.remove(obj, path)', function() {
    it('should return true for a valid string path', function() {
      expect(magico.remove('a')).to.be.true;
      expect(magico.remove('b')).to.be.true;
      expect(magico.remove('c.d.e')).to.be.true;
      expect(magico.remove('c.d')).to.be.true;

      expect(obj).to.not.have.property('a');
      expect(obj).to.not.have.property('b');
      expect(obj).to.not.have.deep.property('c.d.e');
      expect(obj).to.not.have.deep.property('c.d');
    });

    it('should return false for an invalid string path', function() {
      expect(magico.remove('a.b')).to.be.false;
      expect(magico.remove('b.c')).to.be.false;
      expect(magico.remove('c.d.e.f')).to.be.false;
      expect(magico.remove('c.d.z')).to.be.false;
    });

    it('should return true for a valid array path', function() {
      expect(magico.remove(['a'])).to.be.true;
      expect(magico.remove(['b'])).to.be.true;
      expect(magico.remove(['c', 'd', 'e'])).to.be.true;
      expect(magico.remove(['c', 'd'])).to.be.true;

      expect(obj).to.not.have.property('a');
      expect(obj).to.not.have.property('b');
      expect(obj).to.not.have.deep.property('c.d.e');
      expect(obj).to.not.have.deep.property('c.d');
    });

    it('should return false for an invalid array path', function() {
      expect(magico.remove(['a', 'b'])).to.be.false;
      expect(magico.remove(['b', 'c'])).to.be.false;
      expect(magico.remove(['c', 'd', 'e', 'f'])).to.be.false;
      expect(magico.remove(['c', 'd', 'z'])).to.be.false;
    });
  });
});
