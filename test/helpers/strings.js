import chai, { assert } from 'chai';

module.exports = function (chai, _) {
  chai.Assertion.addProperty('lowercase', function () {
    var obj = this._obj;
    new chai.Assertion(obj).to.be.a('string');

    this.assert(
        obj === obj.toLowerCase()
        , 'expected #{this} to be all lowercase'
        , 'expected #{this} to not be all lowercase'
    );
  });

  // Usage of `lowercase` helper
  // expect('hello').to.be.lowercase; // pass
  // expect('HELLO').to.not.be.lowercase; // pass
  // expect('HELLo').to.be.lowercase; // fail

  chai.Assertion.addProperty('uppercase', function () {
    var obj = this._obj;
    new chai.Assertion(obj).to.be.a('string');

    this.assert(
        obj === obj.toUpperCase()
        , 'expected #{this} to be all uppercase'
        , 'expected #{this} to not be all uppercase'
    );
  });

  // Usage of `uppercase` helper
  // expect('HELLO').to.be.uppercase; // pass
  // expect('hello').to.not.be.uppercase; // pass
  // expect('HELLo').to.be.uppercase; // fail
};
