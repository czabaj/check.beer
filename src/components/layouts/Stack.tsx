import type { ComponentChildren, FunctionComponent, VNode } from "preact";

import { toModularScale } from "../../utils/style";

const CSS_PROP_GAP = `--stack-gap`;
const DATA_ATTR_SPLIT_AFTER = `data-split-after`;

// const styleBase = css`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   /* ↓ The vertical spacing is established via "Lobotomic Owl" selector */
//   & > * + * {
//     margin-top: var(${CSS_PROP_GAP});
//   }
// `;
//
// const styleRecursive = css`
//   & * + * {
//     margin-top: var(${CSS_PROP_GAP});
//   }
// `;

// const SPLIT_AFTER_MAX = 5;
// const styleSplitAfter = css`
//   ${Array.from(Array(SPLIT_AFTER_MAX))
//     .map((_value, idx) => {
//       const nthChild = idx + 1; // the CSS counts from 1, not 0
//       return `
//   &[${DATA_ATTR_SPLIT_AFTER}="${nthChild}"] > :nth-child(${nthChild}) {
//       margin-bottom: auto;
//     }
// `;
//     })
//     .join(``)}
// `;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children:
    | ComponentChildren
    | ((props: {
        className: string;
        [DATA_ATTR_SPLIT_AFTER]?: number;
        style: object;
      }) => VNode);
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

export const Stack: FunctionComponent<Props> = ({
  as: Component = `div`,
  children,
  className,
  recursive,
  gap = 1,
  splitAfter,
}) => {
  const hasSplitAfter = splitAfter && splitAfter > 0;
  const componentProps = {
    // className: cx(
    //   styleBase,
    //   recursive && styleRecursive,
    //   hasSplitAfter && styleSplitAfter,
    //   className
    // ),
    ...(hasSplitAfter && { [DATA_ATTR_SPLIT_AFTER]: splitAfter }),
    style: {
      [CSS_PROP_GAP]: toModularScale(gap),
    },
  };
  return typeof children === `function` ? (
    children(componentProps)
  ) : (
    <Component {...componentProps}>{children}</Component>
  );
}
