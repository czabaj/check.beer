import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "./utils";

const CSS_PROP_GAP = `--stack-gap`;

const styleBase = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* ↓ The vertical spacing is established via "Lobotomic Owl" selector */
  & > * + * {
    margin-top: var(${CSS_PROP_GAP});
  }
`;

const styleRecursive = css`
  & * + * {
    margin-top: var(${CSS_PROP_GAP});
  }
`;

const SPLIT_AFTER_MAX = 5;
const styleSplitAfter = css`
  ${Array.from(Array(SPLIT_AFTER_MAX))
    .map((_value, idx) => {
      const nthChild = idx + 1; // the CSS counts from 1, not 0
      return `
  &[data-split-after=${nthChild}] > :nth-child(${nthChild}) {
      margin-bottom: auto;
    }
`;
    })
    .join(``)}
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: ComponentChildren;
  className?: string;
  /**
   * The vertical space to be applied between children
   */
  gap?: string | number;
  /**
   * The vertical spacing affects by default only direct children, this applies vertical spacing to _all_ children
   */
  recursive?: boolean;
  /**
   * The space after passed nth-child will consume all available free space
   */
  splitAfter?: number;
};

export default function Stack({
  as: Component = `div`,
  children,
  className,
  recursive,
  gap = 1,
  splitAfter,
}: Props) {
  const hasSplitAfter = splitAfter && splitAfter > 0;
  return (
    <Component
      className={cx(
        styleBase,
        recursive && styleRecursive,
        hasSplitAfter && styleSplitAfter,
        className
      )}
      style={{
        [CSS_PROP_GAP]: toModularScale(gap),
      }}
      {...(hasSplitAfter && { "data-split-after": splitAfter })}
    >
      {children}
    </Component>
  );
}
