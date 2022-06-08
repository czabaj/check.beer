import { renderHook } from "@testing-library/react-hooks";
import { beforeAll, afterAll, describe, expect, it, vi } from "vitest";

import { useRelativeUnit } from "./useRelativeUnit";

describe("useRelativeUnit", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  it(`should use seconds for sub-minute timespan`, () => {
    const ago5seconds = Date.now() - 5000;
    const { result } = renderHook(() => useRelativeUnit(ago5seconds));
    expect(result.current).toMatchObject({ range: `second`, value: -5 });
  });
  it(`should advance to next unit`, () => {
    const ago5seconds = Date.now() - 5000;
    const { result } = renderHook(() => useRelativeUnit(ago5seconds));
    expect(result.current).toMatchObject({ range: `second`, value: -5 });
    vi.advanceTimersByTime(1000);
    expect(result.current).toMatchObject({ range: `second`, value: -6 });
  });
  it(`should change hours to minutes`, () => {
    const agoHourAndSomeSeconds = Date.now() - 60 * 60 * 1000 + 500;
    const { result } = renderHook(() => useRelativeUnit(agoHourAndSomeSeconds));
    expect(result.current).toMatchObject({ range: `minute`, value: -59 });
    vi.advanceTimersByTime(1000 * 120);
    expect(result.current).toMatchObject({ range: `hour`, value: -1 });
  });
});
