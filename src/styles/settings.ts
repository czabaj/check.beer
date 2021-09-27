import { css } from "@linaria/core";

export const COLOR_PRIMARY = `#98d635`


export const globals = css`
  :global() {
    :root {
      --border-thin: 2px;
      --color-dark: #444;
      --color-light: #fafafa;
      --color-primary: #98d635;
      --ratio: 1.5;
      --s-1: calc(var(--s0) / var(--ratio));
      --s-2: calc(var(--s-1) / var(--ratio));
      --s-3: calc(var(--s-2) / var(--ratio));
      --s-4: calc(var(--s-3) / var(--ratio));
      --s-5: calc(var(--s-4) / var(--ratio));
      --s0: 1rem;
      --s1: calc(var(--s0) * var(--ratio));
      --s2: calc(var(--s1) * var(--ratio));
      --s3: calc(var(--s2) * var(--ratio));
      --s4: calc(var(--s3) * var(--ratio));
      --s5: calc(var(--s4) * var(--ratio));
    }
  }
`;
