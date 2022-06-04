import { DocumentReference } from "firebase/firestore";

import { TemplateApp } from "~/components/TemplateApp";
import type { Consumption, Keg, Place } from "~/models";

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
  return <TemplateApp pageTitle={place.name}>{inactivePersons}</TemplateApp>;
};
