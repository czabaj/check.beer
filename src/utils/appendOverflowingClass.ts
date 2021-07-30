export const CSS_CLASS_OVERFLOWING = `overflowing`;

export const isOverflowing = (node: Element) =>
  node.scrollWidth > node.clientWidth;

const toggleOverflowClass = (element: Element): void => {
  element.classList.toggle(CSS_CLASS_OVERFLOWING, isOverflowing(element));
};

const resizeObserver =
  `ResizeObserver` in window
    ? new ResizeObserver((entries) => {
        toggleOverflowClass(entries[0].target);
      })
    : undefined;

/**
 * Listens for changes on Element that might cause its content to overflow
 * horizontaly and appends a CSS_CLASS_OVERFLOWING class when it is overflowing.
 * Returns a cleanup function which must be called when the Element is going to
 * be unmounted.
 * The value of `startObserving` Might be a `undefined` in old browsers.
 */
export const startObserving =
  resizeObserver || `MutationObserver` in window
    ? (element: Element) => {
        const mutationObserver =
          `MutationObserver` in window
            ? new MutationObserver((entries) => {
                toggleOverflowClass(entries[0].target as Element);
              })
            : undefined;
        mutationObserver?.observe(element, { childList: true });
        resizeObserver?.observe(element);
        return () => {
          mutationObserver?.disconnect();
          resizeObserver?.unobserve(element);
        };
      }
    : undefined;
