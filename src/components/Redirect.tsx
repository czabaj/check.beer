import type { FunctionComponent } from "preact";
import { lazy } from "preact/compat";
import { useLayoutEffect } from "preact/hooks";
import { route } from "preact-router";

export type Props = {
  to: string;
};

const SuspendUndefinetely = lazy(() => new Promise(() => {}) as Promise<any>);

/**
 * Handles redirect. Relies on Suspense for displaying loader while the
 * redirection takes place.
 */
export const Redirect: FunctionComponent<Props> = ({ to }) => {
  useLayoutEffect(() => {
    route(to, true);
  });
  return <SuspendUndefinetely />;
};
