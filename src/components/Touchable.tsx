import { css, cx } from "@linaria/core";
import type { ComponentChildren, JSX, Ref } from "preact";
import { forwardRef } from "preact/compat";

const styleAnchorReset = css`
  color: inherit;
  text-decoration: inherit;
`;

const styleButtonReset = css`
  border: none;
  display: inline-block;
  padding: 0;
  text-decoration: none;
  width: fit-content;
`;

export type Props = {
  children: ComponentChildren;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (event: MouseEvent) => void;
  style?: JSX.CSSProperties;
  type?: string;
};

export const Touchable = forwardRef<
  HTMLAnchorElement | HTMLButtonElement | null,
  Props
>(({ children, className, disabled, href, type = `button`, ...other }, ref) => {
  const isAnchor = href !== undefined;
  return isAnchor ? (
    <a
      {...other}
      {...(disabled
        ? {
            href: ``,
            "aria-disabled": `true`,
          }
        : {
            href,
          })}
      className={cx(styleAnchorReset, className)}
      ref={ref as Ref<HTMLAnchorElement> | undefined}
    >
      {children}
    </a>
  ) : (
    <button
      {...other}
      className={cx(styleButtonReset, className)}
      disabled={disabled}
      ref={ref as Ref<HTMLButtonElement> | undefined}
      type={type}
    >
      {children}
    </button>
  );
});
