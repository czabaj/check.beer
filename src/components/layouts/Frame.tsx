import { css, cx } from "@linaria/core";
import type { ComponentChildren } from "preact";

const CSS_PROP_ASPECT_RATIO = `--frame-aspect-ratio`;

const styleBase = css`
  padding-bottom: calc(var(${CSS_PROP_ASPECT_RATIO}) * 100%);
  position: relative;
  & > * {
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
  }
  & > img,
  & > video {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export type Props = {
  as?: keyof JSX.IntrinsicElements;
  /**
   * The element's aspect ratio
   */
  aspectRatio?: [number, number];
  children: ComponentChildren;
  className?: string;
};

export default function Frame({
  as: Component = `div`,
  aspectRatio: [denominator, numerator] = [16, 9],
  children,
  className,
}: Props) {
  return (
    <Component
      className={cx(styleBase, className)}
      style={{
        [CSS_PROP_ASPECT_RATIO]: numerator / denominator,
      }}
    >
      {children}
    </Component>
  );
}
