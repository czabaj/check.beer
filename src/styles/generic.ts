import { css } from "@linaria/core";

export const globals = css`
  :global() {
    *,
    *::before,
    *::after {
      border: 0px solid var(--color-dark);
      box-sizing: border-box;
    }
    
    /**
     * Measure
     * -------
     */
    :root {
      --measure: 70ch;
    }

    * {
      max-width: var(--measure);
    }

    html,
    body,
    div,
    header,
    nav,
    main,
    footer {
      max-width: none;
    }
  }
`;
