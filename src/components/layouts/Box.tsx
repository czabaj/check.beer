import { css, cx } from "@linaria/core";
import type { ComponentChildren, FunctionComponent, VNode } from "preact";

import { toModularScale } from "../../utils/style";

const CSS_PROP_BORDER_WIDTH = `--box-border-width`;
const CSS_PROP_PADDING = `--box-color-padding`;

const styleBase = css`
  background-color: var(--color-light);
  border: var(${CSS_PROP_BORDER_WIDTH}) solid;
  color: var(--color-dark);
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
  background-color: var(--color-dark);
  color: var(--color-light);
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children:
    | ComponentChildren
    | ((props: { className: string; style: object }) => VNode);
  className?: string;
  /**
   * A CSS border-width value
   */
  borderWidth?: string;
  /**
   * Whether to apply an inverted theme
   */
  inverted?: boolean;
  /**
   * A CSS padding value
   */
  padding?: number | string;
};

export const Box: FunctionComponent<Props> = ({
  as: Component = `div`,
  children,
  className,
  borderWidth = `var(--border-thin)`,
  inverted,
  padding = 1,
}) => {
  const componentProps = {
    className: cx(styleBase, inverted && styleInverted, className),
    style: {
      [CSS_PROP_BORDER_WIDTH]: borderWidth,
      [CSS_PROP_PADDING]: toModularScale(padding),
    },
  };
  return typeof children === `function` ? (
    children(componentProps)
  ) : (
    <Component {...componentProps}>{children}</Component>
  );
};
