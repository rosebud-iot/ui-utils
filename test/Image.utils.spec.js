
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

  describe('Instance', () => {

    let ImageInstance;

    beforeEach(() => {
      ImageInstance = new Image(CMS_CONFIG);
      sinon.stub(console, 'warn');
    });

    afterEach(() => {
      console.warn.restore()
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

      it('should return string that is all lower case', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=service&category=nosnakecase&service=orcamelcase&type=allowed';
        const response = ImageInstance.service('NoSnakeCase', 'orCamelCase', 'allowed');
        expect(response).to.be.lowercase;
        expect(response).to.equal(expectation);
      });

      it('should console a warning if incorrect params, but correct param types, are given', () => {
        ImageInstance.service('', '', '');
        expect(console.warn.called).to.be.true;
      });
    });

    describe('Method device', () => {

      it('should return expected string for the correct params', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=device&manufacturer=a&family=b&model=c&type=squishy';
        const response = ImageInstance.device('a', 'b', 'c', 'squishy');
        expect(response).to.be.a('string');
        expect(response).to.equal(expectation)
      });

      it('should return string that is all lower case', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=device&manufacturer=nosnakecase&family=orcamelcase&model=allowed&type=asparam';
        const response = ImageInstance.device('NoSnakeCase', 'orCamelCase', 'allowed', 'ASPARAM');
        expect(response).to.be.lowercase;
        expect(response).to.equal(expectation);
      });

      it('should console a warning if incorrect params, but correct param types, are given', () => {
        ImageInstance.device('', '', '', '');
        expect(console.warn.called).to.be.true;
      });

      it('should replace device `model` whitespaces (if any) with dash [-]', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=device&manufacturer=manufacturer&family=family&model=model-name&type=type';
        const response = ImageInstance.device('Manufacturer', 'Family', 'Model Name', 'Type');
        expect(response).to.equal(expectation);
      });

    })
  });

})
