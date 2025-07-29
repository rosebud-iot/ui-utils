import sinon from "sinon";
import { expect } from "chai";

import { getEndpointURL } from "../src/oEmbed";

describe("getEndpointURL", () => {
  it("should return the YouTube oEmbed URL for a valid YouTube link", () => {
    expect(getEndpointURL("https://www.youtube.com/watch?v=abc123")).to.equal(
      "https://www.youtube.com/oembed"
    );
  });

  it("should return the Vimeo oEmbed URL for a valid Vimeo link", () => {
    expect(getEndpointURL("https://vimeo.com/123456")).to.equal(
      "https://vimeo.com/api/oembed.json"
    );
  });

  it("should return an empty string for an unknown URL", () => {
    expect(getEndpointURL("https://unknown.com/video")).to.equal("");
  });

  it("should return an empty string for a missing URL", () => {
    expect(getEndpointURL()).to.equal("");
  });

  it("should support short YouTube links", () => {
    expect(getEndpointURL("https://youtu.be/abc123")).to.equal(
      "https://www.youtube.com/oembed"
    );
  });

  it("should support Vimeo player links", () => {
    expect(getEndpointURL("https://player.vimeo.com/video/123456")).to.equal(
      "https://vimeo.com/api/oembed.json"
    );
  });
});
