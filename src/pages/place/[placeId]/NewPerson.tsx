import { DocumentReference } from "firebase/firestore";

import type { Consumption, Keg, Place } from "~/api/models";
import { TemplateApp } from "~/components/TemplateApp";

type NewPersonProps = {
  place: Place;
  placeRef: DocumentReference<Place>;
};

export const NewPerson = ({ place }: NewPersonProps) => {
  const inactivePersons = [] as string[];
  for (const [name, active] of Object.entries(place.persons)) {
    if (!active) {
      inactivePersons.push(name);
    }
  }
  return (
    <TemplateApp>
      <h2>{place.name}</h2>
      <input type="search" />
      {inactivePersons}
    </TemplateApp>
  );
};
