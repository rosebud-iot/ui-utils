import { expect } from "chai";

import setLocationHost from "../src/setLocationHost";

describe("setLocationHost", () => {
  it("should set the location host to localhost", () => {
    global.window = { location: { host: "" } };

    expect(window.location.host).to.eql("");

    setLocationHost();

    expect(window.location.host).to.eql("localhost");
  });

  it("should set the location host", () => {
    expect(window.location.host).to.eql("localhost");

    setLocationHost("example.com");

    expect(window.location.host).to.eql("example.com");
  });
});
