import type {
  ComponentChildren,
  FunctionComponent,
  RefCallback,
  VNode,
} from "preact";
import { useEffect, useRef } from "preact/hooks";

import {
  CSS_CLASS_OVERFLOWING,
  startObserving,
} from "../../utils/appendOverflowingClass";
import { toModularScale } from "../../utils/style";

const CSS_PROP_GAP = `--reel-gap`;
const CSS_PROP_HEIGHT = `--reel-height`;
const CSS_PROP_ITEM_WIDTH = `--reel-item-width`;

// const styleNoBar = css`
//   scrollbar-width: none;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
//
// const styleBase = css`
//   display: flex;
//   height: var(${CSS_PROP_HEIGHT});
//   overflow-x: auto;
//   overflow-y: hidden;
//   scrollbar-color: var(--color-light) var(--color-dark);
//   &::-webkit-scrollbar {
//     height: 1rem;
//   }
//   &::-webkit-scrollbar-track {
//     background-color: var(--color-dark);
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: var(--color-dark);
//     background-image: linear-gradient(
//       var(--color-dark) 0,
//       var(--color-dark) 0.25rem,
//       var(--color-light) 0.25rem,
//       var(--color-light) 0.75rem,
//       var(--color-dark) 0.75rem
//     );
//   }
//   & > * {
//     flex: 0 0 var(${CSS_PROP_ITEM_WIDTH});
//   }
//   & > img {
//     height: 100%;
//     flex-basis: auto;
//     width: auto;
//   }
//   & > * + * {
//     margin-left: ${CSS_PROP_GAP};
//   }
//   &.${CSS_CLASS_OVERFLOWING}:not(${styleNoBar}) {
//     padding-bottom: var(${CSS_PROP_GAP});
//   }
// `;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children:
    | ComponentChildren
    | ((props: {
        className: string;
        ref: RefCallback<Element>;
        style: object;
      }) => VNode);
  className?: string;
  /**
   * The space between Reel items (child elements)
   */
  gap?: number | string;
  /**
   * The height of the Reel itself
   */
  height?: string;
  /**
   * The width of each item (child element) in the Reel
   */
  itemWidth?: string;
  /**
   * Whether to display the scrollbar
   */
  noBar?: boolean;
};

export const Reel: FunctionComponent<Props> = ({
  as: Component = `div`,
  children,
  className,
  gap = 0,
  height = `auto`,
  itemWidth = `auto`,
  noBar,
}) => {
  const resizeObserverUnobserveRef = useRef<(() => void) | void>();
  useEffect(() => () => {
    resizeObserverUnobserveRef.current?.();
  });
  const componentProps = {
    // className: cx(styleBase, noBar && styleNoBar, className),
    ref: (node: Element | null) => {
      if (node) {
        resizeObserverUnobserveRef.current?.();
        resizeObserverUnobserveRef.current = startObserving?.(node);
      }
    },
    style: {
      [CSS_PROP_GAP]: toModularScale(gap),
      [CSS_PROP_HEIGHT]: height,
      [CSS_PROP_ITEM_WIDTH]: itemWidth,
    },
  };

  return typeof children === `function` ? (
    children(componentProps)
  ) : (
    <Component {...componentProps}>{children}</Component>
  );
};
