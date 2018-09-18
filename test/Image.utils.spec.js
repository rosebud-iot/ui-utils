
import sinon from 'sinon';
import chai, { assert, expect, should } from 'chai';
import chaiStringHelper from './helpers/strings';
import _ from 'lodash';
import { Image } from '../src/Image.utils';

chai.use(chaiStringHelper);

describe('Image', () => {

  it('should exist', () => {
    expect(Image).to.exist;
  })

  describe('Method', () => {

    describe('url', () => {
      it('should exist', () => {
        (() => new Image().url.to.exist);
      })
    })
  })

  describe('Method', () => {

    describe('service', () => {
      it('should exist', () => {
        (() => new Image().service.to.exist);
      })
    })

    /*
    TODO: refactor this test to make be able to test
    the `service` method output that belongs to the
    Image class, which should be lowercase.
    Also, add a similar test for the `device` method.
    */
    // describe('service', () => {
    //   it('should return a lower case string', () => {
    //
    //     var stub = sinon.stub(new Image(), 'service');
    //     expect(stub.callsFake('a', 'b', 'c')).to.not.be.uppercase
    //
    //   })
    // })
  })

  describe('Method', () => {

    describe('device', () => {
      it('should exist', () => {
        (() => new Image().device.to.exist);
      })
    })
  })
})
