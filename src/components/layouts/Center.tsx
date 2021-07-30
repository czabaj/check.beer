import { css, cx } from "@linaria/core";
import type { ComponentChildren, VNode } from "preact";

import { toModularScale } from "../../utils/style";

const CSS_PROP_GUTTERS = `--center-gutters`;
const CSS_PROP_MAX = `--center-max`;

const styleBase = css`
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: var(${CSS_PROP_MAX});
  padding-left: var(${CSS_PROP_GUTTERS});
  padding-right: var(${CSS_PROP_GUTTERS});
`;

const styleAndText = css`
  text-align: center;
`;

const styleIntrinsic = css`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export type Props = {
  /**
   * Center align the text too (text-align: center)
   */
  andText?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children:
    | ComponentChildren
    | ((props: { className: string; style: object }) => VNode);
  className?: string;
  /**
   * The minimum space on either side of the content
   */
  gutters?: number | string;
  /**
   * Center child elements based on their content width
   */
  intrinsic?: boolean;
  /**
   * A CSS max-width value
   */
  max?: string;
};

export default function Center({
  andText,
  as: Component = `div`,
  className,
  children,
  gutters,
  intrinsic,
  max = `var(--measure)`,
}: Props) {
  const componentProps = {
    className: cx(
      styleBase,
      andText && styleAndText,
      intrinsic && styleIntrinsic,
      className
    ),
    style: {
      [CSS_PROP_GUTTERS]: toModularScale(gutters),
      [CSS_PROP_MAX]: max,
    },
  };
  return typeof children === `function` ? (
    children(componentProps)
  ) : (
    <Component {...componentProps}>{children}</Component>
  );
}
