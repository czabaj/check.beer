import type { FunctionComponent } from "react";

import { withRedirectAuth } from "~/components/RedirectAuth";

import { DEFAULT_PRIVATE_ROUTE, LOGIN } from "./routes";

export const redirectAuthenticatedIntoApp = (
  Component: FunctionComponent<any>
) =>
  withRedirectAuth({ authenticated: true, to: DEFAULT_PRIVATE_ROUTE })(
    Component
  );

export const redirectUnauthenticatedToLogin = (
  Component: FunctionComponent<any>
) => withRedirectAuth({ to: LOGIN })(Component);
