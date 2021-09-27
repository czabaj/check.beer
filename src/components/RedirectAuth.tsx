import type { ComponentChildren, FunctionComponent } from "preact";
import { useRecoilValue } from "recoil";

import { userAtom } from "../atoms/userAtom";
import LoadingIndicator from "./LoadingIndicator";
import { Redirect } from "./Redirect";

export type Props = {
  /**
   * The content to be rendered when redirection wont fire.
   */
  children: ComponentChildren;
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
  const user = useRecoilValue(userAtom);
  if (user === undefined) {
    // auth status undetermined
    return <LoadingIndicator />;
  }
  if (Boolean(user) === authenticated) {
    return <Redirect to={to} />;
  }
  return <>{children}</>;
};