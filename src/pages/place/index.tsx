import { getFirestore } from "firebase/firestore";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

import { PlaceId } from "./[placeId]";
import { MyPlaces } from "./MyPlaces";
import { NewPlace } from "./NewPlace";
import { NEW_PLACE } from "./routes";

export type Props = {};

export const Places = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const { path, url } = useRouteMatch();

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <Switch>
        <Route component={MyPlaces} exact path={path} />
        <Route component={NewPlace} exact path={NEW_PLACE} />
        <Route component={PlaceId} path={`${url}/:placeId`}></Route>
      </Switch>
    </FirestoreProvider>
  );
};
