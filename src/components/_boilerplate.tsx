import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

import { toModularScale } from "../utils/style";

const CSS_PROP_GUTTERS = `--gutters`;

const styleBase = css``;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: ComponentChildren;
  className?: string;
};

export default function Boilerplate({ as: Component = `div`, children, className }: Props) {
  return (
    <Component
      className={cx(styleBase, className)}
      style={{
        [CSS_PROP_GUTTERS]: toModularScale(gutters),
      }}
    >
      {children}
    </Component>
  );
}
