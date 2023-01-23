import { expect } from "chai";
import type from "../src/type";

describe('type', () => {
  it('should exist', () => {
    expect(type).to.exist;
  })

  it('should return "string" for a string argument', () => {
    expect(type('hello')).to.equal('string');
  });

  it('should return "number" for a number argument', () => {
    expect(type(123)).to.equal("number");
  });

  it('should return "boolean" for a boolean argument', () => {
    expect(type(true)).to.equal("boolean");
  });

  it('should return "array" for an array argument', () => {
    expect(type([1, 2, 3])).to.equal("array");
  });

  it('should return "object" for an object argument', () => {
    expect(type({ key: "value" })).to.equal("object");
  });

  it('should return "null" for a null argument', () => {
    expect(type(null)).to.equal("null");
  });

  it('should return "undefined" for an undefined argument', () => {
    expect(type(undefined)).to.equal("undefined");
  });

  it('should return "function" for a function argument', () => {
    expect(type(() => {})).to.equal("function");
  });

  it('should return "symbol" for a symbol argument', () => {
    expect(type(Symbol())).to.equal("symbol");
  });
});
