import { Route, Router } from "preact-router";
import { useFirestoreDocData, useFirestore } from "reactfire";

import { LoadingIndicator } from "../../components/LoadingIndicator";
import { PLACE } from "../../constants/routes";
import type { Place as PlaceType } from "../../models";
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
        path={`${PLACE}/:placeId/nova-osoba`}
        place={place}
        placeRef={placeRef}
      />
      <Route
        component={Overview}
        path={`${PLACE}/:placeId`}
        place={place}
        placeRef={placeRef}
      />
    </Router>
  );
};
