import { memo } from "react";
import { Trans } from "react-i18next";

import { toLocalDateString } from "~/utils/dateTime";

export const Established = memo(({ timestamp }: { timestamp: number }) => {
  return (
    <Trans
      defaults="Již od <time>{{established, datetime}}</time>"
      values={{
        established: new Date(timestamp),
        formatParams: {
          established: { year: "numeric", month: "numeric", day: "numeric" },
        },
      }}
      components={{
        time: <time dateTime={toLocalDateString(timestamp)} />,
      }}
    />
  );
});
