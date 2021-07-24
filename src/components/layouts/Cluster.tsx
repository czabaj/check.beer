import { css } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "./utils";

const CSS_PROP_ALIGN = `--align`;
const CSS_PROP_JUSTIFY = `--justify`;
const CSS_PROP_SPACE = `--space`;

const styleBase = css`
  align-items: var(${CSS_PROP_ALIGN});
  display: flex;
  flex-wrap: wrap;
  gap: var(${CSS_PROP_SPACE}, 1rem);
  justify-content: var(${CSS_PROP_JUSTIFY});
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  /**
   * A CSS align-items value
   */
  align?: `baseline` | `center` | `flex-end` | `flex-start` | `stretch`;
  children: ComponentChildren;
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
  /**
   * A CSS gap value. The minimum space between the clustered child elements.
   */
  space?: number | string;
};

export default function Cluster({
  align = `flex-start`,
  as: Component = `div`,
  children,
  justify = `flex-start`,
  space = 1,
}: Props) {
  return (
    <Component
      className={styleBase}
      style={{
        [CSS_PROP_ALIGN]: align,
        [CSS_PROP_JUSTIFY]: justify,
        [CSS_PROP_SPACE]: toModularScale(space),
      }}
    >
      {children}
    </Component>
  );
}
