import type { FunctionComponent } from "react";
import { useSigninCheck } from "reactfire";

import { LoadingIndicator } from "~/components/LoadingIndicator";

import { Login } from "./login";

export const withLogin = function <ComponentProps>(
  Component: FunctionComponent<ComponentProps>
) {
  return (props: ComponentProps) => {
    const { status, data: signInCheckResult } = useSigninCheck();
    if (status === `loading`) {
      return <LoadingIndicator />;
    }
    if (!signInCheckResult.signedIn) {
      return <Login />;
    }
    return <Component {...(props as any)} />;
  };
};
