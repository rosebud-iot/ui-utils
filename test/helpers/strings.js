import chai, { assert } from 'chai';

module.exports = function (chai, _) {
  chai.Assertion.addProperty('all_lowercase', function () {
    var obj = this._obj;
    new chai.Assertion(obj).to.be.a('string');

    this.assert(
        obj === obj.toLowerCase()
        , 'expected #{this} to be all lowercase'
        , 'expected #{this} to not be all lowercase'
    );
  });

  // Usage of `all_lowercase` helper
  // expect('hello').to.be.all_lowercase; // pass
  // expect('HELLO').to.not.be.all_lowercase; // pass
  // expect('HELLo').to.be.all_lowercase; // fail

  chai.Assertion.addProperty('all_uppercase', function () {
    var obj = this._obj;
    new chai.Assertion(obj).to.be.a('string');

    this.assert(
        obj === obj.toUpperCase()
        , 'expected #{this} to be all uppercase'
        , 'expected #{this} to not be all uppercase'
    );
  });

  // Usage of `all_uppercase` helper
  // expect('HELLO').to.be.all_uppercase; // pass
  // expect('hello').to.not.be.all_uppercase; // pass
  // expect('HELLo').to.be.all_uppercase; // fail
};
