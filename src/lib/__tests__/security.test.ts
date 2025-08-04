import { describe, it, expect } from "@jest/globals";
import { checkoutSchema, userSchema } from "../validations";

describe("Validation Security", () => {
  it("should reject invalid price IDs", () => {
    const result = checkoutSchema.safeParse({ priceId: "" });
    expect(result.success).toBe(false);
  });

  it("should reject invalid emails", () => {
    const result = userSchema.safeParse({
      id: "user_123",
      email: "invalid-email",
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid checkout data", () => {
    const result = checkoutSchema.safeParse({
      priceId: "price_1234567890",
    });
    expect(result.success).toBe(true);
  });
});
