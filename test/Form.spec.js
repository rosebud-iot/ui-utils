import sinon from "sinon";
import { expect } from "chai";
import _ from "lodash";
import { Validation } from "../src/Form";

describe("Validation", () => {
  it("should exist", () => {
    expect(Validation).to.exist;
  });

  describe("Method", () => {
    describe("required", () => {
      it("should exist", () => {
        expect(Validation.required).to.exist;
      });

      it("should return true if value is valid", () => {
        const input = "some-valid-string";
        const result = Validation.required(input);
        expect(result).to.be.true;
      });

      it("should return false if value is invalid", () => {
        const result = Validation.required();
        expect(result).to.be.false;
      });

      it("should not consider null to be valid", () => {
        const result = Validation.required(null);
        expect(result).to.be.false;
      });

      it("should not consider empty string to be valid", () => {
        const result = Validation.required("");
        expect(result).to.be.false;
      });

      it("should not consider string with whitespace to be valid", () => {
        let result = Validation.required(" ");
        expect(result).to.be.false;

        result = Validation.required("           ");
        expect(result).to.be.false;
      });
    });

    describe("minChar", () => {
      it("should exist", () => {
        expect(Validation.minChar).to.exist;
      });

      it("should throw type error if value is invalid", () => {
        const value = {};
        expect(() => Validation.minChar(value)).to.throw(TypeError);
      });

      it("should throw type error if minCharCount is invalid", () => {
        const value = "oa9di28";
        const minCharCount = "2";
        expect(() => Validation.minChar(value, minCharCount)).to.throw(
          TypeError
        );
      });

      it("should return true if value length is same as default", () => {
        const value = "L3";
        const result = Validation.minChar(value);
        expect(result).to.be.true;
      });

      it("should return true if value length is same as minCharCount", () => {
        const value = "abcdefgh";
        const minCharCount = 8;
        const result = Validation.minChar(value, minCharCount);
        expect(result).to.be.true;
      });

      it("should return false if value length is below minCharCount", () => {
        const value = "abcdefg";
        const minCharCount = 8;
        const result = Validation.minChar(value, minCharCount);
        expect(result).to.be.false;
      });
    });

    describe("maxChar", () => {
      it("should exist", () => {
        expect(Validation.maxChar).to.exist;
      });

      it("should throw type error if value is invalid", () => {
        const value = {};
        expect(() => Validation.maxChar(value)).to.throw(TypeError);
      });

      it("should throw type error if maxCharCount is invalid", () => {
        const value = "oa9di28";
        const maxCharCount = "2";
        expect(() => Validation.maxChar(value, maxCharCount)).to.throw(
          TypeError
        );
      });

      it("should return true if value length is same as default", () => {
        const value = _.times(100, () => ".").join("");
        const result = Validation.maxChar(value);
        expect(result).to.be.true;
      });

      it("should return true if value length is same as maxCharCount", () => {
        const value = "abcd";
        const maxCharCount = 4;
        const result = Validation.maxChar(value, maxCharCount);
        expect(result).to.be.true;
      });

      it("should return false if value length is over maxCharCount", () => {
        const value = "abcde";
        const maxCharCount = 4;
        const result = Validation.maxChar(value, maxCharCount);
        expect(result).to.be.false;
      });
    });
  });
});
