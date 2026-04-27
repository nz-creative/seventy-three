import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges class strings", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional and falsey values", () => {
    const show = false;
    expect(cn("a", show && "b", "c")).toBe("a c");
  });

  it("merges tailwind conflicts last wins", () => {
    expect(cn("text-sm", "text-base")).toBe("text-base");
  });
});
