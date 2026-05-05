import { describe, expect, it } from "vitest";

import {
  fieldAriaDescribedBy,
  fieldIdSuffixFromReactId,
} from "./field-ids";

describe("fieldIdSuffixFromReactId", () => {
  it("removes colons from React useId-style strings", () => {
    expect(fieldIdSuffixFromReactId(":r1:")).toBe("r1");
    expect(fieldIdSuffixFromReactId("field-:abc:tail")).toBe("field-abctail");
  });

  it("passes through ids without colons", () => {
    expect(fieldIdSuffixFromReactId("plain")).toBe("plain");
  });
});

describe("fieldAriaDescribedBy", () => {
  const desc = "field-desc-x";
  const err = "field-err-x";

  it("returns undefined when neither hint nor error is present", () => {
    expect(
      fieldAriaDescribedBy({
        hintPresent: false,
        errorPresent: false,
        descriptionId: desc,
        errorId: err,
      })
    ).toBeUndefined();
  });

  it("includes only description id when hint is present", () => {
    expect(
      fieldAriaDescribedBy({
        hintPresent: true,
        errorPresent: false,
        descriptionId: desc,
        errorId: err,
      })
    ).toBe(desc);
  });

  it("includes only error id when error is present", () => {
    expect(
      fieldAriaDescribedBy({
        hintPresent: false,
        errorPresent: true,
        descriptionId: desc,
        errorId: err,
      })
    ).toBe(err);
  });

  it("joins description then error when both are present", () => {
    expect(
      fieldAriaDescribedBy({
        hintPresent: true,
        errorPresent: true,
        descriptionId: desc,
        errorId: err,
      })
    ).toBe(`${desc} ${err}`);
  });
});
