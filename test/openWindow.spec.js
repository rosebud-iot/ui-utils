import { openWindow } from "../src/openWindow";
import { expect } from "chai";
import sinon from "sinon";

describe("openWindow", () => {
  let openSpy;
  let windowMock;
  let consoleErrorSpy;

  beforeEach(() => {
    openSpy = sinon.spy();
    windowMock = { open: openSpy };
  });

  afterEach(() => {
    sinon.restore();
    consoleErrorSpy = null;
  });

  it("should call window.open with default target and features", () => {
    const path = "/#/test/path";

    openWindow(path, undefined, undefined, windowMock);

    expect(openSpy.calledWith(path, "_blank", "noopener,noreferrer")).to.be
      .true;
  });

  it("should call window.open with a custom target", () => {
    const path = "/#/custom";
    const target = "_self";

    openWindow(path, target, undefined, windowMock);

    expect(openSpy.calledWith(path, target, "noopener,noreferrer")).to.be.true;
  });

  it("should call window.open with custom features", () => {
    const path = "/#/popup";
    const target = "_blank";
    const features = "width=600,height=400";

    openWindow(path, target, features, windowMock);

    expect(openSpy.calledWith(path, target, features)).to.be.true;
  });

  it("should not call window.open if path is missing", () => {
    openWindow("", undefined, undefined, windowMock);

    expect(openSpy.called).to.be.false;
  });

  it("should log an error if path is missing", () => {
    consoleErrorSpy = sinon.stub(console, "error");

    openWindow(undefined, undefined, undefined, windowMock);

    expect(consoleErrorSpy.calledWith("Path is required to open a new window."))
      .to.be.true;
  });
});
