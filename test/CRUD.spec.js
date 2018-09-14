
import sinon from 'sinon';
import { expect } from 'chai';
import _ from 'lodash';
import { CRUD } from '../src/CRUD';

const axiosStub = sinon.stub();
const crud = new CRUD({ axiosInstance: axiosStub, sideEffects: { conditions: [] } });

describe('CRUD', () => {

  it('should exist', () => {
    expect(CRUD).to.exist;
    expect(crud).to.exist;
  })

  describe('should expose all CRUD methods', () => {

    it('should expose CREATE method', () => {
      expect(crud.create).to.be.a('function');
    })

    it('should expose READ method', () => {
      expect(crud.read).to.be.a('function');
    })

    it('should expose UPDATE method', () => {
      expect(crud.update).to.be.a('function');
    })

    it('should expose DELETE method', () => {
      expect(crud.delete).to.be.a('function');
    })

  })

  describe('should call XHR method via CRUD operations', () => {

    beforeEach(() => {
      sinon.stub(crud, 'xhr');
    });

    afterEach(() => {
      crud.xhr.restore();
    });

    it('should call XHR from CREATE with correct params', () => {
      crud.create('/test', { a: 1, b: 2 });
      expect(crud.xhr.withArgs('/test', { a: 1, b: 2 }, 'POST').calledOnce).to.be.true;
    });

    it('should call XHR from READ with correct params', () => {
      crud.read('/test');
      expect(crud.xhr.withArgs('/test', null, 'GET').calledOnce).to.be.true;
    });

    it('should call XHR from UPDATE with correct params', () => {
      crud.update('/test', { a: 1 });
      expect(crud.xhr.withArgs('/test', { a: 1 }, 'PUT').calledOnce).to.be.true;
    });

    it('should call XHR from DELETE with correct params', () => {
      crud.delete('/test/11');
      expect(crud.xhr.withArgs('/test/11', null, 'DELETE').calledOnce).to.be.true;
    });

  });

  describe('XHR', () => {
    it.skip('should test the XHR method', () => {});
  });
})
