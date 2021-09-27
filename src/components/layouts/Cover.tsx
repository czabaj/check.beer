import { css, cx } from "@linaria/core";
import type { VNode } from "preact";

import { toModularScale } from "../../utils/style";

const CSS_PROP_GAP = `--cover-gap`;
const CSS_PROP_MIN_HEIGHT = `--cover-min-height`;

const styleBase = css`
  display: flex;
  flex-direction: column;
  min-height: var(${CSS_PROP_MIN_HEIGHT});
  padding: var(${CSS_PROP_GAP});
  & > * {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

const styleHasFooter = css`
  & > :last-child {
    margin-bottom: 0;
    margin-top: var(${CSS_PROP_GAP});
  }
`;

const styleHasHeader = css`
  & > :first-child {
    margin-bottom: var(${CSS_PROP_GAP});
    margin-top: 0;
  }
`;

const styleNoPad = css`
  padding: 0;
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: VNode<any>;
  className?: string;
  /**
   * The optional element to be rendered at the bottom edge
   */
  footer?: VNode<any>;
  /**
   * The minimum space between and around all of the child elements
   */
  gap?: number | string;
  /**
   * The optional element to be rendered at the top edge
   */
  header?: VNode<any>;
  /**
   * The minimum height for the Cover
   */
  minHeight?: string;
  /**
   * Whether the spacing is also applied as padding to the container element
   */
  noPad?: boolean;
};

export default function Cover({
  as: Component = `div`,
  children,
  className,
  footer,
  gap,
  header,
  minHeight = `100vh`,
  noPad,
}: Props) {
  return (
    <Component
      className={cx(
        styleBase,
        footer && styleHasFooter,
        header && styleHasHeader,
        noPad && styleNoPad,
        className
      )}
      style={{
        [CSS_PROP_GAP]: toModularScale(gap),
        [CSS_PROP_MIN_HEIGHT]: minHeight,
      }}
    >
      {header}
      {children}
      {footer}
    </Component>
  );
}
