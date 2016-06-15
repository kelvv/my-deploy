const stringex = require('../../lib/utils/stringex');
const should = require('should');
const test   = require('ava');

test('should return name whit no suff',t => {
    var str = '/Users/kelvv/firekylin-master.zip';
    should.equal(typeof(str.GetNameWithoutSuff),'function');
    should.equal(str.GetNameWithoutSuff(),'firekylin-master');

    var str = 'firekylin-master.zip';
    should.equal(str.GetNameWithoutSuff(),'firekylin-master');
});

test('should return full name',t => {
    var str = '/Users/kelvv/firekylin-master.zip';
    should.equal(str.GetName(),'firekylin-master.zip');
});

test('unico to chinese',t => {
    var unicode = '\u4f60\u597d';
    should.equal(unicode.UnicoToUtf8(),'你好');
});