import { expect } from "chai";

import getDomainURL from "../src/getDomainURL";
import setLocationHost from "../src/setLocationHost";

describe("getDomainURL", () => {
  it("should return the URL", () => {
    expect(
      getDomainURL({
        protocol: "http",
        host: "admin.custom.sweepr.com",
        prefix: "support",
      })
    ).to.equal("http://support.custom.sweepr.com");
  });

  it("should return the URL on a live website when the host is not provided", () => {
    setLocationHost("admin.qa.sweepr.com");

    expect(getDomainURL({ protocol: "http", prefix: "support" })).to.equal(
      "http://support.qa.sweepr.com"
    );
  });

  it("should return the URL on localhost when the host is not provided", () => {
    setLocationHost();

    expect(getDomainURL({ protocol: "http", prefix: "support" })).to.equal(
      "http://support.mobile.sweepr.com"
    );
    expect(
      getDomainURL({ protocol: "http", prefix: "support", dev: "random" })
    ).to.equal("http://support.random.sweepr.com");
  });
});
