import { css, cx } from "@linaria/core";
import type { ComponentChildren, VNode } from "preact";

import { toModularScale } from "../../utils/style";

const CSS_PROP_CONTENT_MIN = `--sidebar-content-min`;
const CSS_PROP_SIDE_WIDTH = `--sidebar-side-width`;
const CSS_PROP_GAP = `--sidebar-gap`;

const styleBase = css`
  display: flex;
  flex-wrap: wrap;
  gap: var(${CSS_PROP_GAP});
  & > :first-child {
    flex-basis: var(${CSS_PROP_SIDE_WIDTH});
    flex-grow: 1;
  }
  & > :last-child {
    flex-basis: 0;
    flex-grow: 999;
    min-width: ${CSS_PROP_CONTENT_MIN};
  }
`;

const styleSidebarOnRight = css`
  flex-direction: row-reverse;
`;

const styleNoStretch = css`
  align-items: flex-start;
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children:
    | ComponentChildren
    | ((props: { className: string; style: object }) => VNode);
  className?: string;
  /**
   * A CSS percentage value. The minimum width of the content element in the horizontal configuration
   */
  contentMin?: number;
  /**
   * A CSS margin value representing the space between the two elements
   */
  gap?: number | string;
  /**
   * Make the adjacent elements adopt their natural height
   */
  noStretch?: boolean;
  /**
   * By default the sidebar is rendered on the left, this reverses the layout and renders sidebar on the right
   */
  sidebarOnRight?: boolean;
  /**
   * Represents the width of the sidebar when adjacent. If not set defaults to the sidebar's content width
   */
  sideWidth?: string;
};

export default function Sidebar({
  as: Component = `div`,
  children,
  className,
  contentMin = 50,
  gap = 1,
  noStretch,
  sidebarOnRight,
  sideWidth,
}: Props) {
  return (
    <Component
      className={cx(
        styleBase,
        sidebarOnRight && styleSidebarOnRight,
        noStretch && styleNoStretch,
        className
      )}
      style={{
        [CSS_PROP_CONTENT_MIN]: `${contentMin}%`,
        [CSS_PROP_GAP]: toModularScale(gap),
        [CSS_PROP_SIDE_WIDTH]: sideWidth,
      }}
    >
      {children}
    </Component>
  );
}
