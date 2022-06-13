import dialogPolyfill from "dialog-polyfill";
import { DialogHTMLAttributes, forwardRef } from "react";

export const Dialog = forwardRef<
  HTMLDialogElement,
  DialogHTMLAttributes<HTMLDialogElement>
>((props, ref: any) => {
  return (
    <dialog
      {...props}
      ref={(node) => {
        if (node) {
          dialogPolyfill.registerDialog(node);
        }
        if (ref) {
          ref?.(node) || (ref.current = node);
        }
      }}
    />
  );
});
