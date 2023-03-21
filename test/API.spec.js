import sinon from "sinon";
import { expect } from "chai";
import { Utils } from "../src/API";

describe("API", () => {
  const profile = {
    protocol: "https",
    domain: "example.com",
    port: "8080",
    login: "/login",
    bracelets: "/bracelets",
  };

  describe("constructor", () => {
    it("should throw a TypeError if profile is not a object", () => {
      expect(() => {
        new Utils(null);
      }).to.throw(TypeError);
    });

    it("should extend the profile with a new object", () => {
      const utils = new Utils({});

      utils.extend({ endpoint: "https://example.com/api" });

      expect(utils.profile).to.deep.equal({
        endpoint: "https://example.com/api",
      });
    });
  });

  describe("URIBuilder", () => {
    let utils;

    beforeEach(() => {
      utils = new Utils({
        protocol: "https",
        domain: "example.com",
        port: "",
        login: "/login",
        bracelets: "/bracelets",
      });
    });

    it("should throw a TypeError if resource is not a string", () => {
      expect(() => utils.URIBuilder(123, {})).to.throw(TypeError);
    });

    it("should throw a TypeError if config is not an object", () => {
      expect(() => utils.URIBuilder("login", "not an object")).to.throw(
        TypeError
      );
    });

    it("should return a URL with default config", () => {
      const url = utils.URIBuilder("login", {});

      expect(url).to.equal("https://example.com/login");
    });
  });

  describe("getURL", () => {
    let utils;

    beforeEach(() => {
      utils = new Utils({
        protocol: "https",
        domain: "example.com",
        port: "",
        login: "/login",
        bracelets: "/bracelets",
      });
    });

    it("should throw a ReferenceError if resource is missing", () => {
      expect(() => utils.getURL()).to.throw(ReferenceError);
    });

    it("should return a URL with default config", () => {
      const url = utils.getURL("login");

      expect(url).to.equal("https://example.com/login");
    });

    it("should return a URL with custom path", () => {
      const url = utils.getURL("bracelets", { path: "/green" });

      expect(url).to.equal("https://example.com/bracelets/green");
    });

    it("should return a URL with custom config", () => {
      const url = utils.getURL("bracelets", { config: { protocol: "https" } });

      expect(url).to.equal("https://example.com/bracelets");
    });
  });
});
