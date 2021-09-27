import { Route, Router } from "preact-router";
import { useFirestoreDocData, useFirestore } from "reactfire";

import type { Place as PlaceType } from "../../models";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { NewPerson } from "./NewPerson";
import { Overview } from "./Overview";

type PlaceProps = {
  placeId: string;
};

export const Place = ({ placeId }: PlaceProps) => {
  const placeRef = useFirestore().collection(`places`).doc(placeId);
  const { data: place, status } = useFirestoreDocData<PlaceType>(placeRef);
  return !place ? (
    <LoadingIndicator />
  ) : (
    <Router>
      <Route
        component={NewPerson}
        path="/misto/:placeId/nova-osoba"
        place={place}
        placeRef={placeRef}
      />
      <Route
        component={Overview}
        path="/misto/:placeId"
        place={place}
        placeRef={placeRef}
      />
    </Router>
  );
};
