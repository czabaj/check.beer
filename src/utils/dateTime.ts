import {Temporal} from "temporal-polyfill";

export const toLocalDateString = (timestamp: number): string =>
    Temporal.Instant.fromEpochMilliseconds(timestamp)
        .toZonedDateTimeISO(Temporal.Now.timeZone())
        .toPlainDate()
        .toString();
