import { initializeFirestore } from "firebase/firestore";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { FirestoreProvider, useInitFirestore } from "reactfire";

import { LoadingIndicator } from "~/components/LoadingIndicator";

import { withLogin } from "../utils";
import { PlaceId } from "./[placeId]";
import { MyPlaces } from "./MyPlaces";
import { NewPlace } from "./NewPlace";
import { NEW_PLACE } from "./routes";

const FirebaseFirestoreProvider = (props: { children: any }) => {
  const { status, data: firestoreInstance } = useInitFirestore(
    async (firebaseApp) => {
      const db = initializeFirestore(firebaseApp, {});
      // await enableIndexedDbPersistence(db);
      return db;
    }
  );

  return status === "loading" ? (
    <LoadingIndicator />
  ) : (
    <FirestoreProvider sdk={firestoreInstance}>
      {props.children}
    </FirestoreProvider>
  );
};

export const Places = () => {
  const { path, url } = useRouteMatch();

  return (
    <FirebaseFirestoreProvider>
      <Switch>
        <Route component={withLogin(MyPlaces)} exact path={path} />
        <Route
          component={withLogin(NewPlace)}
          exact
          path={`${url}${NEW_PLACE}`}
        />
        <Route component={PlaceId} path={`${url}/:placeId`} />
      </Switch>
    </FirebaseFirestoreProvider>
  );
};
