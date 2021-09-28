import { css, cx } from "@linaria/core";
import { darken, lighten } from "polished";
import type { ComponentChildren, JSX, Ref } from "preact";
import { forwardRef } from "preact/compat";

import { COLOR_PRIMARY } from "../styles/settings";
import { resetButton } from "../styles/tools";

const styleBase = css`
  ${resetButton}
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 12px 20px;
`;

const styleColorPrimary = css`
  background-color: ${COLOR_PRIMARY};
  color: white;
  :focus {
    box-shadow: 0px 0px 6px rgba(30, 130, 240, 0.4);
    outline: none;
  }
  :hover {
    background-color: ${darken(0.1, COLOR_PRIMARY)};
  }
  :disabled,
  [aria-disabled="true"] {
    background-color: ${lighten(0.2, COLOR_PRIMARY)};
  }
`;

const styleShapeRound = css`
  --height: calc(2.5ch + var(--s1));
  border-radius: calc(var(--height) * 0.5);
  bottom: var(--s-1);
  display: inline-block;
  font-size: 200%;
  height: var(--height);
  line-height: var(--height);
  min-width: var(--height);
  padding: 0 var(--s-1);
  text-align: center;
  position: fixed;
  font-weight: 700;
  right: var(--s-1);
`;

export type Props = {
  children: ComponentChildren;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (event: MouseEvent) => void;
  primary?: boolean;
  round?: boolean;
  style?: JSX.CSSProperties;
  type?: string;
};

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement | null,
  Props
>(
  (
    {
      children,
      className,
      disabled,
      primary,
      href,
      round,
      type = `button`,
      ...other
    },
    ref
  ) => {
    const isAnchor = href !== undefined;
    const classes = cx(
      styleBase,
      primary && styleColorPrimary,
      round && styleShapeRound,
      className
    );

    return isAnchor ? (
      <a
        {...other}
        {...(disabled
          ? {
              href: ``,
              "aria-disabled": `true`,
            }
          : {
              href,
            })}
        className={classes}
        ref={ref as Ref<HTMLAnchorElement> | undefined}
      >
        {children}
      </a>
    ) : (
      <button
        {...other}
        className={classes}
        disabled={disabled}
        ref={ref as Ref<HTMLButtonElement> | undefined}
        type={type}
      >
        {children}
      </button>
    );
  }
);
