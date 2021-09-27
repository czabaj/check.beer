import { doc, getFirestore } from "firebase/firestore";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useFirebaseApp, useFirestoreDocData } from "reactfire";

import { LoadingIndicator } from "../../../components/LoadingIndicator";
import type { Place as PlaceType } from "../../../models";
import { NewPerson } from "./NewPerson";
import { Overview } from "./Overview";

type PlaceProps = {
  placeId: string;
};

export const PlaceId = ({ placeId }: PlaceProps) => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const { path, url } = useRouteMatch();
  const placeRef = doc<PlaceType>(firestoreInstance as any, `places`, placeId);
  const { data: place, status } = useFirestoreDocData<PlaceType>(placeRef);
  return !place ? (
    <LoadingIndicator />
  ) : (
    <Switch>
      <Route component={Overview} exact path={path}>
        <Overview place={place} placeRef={placeRef} />
      </Route>
      <Route component={NewPerson} path={`${url}/nova-osoba`}>
        <NewPerson place={place} placeRef={placeRef} />
      </Route>
    </Switch>
  );
};
