import { describe, expect, test } from "vitest";

import { delayU } from "~/utils/promise";
import { getSlidingWindow } from "./db";

describe(`getSlidingWindow`, () => {
  test(`Should return the same result for one hour`, async () => {
    const result = getSlidingWindow();
    await delayU(200);
    expect(getSlidingWindow()).toBe(result);
    await delayU(200);
    expect(getSlidingWindow()).toBe(result);
  });
});
