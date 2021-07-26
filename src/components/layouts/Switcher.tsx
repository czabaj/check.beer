import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "./utils";

const CSS_PROP_GAP = `--switcher-gap`;
const CSS_PROP_THRESHOLD = `--switcher-threshold`;
const DATA_ATTR_LIMIT = `data-limit`;

const styleBase = css`
  display: flex;
  flex-wrap: wrap;
  gap: var(${CSS_PROP_GAP});
  & > * {
    flex-grow: 1;
    flex-basis: calc((var(${CSS_PROP_THRESHOLD}) - 100%) * 999);
  }
`;

const LIMIT_MAX = 5;
const styleLimit = css`
  ${Array.from(Array(LIMIT_MAX))
    .map((_value, idx) => {
      const nthChild = idx + 1; // the CSS counts from 1, not 0
      const nextChild = nthChild + 1; // apply the rule from the next child
      return `
  &[${DATA_ATTR_LIMIT}="${nthChild}"] > :nth-last-child(n + ${nextChild}),
  &[${DATA_ATTR_LIMIT}="${nthChild}"] > :nth-last-child(n + ${nextChild}) ~ * {
      flex-basis: 100%;
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
   * A CSS margin value
   */
  gap?: number | string;
  /**
   * A number representing the maximum number of items permitted for a horizontal layout
   */
  limit?: number;
  /**
   * A CSS width value (representing the 'container breakpoint')
   */
  threshold?: string;
};

export default function Switcher({
  as: Component = `div`,
  children,
  className,
  gap = 1,
  limit = 4,
  threshold = `var(--measure)`,
}: Props) {
  const hasLimit = limit && limit > 0;
  return (
    <Component
      className={cx(styleBase, hasLimit && styleLimit, className)}
      style={{
        [CSS_PROP_GAP]: toModularScale(gap),
        [CSS_PROP_THRESHOLD]: threshold,
      }}
      {...(hasLimit && { [DATA_ATTR_LIMIT]: limit })}
    >
      {children}
    </Component>
  );
}
