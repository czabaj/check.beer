import { FunctionComponent } from "preact";
import { lazy } from "preact/compat";
import { useLayoutEffect } from "preact/hooks";
import { route } from "preact-router";

export type Props = {
  to: string;
};

const SuspenseUndefinetely = lazy(() => new Promise(() => {}) as Promise<any>);

export const Redirect: FunctionComponent<Props> = ({ to }) => {
  useLayoutEffect(() => {
    route(to, true);
  });
  return <SuspenseUndefinetely />;
};
