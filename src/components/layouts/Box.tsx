import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "./utils";

const CSS_PROP_BORDER_WIDTH = `--box-border-width`;
const CSS_PROP_COLOR_DARK = `--box-color-dark`;
const CSS_PROP_COLOR_LIGHT = `--box-color-light`;
const CSS_PROP_PADDING = `--box-color-padding`;

const styleBase = css`
  background-color: var(${CSS_PROP_COLOR_LIGHT});
  border: var(${CSS_PROP_BORDER_WIDTH}) solid;
  color: var(${CSS_PROP_COLOR_DARK});
  display: block;
  padding: var(${CSS_PROP_PADDING});
  /* ↓ Force colors to inherit from the parent and honor inversion (below)  */
  & * {
    color: inherit;
  }
  /* ↓ Always apply the transparent outline for high contrast mode  */
  outline: var(${CSS_PROP_BORDER_WIDTH}) transparent;
  outline-offset: calc(-1 * var(${CSS_PROP_BORDER_WIDTH}));
`;

const styleInverted = css`
  /* ↓ Dark becomes light, and light becomes dark */
  background-color: var(${CSS_PROP_COLOR_DARK});
  color: var(${CSS_PROP_COLOR_LIGHT});
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: ComponentChildren;
  className?: string;
  /**
   * A CSS border-width value
   */
  borderWidth?: string;
  colorDark?: string;
  colorLight?: string;
  /**
   * Whether to apply an inverted theme
   */
  inverted?: boolean;
  /**
   * A CSS padding value
   */
  padding?: number | string;
};

export default function Box({
  as: Component = `div`,
  children,
  className,
  borderWidth = `var(--border-thin)`,
  colorDark = `var(--color-background)`,
  colorLight = `var(--color-foreground)`,
  inverted,
  padding = 1,
}: Props) {
  return (
    <Component
      className={cx(styleBase, inverted && styleInverted, className)}
      style={{
        [CSS_PROP_BORDER_WIDTH]: borderWidth,
        [CSS_PROP_COLOR_DARK]: colorLight,
        [CSS_PROP_COLOR_LIGHT]: colorDark,
        [CSS_PROP_PADDING]: toModularScale(padding),
      }}
    >
      {children}
    </Component>
  );
}
