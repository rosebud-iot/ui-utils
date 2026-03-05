// Test file that mimics how ui-admin imports and uses ui-utils
// Run with: npm test test/test-imports.js

const { expect } = require('chai');

describe('Import patterns from consuming projects', () => {
  let API, Image;

  before(() => {
    // Work around Storage's window dependency by importing modules directly
    // This mimics: import { API, Image } from 'ui-utils';
    const APIModule = require('../dist/API.js');
    const ImageModule = require('../dist/Image.js');

    // Simulate the namespace export behavior: export * as API from './API'
    API = APIModule;
    Image = ImageModule;
  });

  describe('API export structure', () => {
    it('should export API as an object', () => {
      expect(API).to.be.an('object');
    });

    it('should have Utils property on API', () => {
      expect(API).to.have.property('Utils');
    });

    it('should have Utils as a constructor function', () => {
      expect(API.Utils).to.be.a('function');
      expect(API.Utils.prototype.constructor).to.equal(API.Utils);
    });
  });

  describe('Image export structure', () => {
    it('should export Image as an object', () => {
      expect(Image).to.be.an('object');
    });

    it('should have Utils property on Image', () => {
      expect(Image).to.have.property('Utils');
    });

    it('should have Utils as a constructor function', () => {
      expect(Image.Utils).to.be.a('function');
      expect(Image.Utils.prototype.constructor).to.equal(Image.Utils);
    });
  });

  describe('API.Utils instantiation (mimicking ui-admin usage)', () => {
    const API_CONFIG = {
      protocol: 'https',
      domain: 'api.example.com',
      port: '',
      login: '/auth/login',
      users: '/api/users',
    };

    let apiInstance;

    it('should instantiate with new API.Utils(API_CONFIG)', () => {
      expect(() => {
        apiInstance = new API.Utils(API_CONFIG);
      }).to.not.throw();
    });

    it('should have the profile property', () => {
      expect(apiInstance).to.have.property('profile');
      expect(apiInstance.profile).to.deep.equal(API_CONFIG);
    });

    it('should have getURL method', () => {
      expect(apiInstance).to.have.property('getURL');
      expect(apiInstance.getURL).to.be.a('function');
    });

    it('should generate correct URLs', () => {
      const loginUrl = apiInstance.getURL('login');
      expect(loginUrl).to.equal('https://api.example.com/auth/login');

      const usersUrl = apiInstance.getURL('users');
      expect(usersUrl).to.equal('https://api.example.com/api/users');
    });

    it('should have URIBuilder method', () => {
      expect(apiInstance).to.have.property('URIBuilder');
      expect(apiInstance.URIBuilder).to.be.a('function');
    });

    it('should have extend method', () => {
      expect(apiInstance).to.have.property('extend');
      expect(apiInstance.extend).to.be.a('function');
    });

    it('should generate URLs with path addendum', () => {
      const url = apiInstance.getURL('users', { path: '/123' });
      expect(url).to.equal('https://api.example.com/api/users/123');
    });

    it('should generate URLs with query params', () => {
      const url = apiInstance.getURL('users', {
        params: { active: true, limit: 10 },
      });
      expect(url).to.include('https://api.example.com/api/users?');
      expect(url).to.include('active=true');
      expect(url).to.include('limit=10');
    });
  });

  describe('Image.Utils instantiation (mimicking ui-admin usage)', () => {
    const API_CONFIG = {
      protocol: 'https',
      domain: 'images.example.com',
      port: '',
      upload: '/api/upload',
      gallery: '/api/gallery',
    };

    let imageInstance;

    it('should instantiate with new Image.Utils(API_CONFIG)', () => {
      expect(() => {
        imageInstance = new Image.Utils(API_CONFIG);
      }).to.not.throw();
    });

    it('should have the profile property', () => {
      expect(imageInstance).to.have.property('profile');
      expect(imageInstance.profile).to.deep.equal(API_CONFIG);
    });

    it('should have url method', () => {
      expect(imageInstance).to.have.property('url');
      expect(imageInstance.url).to.be.a('function');
    });

    it('should generate correct URLs', () => {
      const uploadUrl = imageInstance.url('upload');
      expect(uploadUrl).to.equal('https://images.example.com/api/upload');

      const galleryUrl = imageInstance.url('gallery');
      expect(galleryUrl).to.equal('https://images.example.com/api/gallery');
    });

    it('should have imageUrlBuilder method', () => {
      expect(imageInstance).to.have.property('imageUrlBuilder');
      expect(imageInstance.imageUrlBuilder).to.be.a('function');
    });

    it('should have imageURLWithParams method', () => {
      expect(imageInstance).to.have.property('imageURLWithParams');
      expect(imageInstance.imageURLWithParams).to.be.a('function');
    });
  });

  describe('Multiple instances should be independent', () => {
    it('should allow creating multiple API instances with different configs', () => {
      const config1 = {
        protocol: 'https',
        domain: 'api1.example.com',
        port: '',
        endpoint: '/api/v1',
      };

      const config2 = {
        protocol: 'http',
        domain: 'api2.example.com',
        port: ':8080',
        endpoint: '/api/v2',
      };

      const instance1 = new API.Utils(config1);
      const instance2 = new API.Utils(config2);

      expect(instance1.profile).to.deep.equal(config1);
      expect(instance2.profile).to.deep.equal(config2);

      const url1 = instance1.getURL('endpoint');
      const url2 = instance2.getURL('endpoint');

      expect(url1).to.equal('https://api1.example.com/api/v1');
      expect(url2).to.equal('http://api2.example.com:8080/api/v2');
    });
  });

  describe('Error handling', () => {
    it('should throw TypeError when API.Utils is instantiated without profile', () => {
      expect(() => {
        new API.Utils();
      }).to.throw(TypeError, 'Expected profile to be an object');
    });

    it('should throw TypeError when API.Utils is instantiated with non-object', () => {
      expect(() => {
        new API.Utils('not an object');
      }).to.throw(TypeError, 'Expected profile to be an object');
    });

    it('should throw ReferenceError when getURL is called without resource', () => {
      const config = {
        protocol: 'https',
        domain: 'example.com',
        port: '',
      };
      const instance = new API.Utils(config);

      expect(() => {
        instance.getURL();
      }).to.throw(ReferenceError, 'Missing resource');
    });
  });
});
