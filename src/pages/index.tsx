import { Route, Switch } from "react-router-dom";

import { Homepage } from "./Homepage";
import { Login } from "./Login";
import { Places } from "./place";
import { Profile } from "./Profile";
import { LOGIN, PLACE, PROFILE } from "./routes";
import { redirectAuthenticatedIntoApp, redirectUnauthenticatedToLogin } from './utils'

export const Root = () => {
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
