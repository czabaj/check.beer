import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "./utils";

const CSS_PROP_BORDER_WIDTH = `--border-width`;
const CSS_PROP_COLOR_DARK = `--color-dark`;
const CSS_PROP_COLOR_LIGHT = `--color-light`;
const CSS_PROP_PADDING = `--color-padding`;

const styleBase = css`
  background-color: var(${CSS_PROP_COLOR_LIGHT});
  border: var(${CSS_PROP_BORDER_WIDTH}) solid;
  color: var(${CSS_PROP_COLOR_DARK});
  display: block;
  padding: var(${CSS_PROP_PADDING});
  & * {
    color: inherit;
  }
  /* ↓ Always apply the transparent outline for high contrast mode  */
  outline: var(${CSS_PROP_BORDER_WIDTH}) transparent;
  outline-offset: calc(-1 * var(${CSS_PROP_BORDER_WIDTH}));
`;

const styleInverted = css`
  /* ↓ Dark becomes light, and light becomes dark */
  color: var(${CSS_PROP_COLOR_LIGHT});
  background-color: var(${CSS_PROP_COLOR_DARK});
`;

export type Props = {
  children: ComponentChildren;
  borderWidth?: string;
  colorDark?: string;
  colorLight?: string;
  inverted?: boolean;
  padding?: number | string;
};

export default function Box({
  children,
  borderWidth = `var(--border-thin)`,
  colorDark = `var(--color-background)`,
  colorLight = `var(--color-foreground)`,
  inverted = false,
  padding = 1,
}: Props) {
  return (
    <div
      className={cx(styleBase, inverted && styleInverted)}
      style={{
        [CSS_PROP_BORDER_WIDTH]: borderWidth,
        [CSS_PROP_COLOR_DARK]: colorLight,
        [CSS_PROP_COLOR_LIGHT]: colorDark,
        [CSS_PROP_PADDING]: toModularScale(padding),
      }}
    >
      {children}
    </div>
  );
}
