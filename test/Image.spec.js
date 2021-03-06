import sinon from "sinon";
import chai, { assert, expect, should } from "chai";
import chaiStringHelper from "./helpers/strings";
import _ from "lodash";
import { Utils } from "../src/Image";

const CMS_CONFIG = {
  protocol: "https",
  domain: "non-existing-mock-url",
  port: "",
  images: "/path/to"
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

    describe("Method service", () => {
      it("should return expected string for correct params", () => {
        const expectation =
          "https://non-existing-mock-url/path/to?domain=service&category=a&service=b&type=squishy";
        const params = {
          category: "a",
          service: "b",
          type: "squishy"
        };
        const response = ImageInstance.service(params);
        expect(response).to.be.a("string");
        expect(response).to.equal(expectation);
      });

      it("should return string that is all lower case", () => {
        const expectation =
          "https://non-existing-mock-url/path/to?domain=service&category=nosnakecase&service=orcamelcase&type=allowed";
        const params = {
          category: "NoSnakeCase",
          service: "orCamelCase",
          type: "allowed"
        };
        const response = ImageInstance.service(params);
        expect(response).to.be.all_lowercase;
        expect(response).to.equal(expectation);
      });

      it("should ignore missing params if they are provided as undefined", () => {
        const expectation =
          "https://non-existing-mock-url/path/to?domain=service&category=nosnakecase&type=allowed";
        const params = {
          category: "NoSnakeCase",
          service: undefined,
          type: "allowed"
        };
        const response = ImageInstance.service(params);
        expect(response).to.equal(expectation);
      });
    });

    describe("Method device", () => {
      it("should return expected string for the correct params", () => {
        const expectation =
          "https://non-existing-mock-url/path/to?domain=device&manufacturer=a&family=b&model=c&type=squishy";
        const params = {
          manufacturer: "a",
          family: "b",
          model: "c",
          type: "squishy"
        };
        const response = ImageInstance.device(params);
        expect(response).to.be.a("string");
        expect(response).to.equal(expectation);
      });

      it("should return string that is all lower case", () => {
        const expectation =
          "https://non-existing-mock-url/path/to?domain=device&manufacturer=nosnakecase&family=orcamelcase&model=allowed&type=asparam";
        const params = {
          manufacturer: "NoSnakeCase",
          family: "orCamelCase",
          model: "allowed",
          type: "ASPARAM"
        };
        const response = ImageInstance.device(params);
        expect(response).to.be.all_lowercase;
        expect(response).to.equal(expectation);
      });

      it("should ignore missing params if they are provided as undefined", () => {
        const expectation =
          "https://non-existing-mock-url/path/to?domain=device&manufacturer=nosnakecase&type=asparam";
        const params = {
          manufacturer: "NoSnakeCase",
          family: undefined,
          model: undefined,
          type: "ASPARAM"
        };
        const response = ImageInstance.device(params);
        expect(response).to.equal(expectation);
      });

      it("should replace params whitespaces (if any) with dash [-]", () => {
        const expectation =
          "https://non-existing-mock-url/path/to?domain=device&manufacturer=manufacturer&family=some-family-name&model=model-name&type=type";
        const params = {
          manufacturer: "Manufacturer",
          family: "Some Family Name",
          model: "Model Name",
          type: "Type"
        };
        const response = ImageInstance.device(params);
        expect(response).to.equal(expectation);
      });
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
        _.each(errorParamsStrings, param => {
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
