import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "./utils";

const CSS_PROP_ALIGN = `--cluster-align`;
const CSS_PROP_JUSTIFY = `--cluster-justify`;
const CSS_PROP_GAP = `--cluster-gap`;

const styleBase = css`
  align-items: var(${CSS_PROP_ALIGN});
  display: flex;
  flex-wrap: wrap;
  gap: var(${CSS_PROP_GAP}, 1rem);
  justify-content: var(${CSS_PROP_JUSTIFY});
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  /**
   * A CSS align-items value
   */
  align?: `baseline` | `center` | `flex-end` | `flex-start` | `stretch`;
  children: ComponentChildren;
  className?: string;
  /**
   * A CSS gap value. The minimum space between the clustered child elements.
   */
  gap?: number | string;
  /**
   * A CSS justify-content value
   */
  justify?:
    | `center`
    | `flex-end`
    | `flex-start`
    | `space-arount`
    | `space-between`
    | `space-evenly`;
};

export default function Cluster({
  align = `flex-start`,
  as: Component = `div`,
  children,
  className,
  gap = 1,
  justify = `flex-start`,
}: Props) {
  return (
    <Component
      className={cx(styleBase, className)}
      style={{
        [CSS_PROP_ALIGN]: align,
        [CSS_PROP_GAP]: toModularScale(gap),
        [CSS_PROP_JUSTIFY]: justify,
      }}
    >
      {children}
    </Component>
  );
}
