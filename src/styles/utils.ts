import { css } from "@linaria/core";

import { visuallyHidden } from "./tools";

export const globals = css`
  :global() {
    .align-self\:center {
      align-self: center;
    }
    .circular {
      border-radius: 50%;
    }
    .max-width\:measure {
      max-width: var(--measure);
    }
    .max-width\:measure\/2 {
      max-width: calc(var(--measure) / 2);
    }
    .text-center {
      text-align: center !important;
    }
    .visually-hidden:not(:active):not(:focus) {
      ${visuallyHidden}
    }
  }
`;
