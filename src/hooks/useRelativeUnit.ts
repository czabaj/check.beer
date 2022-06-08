import { useEffect, useMemo, useReducer } from "react";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

type RelativeTimeFormatSingularUnit = `second` | `minute` | `hour` | `day`;

function selectUnit(millis: number): RelativeTimeFormatSingularUnit {
  const absValue = Math.abs(millis);
  if (absValue < MINUTE) return "second";
  if (absValue < HOUR) return "minute";
  if (absValue < DAY) return "hour";
  return "day";
}

function getDurationInMillis(unit?: RelativeTimeFormatSingularUnit): number {
  switch (unit) {
    case "second":
      return 1000;
    case "minute":
      return MINUTE;
    case "hour":
      return HOUR;
    default:
      return DAY;
  }
}

type RelativeTime = {
  nextTick: number;
  range: RelativeTimeFormatSingularUnit;
  value: number;
};

const countRelativeTime = (millis: number): RelativeTime => {
  const range = selectUnit(millis);
  const value = Math.floor(millis / getDurationInMillis(range));
  const nextTick = Math.abs(millis % getDurationInMillis(range));
  return { nextTick, range, value };
};

const toggle = (b: boolean): boolean => !b;

export const useRelativeUnit = (timestamp: number) => {
  const [forcedUpdate, tick] = useReducer(toggle, true);
  const relativeTime = useMemo(
    () => countRelativeTime(timestamp - Date.now()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forcedUpdate, timestamp]
  );
  useEffect(() => {
    if (relativeTime.nextTick > HOUR) return;
    const timerId = window.setTimeout(tick, relativeTime.nextTick);
    return () => window.clearTimeout(timerId);
  }, [relativeTime]);

  return relativeTime;
};
