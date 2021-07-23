import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "./utils";

const CSS_PROP_SPACE = `--space`;

const styleBase = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* ↓ The vertical spacing is established via "Lobotomic Owl" selector */
  & > * + * {
    margin-top: var(${CSS_PROP_SPACE});
  }
`;

const styleRecursive = css`
  & * + * {
    margin-top: var(${CSS_PROP_SPACE});
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
  children: ComponentChildren;
  /**
   * The vertical spacing affects by default only direct children, this applies vertical spacing to _all_ children
   */
  recursive?: boolean;
  /**
   * The space after passed nth-child will consume all available free space
   */
  splitAfter?: number;
  /**
   * The vertical space to be applied between children
   */
  space?: string | number;
};

export default function Stack({
  children,
  recursive = false,
  space = 1,
  splitAfter,
}: Props) {
  return (
    <div
      className={cx(
        styleBase,
        recursive && styleRecursive,
        splitAfter && styleSplitAfter
      )}
      style={{
        [CSS_PROP_SPACE]: toModularScale(space),
      }}
      {...(splitAfter !== undefined && { "data-split-after": splitAfter })}
    >
      {children}
    </div>
  );
}
