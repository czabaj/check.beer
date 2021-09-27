import { css, cx } from "@linaria/core";
import { lighten } from "polished";
import type { ComponentChildren, FunctionComponent, JSX } from "preact";

const styleBase = css`
  background-color: #98d635;
  &:hover {
    background-color: ${lighten(0.2, "#98d635")};
  }
`;

const styleAnchorReset = css`
  text-decoration: none;
  color: inherit;
`;

type Props = {
  children: ComponentChildren;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (event: MouseEvent) => any;
  style?: JSX.CSSProperties;
  type?: `button` | `reset` | `submit`;
};

export const Button: FunctionComponent<Props> = ({
  className,
  href,
  type = `button`,
  ...other
}) => {
  return href ? (
    <a
      {...other}
      className={cx(styleBase, styleAnchorReset, className)}
      href={href}
    />
  ) : (
    <button {...other} className={cx(styleBase, className)} type={type} />
  );
};
