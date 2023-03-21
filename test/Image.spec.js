import sinon from "sinon";
import chai, { assert, expect, should } from "chai";
import chaiStringHelper from "./helpers/strings";
import _ from "lodash";
import { Utils } from "../src/Image";

const CMS_CONFIG = {
  protocol: "https",
  domain: "non-existing-mock-url",
  port: "",
  images: "/path/to",
};

chai.use(chaiStringHelper);

describe("Image.Utils", () => {
  describe("Instance", () => {
    let ImageInstance;

    beforeEach(() => {
      ImageInstance = new Utils(CMS_CONFIG);
    });

    it("should exist", () => {
      expect(ImageInstance).to.exist;
    });

    describe("Method imageURLWithParams", () => {
      const expectation =
        "https://non-existing-mock-url/path/to?domain=a&manufacturer=b&family=c&type=thumbnail";
      const paramsString = "domain=a&manufacturer=b&family=c";

      beforeEach(() => {
        sinon.stub(console, "warn");
      });

      afterEach(() => {
        console.warn.restore();
      });

      it("should log an error if required `paramsString` param is missing or provided empty", () => {
        const errorParamsStrings = ["", [], undefined, null, false, true];
        _.each(errorParamsStrings, (param) => {
          ImageInstance.imageURLWithParams(param);
          expect(console.warn.called).to.be.true;
          expect(console.warn.callCount).to.equal(
            errorParamsStrings.indexOf(param) + 1
          );
        });
      });

      it("should return expected string for the correct params", () => {
        const response = ImageInstance.imageURLWithParams(paramsString);
        expect(response).to.be.a("string");
        expect(response).to.equal(expectation);
      });

      it("should call `url` method", () => {
        sinon.stub(ImageInstance, "url");
        expect(ImageInstance.url.called).to.be.false;
        ImageInstance.imageURLWithParams(paramsString);
        expect(ImageInstance.url.called).to.be.true;
        ImageInstance.url.reset();
      });
    });
  });
});
