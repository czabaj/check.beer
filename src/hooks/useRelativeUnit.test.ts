import { act, renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";

import { useRelativeUnit } from "./useRelativeUnit";

describe("useRelativeUnit", () => {
  it(`should use seconds for sub-minute timespan`, () => {
    const ago5seconds = Date.now() - 4500;
    const { result } = renderHook(() => useRelativeUnit(ago5seconds));
    expect(result.current).toMatchObject({ range: `second`, value: -5 });
  });
});
