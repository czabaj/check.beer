import { Route, Switch, useRouteMatch } from "react-router-dom";

import { PlaceId } from "./[placeId]";
import { MyPlaces } from "./MyPlaces";

export type Props = {};

export const Places = () => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route component={MyPlaces} exact path={path} />
      <Route component={PlaceId} path={`${url}/:placeId`}></Route>
    </Switch>
  );
};
