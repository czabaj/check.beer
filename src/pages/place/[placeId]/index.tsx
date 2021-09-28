import { doc } from "firebase/firestore";
import type { FunctionComponent } from "preact";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";

import { LoadingIndicator } from "../../../components/LoadingIndicator";
import type { Place as PlaceType } from "../../../models";
import { NewPerson } from "./NewPerson";
import { Overview } from "./Overview";
import { PlaceSettings } from "./PlaceSettings";
import { NEW_PERSON, SETTINGS } from "./routes";

export const PlaceId: FunctionComponent = () => {
  const { path, url } = useRouteMatch();
  const { placeId } = useParams<{ placeId: string }>();
  const firestoreInstance = useFirestore();
  const placeRef = doc<PlaceType>(firestoreInstance as any, `places`, placeId);
  const { data: place } = useFirestoreDocData<PlaceType>(placeRef);
  return !place ? (
    <LoadingIndicator />
  ) : (
    <Switch>
      <Route exact path={path}>
        <Overview place={place} placeRef={placeRef} />
      </Route>
      <Route path={`${url}${NEW_PERSON}`}>
        <NewPerson place={place} placeRef={placeRef} />
      </Route>
      <Route path={`${url}${SETTINGS}`}>
        <PlaceSettings />
      </Route>
    </Switch>
  );
};
