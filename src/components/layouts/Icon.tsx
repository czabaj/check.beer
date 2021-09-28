import { css, cx } from "@linaria/core";
import type { FunctionComponent, JSX } from "preact";

const styleVerticalAlign = css`
  vertical-align: -0.125em;
`;

export type Props = {
  className?: string;
  icon: FunctionComponent<JSX.SVGAttributes<SVGSVGElement>>;
  label?: string;
  height?: string;
  noAlign?: boolean;
  width?: string;
  style?: JSX.CSSProperties;
};

/**
 * Turns the element into an image in assistive technologies and adds an aria-label of the value
 */
export const Icon: FunctionComponent<Props> = ({
  className,
  height = `0.75em`,
  icon: IconComponent,
  noAlign,
  style,
  width = height,
  ...other
}) => {
  return (
    <IconComponent
      {...other}
      fill="currentColor"
      className={cx(!noAlign && styleVerticalAlign, className)}
      style={style}
      height={height}
      width={width}
    />
  );
};
