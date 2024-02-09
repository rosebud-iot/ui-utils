import { expect } from "chai";

import isLocalHost from "../src/isLocalHost";
import setLocationHost from "../src/setLocationHost";

global.window = { location: { host: "" } };

describe("isLocalHost", () => {
  beforeEach(() => {
    setLocationHost();
  });

  it("should return true when the host is localhost", () => {
    expect(isLocalHost()).to.eql(true);
  });

  it("should return false when the host is NOT localhost", () => {
    setLocationHost("example.com");

    expect(isLocalHost()).to.eql(false);
  });

  it("should return true when the argument is localhost", () => {
    setLocationHost("example.com");

    expect(isLocalHost("localhost")).to.eql(true);
  });

  it("should return false when the argument is NOT localhost", () => {
    expect(isLocalHost("example.com")).to.eql(false);
  });
});
