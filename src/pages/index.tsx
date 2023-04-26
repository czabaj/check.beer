import { Route, Switch } from "react-router-dom";

import { Homepage } from "./Homepage";
import { Places } from "./place";
import { Profile } from "./profile";
import { PLACE, PROFILE } from "./routes";
import { withLogin } from "./utils";

export const Root = () => {
  return (
    <Switch>
      <Route component={Homepage} exact path="/" />
      <Route component={withLogin(Profile)} exact path={PROFILE} />
      <Route component={Places} path={PLACE} />
      <Route path="*">The URL was not found in the router :(</Route>
    </Switch>
  );
};
