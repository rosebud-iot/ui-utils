import sinon from "sinon";
import { expect } from "chai";
import _ from "lodash";
import { CRUD } from "../src/CRUD";

const axiosStub = {
  request: sinon.stub(),
  defaults: { headers: { common: { Authorization: "Bearer ABC-valid-token" } } }
};

const crud = new CRUD({
  axiosInstance: axiosStub,
  sideEffects: { conditions: [] }
});

describe("CRUD", () => {
  afterEach(() => {
    axiosStub.request.reset();
  });

  it("should exist", () => {
    expect(CRUD).to.exist;
    expect(crud).to.exist;
  });

  it("should have own Axios instance", () => {
    expect(crud.axiosInstance).to.exist;
  });

  describe("Method", () => {
    it("should expose CREATE method", () => {
      expect(crud.create).to.be.a("function");
    });

    it("should expose READ method", () => {
      expect(crud.read).to.be.a("function");
    });

    it("should expose UPDATE method", () => {
      expect(crud.update).to.be.a("function");
    });

    it("should expose DELETE method", () => {
      expect(crud.delete).to.be.a("function");
    });
  });

  describe("XHR method via CRUD operations", () => {
    beforeEach(() => {
      sinon.stub(crud, "xhr");
    });

    afterEach(() => {
      crud.xhr.restore();
    });

    it("should call XHR from CREATE with correct params", () => {
      crud.create("/test", { a: 1, b: 2 });
      expect(crud.xhr.withArgs("/test", { a: 1, b: 2 }, "POST").calledOnce).to
        .be.true;
    });

    it("should call XHR from READ with correct params", () => {
      crud.read("/test");
      expect(crud.xhr.withArgs("/test", null, "GET").calledOnce).to.be.true;
    });

    it("should call XHR from READ with correct params and responseType", () => {
      crud.read("/test","blob");
      expect(crud.xhr.withArgs("/test", null, "GET", "blob").calledOnce).to.be.true;
    });

    it("should call XHR from UPDATE with correct params", () => {
      crud.update("/test", { a: 1 });
      expect(crud.xhr.withArgs("/test", { a: 1 }, "PUT").calledOnce).to.be.true;
    });

    it("should call XHR from DELETE with correct params", () => {
      crud.delete("/test/11");
      expect(crud.xhr.withArgs("/test/11", null, "DELETE").calledOnce).to.be
        .true;
    });
  });

  describe("XHR", () => {
    beforeEach(() => {
      sinon.stub(console, "info");
    });

    afterEach(() => {
      console.info.restore();
    });

    it.skip("should throw error unless all conditions are met (sideEffects.conditions)", () => {});

    it('should properly call Axios "request" method', () => {
      const resp = {
        request: {
          status: 200,
          responseURL: "/response-url"
        },
        status: 200,
        data: {}
      };
      axiosStub.request.resolves(resp);
      expect(axiosStub.request.called).to.be.false;

      crud.xhr("/url", { a: 1 }, "GET");
      expect(axiosStub.request.calledOnce).to.be.true;
      expect(
        axiosStub.request.calledOnceWith({
          method: "GET",
          url: "/url",
          responseType: "json",
          data: { a: 1 }
        })
      ).to.be.true;
    });

    it.skip("should properly handle Axios request error results", () => {});
  });
});
