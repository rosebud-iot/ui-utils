import chai, { assert, expect } from 'chai';

module.exports = function (chai, _) {
  chai.Assertion.addProperty('uppercase', function () {
    var obj = this._obj;
    new chai.Assertion(obj).to.be.a('string');

    this.assert(
        obj === obj.toUpperCase()
        , 'expected #{this} to be all uppercase'
        , 'expected #{this} to not be all uppercase'
    );
  });
};

// Usage

// expect('HELLO').to.be.uppercase; // pass
// expect('hello').to.not.be.uppercase; // pass
// expect('HELLo').to.be.uppercase; // fail
