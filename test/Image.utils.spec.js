
import sinon from 'sinon';
import chai, { assert, expect, should } from 'chai';
import chaiStringHelper from './helpers/strings';
import _ from 'lodash';
import { Image } from '../src/Image.utils';

const CMS_CONFIG = {
  protocol: 'https',
  domain: 'non-existing-mock-url',
  port: '',
  images: '/path/to'
};

chai.use(chaiStringHelper);

describe('Image', () => {

  it('should exist', () => {
    expect(Image).to.exist;
  })

  describe('Instance', () => {

    let ImageInstance;

    beforeEach(() => {
      ImageInstance = new Image(CMS_CONFIG);
    });

    it('should exist', () => {
      expect(ImageInstance).to.exist;
    });

    describe('Method service', () => {
      it('should return expected string for correct params', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=service&category=a&service=b&type=squishy';
        const response = ImageInstance.service('a', 'b', 'squishy');
        expect(response).to.be.a('string');
        expect(response).to.equal(expectation)
      });

      it.skip('should return string that is all lower case', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=service&category=nosnakecase&service=orcamelcase&type=anywhere';
        const response = ImageInstance.service('NoSnakeCase', 'orCamelCase', 'allowed');
        expect(response).to.be.lowercase; // TODO: implement
        expect(response).to.equal(expectation);
      });

      it.skip('should console a warning if incorrect params, but correct param types, are given', () => {
        const response = ImageInstance.service('', '', '');
        // ...
      });

      it.skip('should throw and catch exception if used with params of wrong type', () => {
        // ...
      });
    });
  });

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
