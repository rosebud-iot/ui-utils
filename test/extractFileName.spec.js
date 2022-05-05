import sinon from "sinon";
import { expect } from "chai";
import _ from "lodash";
import extractFileName from "../src/extractFileName";

describe("extractFileName", () => {
  beforeEach(() => {
    sinon.stub(console, "warn");
  });

  afterEach(() => {
    console.warn.restore();
  });

  it("should exist", () => {
    expect(extractFileName).to.exist;
  });

  describe("Called improperly", () => {
    it("should not throw", () => {
      expect(() => extractFileName(undefined)).not.to.throw();
    });

    it("should complain", () => {
      expect(console.warn.called).to.be.false;
      extractFileName(undefined);
      expect(console.warn.called).to.be.true;
    });

    it("should return default string", () => {
      expect(extractFileName(undefined)).to.equal("download");
    });

    it("should return given default string", () => {
      expect(extractFileName(undefined, "MYFILE.zip")).to.equal("MYFILE.zip");
    });
  });

  describe("Called properly", () => {
    const payloadWithoutDisposition = {
      headers: {
        "content-disposition": "attachment; NOTHING",
      },
    };
    const payload = {
      headers: {
        "content-disposition": "attachment; filename=my_real-filename.zip",
      },
    };

    it("should return default string if missing payload disposition", () => {
      expect(extractFileName(payloadWithoutDisposition)).to.equal("download");
      expect(extractFileName(payloadWithoutDisposition, "MYFILE.zip")).to.equal(
        "MYFILE.zip"
      );
    });

    it("should return expected filename", () => {
      expect(extractFileName(payload)).to.equal("my_real-filename.zip");
      expect(extractFileName(payload, "MYFILE.zip")).to.equal(
        "my_real-filename.zip"
      );
    });
  });
});
