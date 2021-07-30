import { css, cx } from "@linaria/core";
import type { ComponentChildren, VNode } from "preact";

import { toModularScale } from "../../utils/style";

const CSS_PROP_MARGIN = `--imposter-margin`;
const CSS_PROP_POSITION = `--imposter-position`;

const styleBase = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const styleContain = css`
  overflow: auto;
  max-width: calc(100% - (var(${CSS_PROP_MARGIN}) * 2));
  max-height: calc(100% - (var(${CSS_PROP_MARGIN}) * 2));
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  /**
   * Whether the element is allowed to break out of the container over which it
   * is positioned
   */
  breakout?: boolean;
  children:
    | ComponentChildren
    | ((props: { className: string; style: object }) => VNode);
  className?: string;
  fixed?: boolean;
  /**
   * The minimum space between the element and the inside edges of the
   * positioning container over which it is placed (where breakout is not applied)
   */
  margin?: number | string;
};

export default function Imposter({
  as: Component = `div`,
  breakout,
  children,
  className,
  fixed,
  margin,
}: Props) {
  const componentProps = {
    className: cx(styleBase, !breakout && styleContain, className),
    style: {
      ...(!breakout && { [CSS_PROP_MARGIN]: toModularScale(margin) }),
      [CSS_PROP_POSITION]: fixed ? `fixed` : `absolute`,
    },
  };
  return typeof children === `function` ? (
    children(componentProps)
  ) : (
    <Component {...componentProps}>{children}</Component>
  );
}
