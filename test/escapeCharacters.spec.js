import { expect } from "chai";
import _ from "lodash";
import escapeCharacters from "../src/escapeCharacters";

describe("escapeCharacters", () => {
  it("should exist", () => {
    expect(escapeCharacters).to.exist;
  });

  it("should return a string", () => {
    expect(escapeCharacters("a")).to.be.a("string");
  });

  it("should return expected escaped string", () => {
    expect(escapeCharacters("Thomas O'Malley")).to.eql("Thomas O&apos;Malley");
  });

  it("should return expected unescaped string", () => {
    expect(escapeCharacters("Thomas O&apos;Malley", true)).to.eql(
      "Thomas O'Malley"
    );
  });

  it("should return expected escaped object", () => {
    expect(
      escapeCharacters({ a: "Thomas O'Malley", b: { c: "O'Reilly" } })
    ).to.eql({
      a: "Thomas O&apos;Malley",
      b: { c: "O&apos;Reilly" }
    });
  });

  it("should return expected unescaped object", () => {
    expect(
      escapeCharacters(
        { a: "Thomas O&apos;Malley", b: { c: "O&apos;Reilly" } },
        true
      )
    ).to.eql({
      a: "Thomas O'Malley",
      b: { c: "O'Reilly" }
    });
  });
});
