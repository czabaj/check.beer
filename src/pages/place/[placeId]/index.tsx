import { doc } from "firebase/firestore";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";

import { LoadingIndicator } from "../../../components/LoadingIndicator";
import type { Place as PlaceType } from "../../../models";
import { NewPerson } from "./NewPerson";
import { Overview } from "./Overview";
import { NEW_PERSON } from "./routes";

type PlaceProps = {
  placeId: string;
};

export const PlaceId = ({ placeId }: PlaceProps) => {
  const firestoreInstance = useFirestore();
  const placeRef = doc<PlaceType>(firestoreInstance as any, `places`, placeId);
  const { data: place, status } = useFirestoreDocData<PlaceType>(placeRef);
  const { path, url } = useRouteMatch();
  return !place ? (
    <LoadingIndicator />
  ) : (
    <Switch>
      <Route component={Overview} exact path={path}>
        <Overview place={place} placeRef={placeRef} />
      </Route>
      <Route component={NewPerson} path={`${url}${NEW_PERSON}`}>
        <NewPerson place={place} placeRef={placeRef} />
      </Route>
    </Switch>
  );
};
