import sinon from "sinon";
import { expect } from "chai";
import _ from "lodash";
import deParameterize from "../src/deParameterize";

describe("deParameterize", () => {
  it("should exist", () => {
    expect(deParameterize).to.exist;
  });

  it("should return an object", () => {
    expect(deParameterize("?first=1st&second=2nd")).to.be.an("object");
  });

  it("should return expected object", () => {
    expect(deParameterize("?first=1st&second=2nd")).to.eql({
      first: "1st",
      second: "2nd",
    });
  });

  it("should leave leading question mark optional", () => {
    expect(
      deParameterize("?third=3rd&fourth=4th&first=1st&second=2nd")
    ).to.eql({ third: "3rd", fourth: "4th", first: "1st", second: "2nd" });
  });
});
