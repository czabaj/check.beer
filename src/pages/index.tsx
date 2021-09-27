import type { FunctionComponent } from "preact";
import { Route, Switch } from "react-router-dom";

import { withRedirectAuth } from "../components/RedirectAuth";
import {
  DEFAULT_PRIVATE_ROUTE,
  LOGIN,
  PLACE,
  PROFILE,
} from "../constants/routes";
import { Homepage } from "./Homepage";
import { Login } from "./Login";
import { Places } from "./place";
import { Profile } from "./Profile";

const redirectAuthenticatedIntoApp = (Component: FunctionComponent<any>) =>
  withRedirectAuth({ authenticated: true, to: DEFAULT_PRIVATE_ROUTE })(
    Component
  );
const redirectUnauthenticatedToLogin = (Component: FunctionComponent<any>) =>
  withRedirectAuth({ to: LOGIN })(Component);

export type Props = {};

export const Root: FunctionComponent<Props> = () => {
  return (
    <Switch>
      <Route component={Homepage} exact path="/" />
      <Route
        component={redirectAuthenticatedIntoApp(Login)}
        exact
        path={LOGIN}
      />
      <Route
        component={redirectUnauthenticatedToLogin(Profile)}
        exact
        path={PROFILE}
      />
      <Route component={Places} path={PLACE} />
      <Route path="*">The URL was not found in the router :(</Route>
    </Switch>
  );
};
