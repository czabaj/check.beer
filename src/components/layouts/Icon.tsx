import type { CSSProperties } from "react";

// const styleVerticalAlign = css`
//   vertical-align: -0.125em;
// `;

export type Props = {
  className?: string;
  icon: any;
  label?: string;
  height?: string;
  noAlign?: boolean;
  width?: string;
  style?: CSSProperties;
};

/**
 * Turns the element into an image in assistive technologies and adds an aria-label of the value
 */
export const Icon = ({
  height = `0.75em`,
  icon: IconComponent,
  style,
  width = height,
  ...other
}: Props) => {
  return (
    <IconComponent
      {...other}
      fill="currentColor"
      style={style}
      height={height}
      width={width}
    />
  );
};
