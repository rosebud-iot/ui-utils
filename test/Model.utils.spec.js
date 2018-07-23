
import sinon from 'sinon';
import { expect } from 'chai';
import _ from 'lodash';
import { Collection } from '../src/Model.utils';

describe('Collection', () => {

  it('should exist', () => {
    expect(Collection).to.exist;
  })

  describe('Method', () => {

    describe('keyify', () => {

      beforeEach(() => {
        sinon.stub(console, 'warn')
      })

      afterEach(() => {
        console.warn.restore()
      })

      it('should exist', () => {
        expect(Collection.keyify).to.exist;
      })

      it('should return same array as put in, if missing ID attribute', () => {
        const inputAry = [{ name: 'Calvin', friend: 'Susy' }];
        const outputAry= Collection.keyify(inputAry);
        expect(outputAry).to.equal(inputAry)
      })

      it('should return same array as put in, if invalid ID attribute', () => {
        const inputAry = [{ name: 'Calvin', id: { a: 'b', id: 1 } }];
        const outputAry= Collection.keyify(inputAry);
        expect(outputAry).to.equal(inputAry)
      })

      it('should log a warning if used without valid identifier', () => {
        expect(console.warn.called).to.be.false;
        const inputAry = [{ name: 'Calvin', friend: 'Susy' }];
        const outputAry= Collection.keyify(inputAry);
        expect(console.warn.called).to.be.true;
      })

      it('should log a warning if ID attribute is invalid', () => {
        expect(console.warn.called).to.be.false;
        const inputAry = [{ name: 'Calvin', id: [1,2,3] }];
        const outputAry= Collection.keyify(inputAry);
        expect(console.warn.called).to.be.true;
      })

      it('should add a valid key property to items in given array', () => {
        const inputAry = [
          { name: 'Calvin', id: 'calvin' },
          { name: 'Susy', id: 123 },
          { name: 'Hobbes', id: 'h0bbes' }
        ];
        const outputAry= Collection.keyify(inputAry);
        expect(_.every(outputAry, (item) => { return item.key; })).to.be.true;
        expect(_.every(outputAry, (item) => { return _.isString(item.key); })).to.be.true;
      })

    })

  })
})
