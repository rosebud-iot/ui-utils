import { expect } from "chai";
import _ from "lodash";
import escapeCharacters from "../src/escapeCharacters";

describe("escapeCharacters", () => {
  it("should exist", () => {
    expect(escapeCharacters).to.exist;
  });

  it("should return a string", () => {
    expect(escapeCharacters("a")).to.be.a("string");
  });

  it("should return expected escaped string", () => {
    expect(escapeCharacters("Thomas O'Malley")).to.eql("Thomas O&apos;Malley");
  });

  it("should return expected unescaped string", () => {
    expect(escapeCharacters("Thomas O&apos;Malley", true)).to.eql(
      "Thomas O'Malley"
    );
  });

  it("should return expected escaped object", () => {
    expect(
      escapeCharacters({ a: "Thomas O'Malley", b: { c: "O'Reilly" } })
    ).to.eql({
      a: "Thomas O&apos;Malley",
      b: { c: "O&apos;Reilly" }
    });
  });

  it("should return expected unescaped object", () => {
    expect(
      escapeCharacters(
        { a: "Thomas O&apos;Malley", b: { c: "O&apos;Reilly" } },
        true
      )
    ).to.eql({
      a: "Thomas O'Malley",
      b: { c: "O'Reilly" }
    });
  });

  it("should return the expected date object", () => {
		const dateObj = new Date();
		const input = { value: dateObj };
		const result = escapeCharacters(input);

		expect(result.value).to.be.an.instanceof(Date);
		expect(dateObj.getTime()).to.equal(result.value.getTime());
	});

  it('should return the same empty object instance when passed an empty object', function() {
    const emptyObject = {};

    expect(escapeCharacters(emptyObject)).to.eq(emptyObject);
  });

  it("should preserve field in nested object", () => {
    expect(
      escapeCharacters(
        { a: "Thomas O'Malley", b: { c: "O'Reilly" } },
        false,
        ['c']
      )
    ).to.eql({ a: "Thomas O&apos;Malley", b: { c: "O'Reilly" } });
  });

  it("should preserve nested object in array", () => {
    expect(
      escapeCharacters(
        { a: "Mee'p", b: "Moo'p", c: [1, { d: "Maa'p" }] },
        false,
        ['d']
      )
    ).to.eql({ a: "Mee&apos;p", b: "Moo&apos;p", c: [1, { d: "Maa'p" }] });
  });

  it("should preserve entire array", () => {
    expect(
      escapeCharacters(
        { a: "Mee'p", b: "Moo'p", c: [1, { d: "Maa'p" }] },
        false,
        ['c']
      )
    ).to.eql({ a: "Mee&apos;p", b: "Moo&apos;p", c: [1, { d: "Maa'p" }] });
  });

  it("should preserve irregular, multiple fields", () => {
    expect(
      escapeCharacters(
        { a: "Mee'p", b: "Moo'p", c: [1, { d: "Maa'p" }], e: "Muu'p" },
        false,
        ['a', 'e']
      )
    ).to.eql({ a: "Mee'p", b: "Moo&apos;p", c: [1, { d: "Maa&apos;p" }], e: "Muu'p" });
  });

  it("should reverse escaping, but preserve escapes in nested object in array", () => {
    expect(
      escapeCharacters(
        { a: "Mee&apos;p", b: "Moo&apos;p", c: [1, { d: "Maa&apos;p" }] },
        true,
        ['d']
      )
    ).to.eql({ a: "Mee'p", b: "Moo'p", c: [1, { d: "Maa&apos;p" }] });
  });

  it("should preserve fields with the same name", () => {
    expect(
      escapeCharacters(
        { a: "Mee'p", b: "Moo'p", c: [1, { d: "Maa'p", a: "Muu'p" }] },
        false,
        ['a']
      )
    ).to.eql({ a: "Mee'p", b: "Moo&apos;p", c: [1, { d: "Maa&apos;p", a: "Muu'p" }] });
  });
});
