import type { FunctionComponent, VNode } from "preact";
import { Redirect } from "react-router-dom";
import { useSigninCheck } from "reactfire";

import { LoadingIndicator } from "./LoadingIndicator";

export type Props = {
  /**
   * The content to be rendered when redirection wont fire.
   */
  children: VNode;
  /**
   * Setting to `true` redirects _authenticated_ users away, e.g. on the login
   * page, which must not be shown to already logged-in users. Leave unset or
   * set to `false` to redirect unauthenticated user (guard private pages).
   */
  authenticated?: boolean;
  /**
   * Pathname where the user shall be redirected to.
   */
  to: string;
};

/**
 * This component handles redirection based on authentication status.
 */
export const RedirectAuth: FunctionComponent<Props> = ({
  authenticated,
  children,
  to,
}) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  if (status === `loading`) {
    return <LoadingIndicator />;
  }
  if (signInCheckResult.signedIn === Boolean(authenticated)) {
    return <Redirect to={to} />;
  }
  return children;
};

/**
 * HOC for usage in routers
 */
export const withRedirectAuth: <ComponentProps>(
  options: Omit<Props, `children`>
) => (
  WrappedComponent: FunctionComponent<ComponentProps>
) => (props: ComponentProps) => VNode =
  (options) => (WrappedComponent) => (props) =>
    (
      <RedirectAuth {...options}>
        <WrappedComponent {...props} />
      </RedirectAuth>
    );
