import { css, cx } from "@linaria/core";
import type { ComponentChild, FunctionComponent, VNode } from "preact";

const styleBase = css`
  height: 0.75em;
  height: 1cap;
  width: 0.75em;
  width: 1cap;
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  children:
    | ComponentChild
    | ((props: {
        "aria-label"?: string;
        className: string;
        role?: string;
      }) => VNode);
  className?: string;
  /**
   * Turns the element into an image in assistive technologies and adds an aria-label of the value
   */
  label?: string;
};

export const Icon: FunctionComponent<Props> = ({
  as: Component = `span`,
  children,
  className,
  label,
}) => {
  const componentProps = {
    className: cx(styleBase, className),
    ...(label && {
      "aria-label": label,
      role: `img`,
    }),
  };
  return typeof children === `function` ? (
    children(componentProps)
  ) : (
    <Component {...componentProps}>{children}</Component>
  );
};
