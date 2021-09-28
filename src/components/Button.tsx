import { css, cx } from "@linaria/core";
import { darken } from "polished";
import { forwardRef } from "preact/compat";

import { COLOR_PRIMARY } from "../styles/settings";
import { Props as TouchableProps, Touchable } from "./Touchable";

const styleBase = css`
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 12px 20px;
  :disabled,
  [aria-disabled="true"] {
    opacity: 0.7;
  }
`;

const styleColorPrimary = css`
  background-color: ${COLOR_PRIMARY};
  color: white;
  :hover {
    background-color: ${darken(0.1, COLOR_PRIMARY)};
  }
`;

const styleShapeRound = css`
  --height: calc(2.5ch + var(--s1));
  border-radius: calc(var(--height) * 0.5);
  bottom: var(--s-1);
  display: inline-block;
  font-size: 200%;
  height: var(--height);
  line-height: var(--height);
  min-width: var(--height);
  padding: 0 var(--s-1);
  text-align: center;
  position: fixed;
  font-weight: 700;
  right: var(--s-1);
`;

export type Props = TouchableProps & {
  primary?: boolean;
  round?: boolean;
};

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement | null,
  Props
>(({ className, primary, round, ...other }, ref) => {
  return (
    <Touchable
      {...other}
      className={cx(
        styleBase,
        primary && styleColorPrimary,
        round && styleShapeRound,
        className
      )}
      ref={ref}
    />
  );
});
