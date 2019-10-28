import sinon from "sinon";
import { expect } from "chai";
import _ from "lodash";
import parameterize from "../src/parameterize";

describe("Parameterize", () => {
  it("should exist", () => {
    expect(parameterize).to.exist;
  });

  it("should return a string", () => {
    expect(parameterize({ a: "b" })).to.be.a("string");
  });

  it("should return expected string", () => {
    expect(parameterize({ first: "1st", second: "2nd" })).to.eql(
      "?first=1st&second=2nd"
    );
  });

  it("should merge in existing query string if present", () => {
    expect(
      parameterize({ first: "1st", second: "2nd" }, "?third=3rd&fourth=4th")
    ).to.eql("?third=3rd&fourth=4th&first=1st&second=2nd");
  });

  it("should leave leading question mark optional", () => {
    expect(
      parameterize({ first: "1st", second: "2nd" }, "third=3rd&fourth=4th")
    ).to.eql("?third=3rd&fourth=4th&first=1st&second=2nd");
  });
});
