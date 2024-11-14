import { describe, it, expect } from "vitest";
import Email from "../Email";

describe("Email", () => {
  it("should initialize with default values", () => {
    const email = new Email({});
    expect(email.multi).toBe(false);
    expect(email.size).toBeUndefined();
  });

  it("should set multi property correctly from widget_props", () => {
    const email = new Email({ widget_props: { multi: true } });
    expect(email.multi).toBe(true);
  });

  it("should set size property correctly", () => {
    const email = new Email({ size: 10 });
    expect(email.size).toBe(10);
  });

  it("should update multi property", () => {
    const email = new Email({});
    email.multi = true;
    expect(email.multi).toBe(true);
  });

  it("should update size property", () => {
    const email = new Email({});
    email.size = 20;
    expect(email.size).toBe(20);
  });
});
