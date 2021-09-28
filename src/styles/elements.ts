import { css } from "@linaria/core";

export const globals = css`
  :global() {
    :root {
      font-family: "Helvetica Neue", arial, sans-serif;
      font-size: large;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    a:link,
    a:visited,
    button:not(:disabled) {
      cursor: pointer;
    }

    a:link:focus,
    button:focus {
      box-shadow: 0px 0px 6px rgba(30, 130, 240, 0.4);
      outline: none;
    }

    body,
    html {
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
      background: var(--color-light);
      color: var(--color-dark);
    }

    img {
      max-width: 100%;
    }
  }
`;
