import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "./utils";

const styleBase = css`
  background-color: var(--color-light);
  border: var(--border-width) solid;
  color: var(--color-dark);
  display: block;
  padding: var(--padding);
  & * {
    color: inherit;
  }
`;

const styleInverted = css`
  /* ↓ Dark becomes light, and light becomes dark */
  color: var(--color-light);
  background-color: var(--color-dark);
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
        "--border-width": borderWidth,
        "--color-dark": colorLight,
        "--color-light": colorDark,
        "--padding": toModularScale(padding),
      }}
    >
      {children}
    </div>
  );
}
