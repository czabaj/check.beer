import { css, cx } from "@linaria/core";
import { darken, lighten } from "polished";
import type { ComponentChildren, FunctionComponent, JSX } from "preact";

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

export type Props = {
  className?: string;
  children: ComponentChildren;
  color?: `green`;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  primary?: boolean;
  style?: JSX.CSSProperties;
  to?: string;
  type?: string;
};

export const Button: FunctionComponent<Props> = ({
  children,
  className,
  color = `green`,
  disabled,
  primary,
  to,
  type = `button`,
  ...other
}) => {
  const isAnchor = Boolean(to);
  const classes = cx(styleBase, primary && styleColorPrimary, className);

  return isAnchor ? (
    <a
      {...other}
      {...(disabled
        ? {
            href: ``,
            "aria-disabled": `true`,
          }
        : {
            href: to,
          })}
      className={classes}
    >
      {children}
    </a>
  ) : (
    // eslint-disable-next-line react/button-has-type
    <button {...other} className={classes} disabled={disabled} type={type}>
      {children}
    </button>
  );
};
