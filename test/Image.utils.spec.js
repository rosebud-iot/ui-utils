
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
    });

    it('should exist', () => {
      expect(ImageInstance).to.exist;
    });

    describe('Method service', () => {

      it('should return expected string for correct params', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=service&category=a&service=b&type=squishy';
        const response = ImageInstance.service('a', 'b', 'squishy');
        expect(response).to.be.a('string');
        expect(response).to.equal(expectation);
      });

      it('should return string that is all lower case', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=service&category=nosnakecase&service=orcamelcase&type=allowed';
        const response = ImageInstance.service('NoSnakeCase', 'orCamelCase', 'allowed');
        expect(response).to.be.all_lowercase;
        expect(response).to.equal(expectation);
      });

      it('should throw a type error if incorrect param types are given', () => {
        const inputParams = [
          { 'service': '', 'category': '', 'type': '' },
          { 'service': null, 'category': null, 'type': null },
          { 'service': undefined, 'category': undefined, 'type': undefined },
          { 'service': '', 'category': null, 'type': '' }
        ];

        _.map(inputParams, (params) => {
          expect(() => {
            ImageInstance.service(Object.values(params));
          }).to.throw(TypeError);
        })
      });
    });

    describe('Method device', () => {

      it('should return expected string for the correct params', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=device&manufacturer=a&family=b&model=c&type=squishy';
        const response = ImageInstance.device('a', 'b', 'c', 'squishy');
        expect(response).to.be.a('string');
        expect(response).to.equal(expectation);
      });

      it('should return string that is all lower case', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=device&manufacturer=nosnakecase&family=orcamelcase&model=allowed&type=asparam';
        const response = ImageInstance.device('NoSnakeCase', 'orCamelCase', 'allowed', 'ASPARAM');
        expect(response).to.be.all_lowercase;
        expect(response).to.equal(expectation);
      });

      it('should throw a type error if incorrect param types are given', () => {
        const inputParams = [
          { 'manufacturer': '', 'family': '', 'model': '', 'type': '' },
          { 'manufacturer': 'manufacturer', 'family': 'manufacturer', 'model': 'manufacturer', 'type': 'manufacturer' },
          { 'manufacturer': null, 'family': null, 'model': null, 'type': null },
          { 'manufacturer': undefined, 'family': undefined, 'model': undefined, 'type': undefined },
          { 'manufacturer': '', 'family': null, 'model': 'model name', 'type': '' }
        ];

        _.map(inputParams, (params) => {
          expect(() => {
            ImageInstance.device(Object.values(params));
          }).to.throw(TypeError);
        })
      });

      it('should replace device `model` whitespaces (if any) with dash [-]', () => {
        const expectation = 'https://non-existing-mock-url/path/to?domain=device&manufacturer=manufacturer&family=family&model=model-name&type=type';
        const response = ImageInstance.device('Manufacturer', 'Family', 'Model Name', 'Type');
        expect(response).to.equal(expectation);
      });

    })
  });

})
