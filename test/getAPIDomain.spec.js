import { expect } from "chai";

import getAPIDomain from "../src/getAPIDomain";
import setLocationHost from "../src/setLocationHost";

describe("getAPIDomain", () => {
  it("should return the default URL", () => {
    setLocationHost();

    expect(getAPIDomain(undefined, "something")).to.equal(
      "something.mobile.sweepr.com"
    );
  });

  it("should return the URL with a custom dev", () => {
    setLocationHost();

    expect(getAPIDomain(undefined, "something", "qa")).to.equal(
      "something.qa.sweepr.com"
    );
  });

  it("should return the URL on a live website when the host is not provided", () => {
    setLocationHost("admin.qa.sweepr.com");

    expect(getAPIDomain(undefined, "support")).to.equal(
      "support.qa.sweepr.com"
    );
    expect(getAPIDomain(undefined, "support", "mobile")).to.equal(
      "support.qa.sweepr.com"
    );
  });

  it("should return the URL on localhost when the host is not provided", () => {
    setLocationHost();

    expect(getAPIDomain(undefined, "support")).to.equal(
      "support.mobile.sweepr.com"
    );
    expect(getAPIDomain(undefined, "support", "qa")).to.equal(
      "support.qa.sweepr.com"
    );
  });
});
