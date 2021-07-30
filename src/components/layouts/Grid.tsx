import { css, cx } from "@linaria/core";
import type { ComponentChildren, VNode } from "preact";

import { toModularScale } from "../../utils/style";

const CSS_PROP_GAP = `--grid-gap`;
const CSS_PROPS_MIN = `--grid-min`;

const styleBase = css`
  display: grid;
  grid-gap: var(${CSS_PROP_GAP});

  @supports (width: min(var(${CSS_PROPS_MIN}), 100%)) {
    .grid {
      grid-template-columns: repeat(
        auto-fit,
        minmax(min(var(${CSS_PROPS_MIN}), 100%), 1fr)
      );
    }
  }
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children:
    | ComponentChildren
    | ((props: { className: string; style: object }) => VNode);
  className?: string;
  /**
   * The space between grid cells
   */
  gap: number | string;
  /**
   * 	A CSS length value representing x in minmax(min(x, 100%), 1fr)
   */
  min: string;
};

export default function Grid({
  as: Component = `div`,
  children,
  className,
  gap,
  min,
}: Props) {
  const componentProps = {
    className: cx(styleBase, className),
    style: {
      [CSS_PROP_GAP]: toModularScale(gap),
      [CSS_PROPS_MIN]: min,
    },
  };
  return typeof children === `function` ? (
    children(componentProps)
  ) : (
    <Component {...componentProps}>{children}</Component>
  );
}
