import { getFirestore } from "firebase/firestore";
import type { FunctionComponent } from "preact";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

import { PlaceId } from "./[placeId]";
import { MyPlaces } from "./MyPlaces";
import { NewPlace } from "./NewPlace";
import { NEW_PLACE } from "./routes";
import { redirectUnauthenticatedToLogin } from "../utils";

export const Places: FunctionComponent = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const { path, url } = useRouteMatch();

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Switch>
        <Route
          component={redirectUnauthenticatedToLogin(MyPlaces)}
          exact
          path={path}
        />
        <Route
          component={redirectUnauthenticatedToLogin(NewPlace)}
          exact
          path={`${url}${NEW_PLACE}`}
        />
        <Route component={PlaceId} path={`${url}/:placeId`} />
      </Switch>
    </FirestoreProvider>
  );
};
