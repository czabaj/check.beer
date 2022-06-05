import { ReactComponent as PlusIcon } from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";
import cx from "clsx";
import {
  DocumentReference,
} from "firebase/firestore";
import { useFirestoreCollectionData } from "reactfire";
import { Link, useRouteMatch } from "react-router-dom";

import { LoadingIndicator } from "~/components/LoadingIndicator";
import { Cluster } from "~/components/layouts/Cluster";
import { Icon } from "~/components/layouts/Icon";
import { TemplateApp } from "~/components/TemplateApp";
import { kegRecentQuery } from "~/db";
import type { Consumption, Keg, Place } from "~/models";
import buttonClasses from "~/styles/components/button.module.css";
import { NEW_PERSON } from "./routes";

// const stylePersonListItemBase = css`
//   font-size: 120%;
//   padding: 0 var(--s-1);
//   position: relative;
//   &::before {
//     background-color: dodgerblue;
//     bottom: -1px;
//     content: "";
//     left: 0;
//     position: absolute;
//     top: 0;
//     width: calc(var(--s-1) + 1.5ch);
//   }
//   & > span:first-child {
//     z-index: 1;
//     &::first-letter {
//       color: white;
//       font-weight: bold;
//     }
//   }
//   & > span:last-child {
//     font-style: italic;
//   }
// `;

const sortConsumptions = (a: Consumption, b: Consumption) =>
  a.at.seconds - b.at.seconds;

const toConsumptionSymbol = ({ milliliters }: Consumption) =>
  milliliters >= 400 ? `X` : `I`;

type PersonListItemProps = {
  recentConsumptions: Consumption[];
  name: string;
};

const PersonListItem = (props: PersonListItemProps) => {
  const consumedMillilitersByDateAsc = props.recentConsumptions
    .sort(sortConsumptions)
    .map(toConsumptionSymbol);
  return (
    <Cluster as="li" justify="space-between">
      <span>{props.name}</span>
      <span>{consumedMillilitersByDateAsc.join(``)}</span>
    </Cluster>
  );
};

// const stylePlaceOrderedList = css`
//   ${resetList}
// `;



export type OverviewProps = {
  place: Place;
  placeRef: DocumentReference<Place>;
};

export const Overview = ({ place, placeRef }: OverviewProps) => {
  const { data: kegs, status } = useFirestoreCollectionData(kegRecentQuery(placeRef));
  const { url } = useRouteMatch();
  console.log(`data`, { place, kegs });
  if (!kegs) {
    return <LoadingIndicator />;
  }
  const activePersons = [] as string[];
  const consumptionPerPerson = {} as Record<
    typeof activePersons[number],
    Consumption[]
  >;
  for (const [name, active] of Object.entries(place.persons)) {
    if (active) {
      activePersons.push(name);
      consumptionPerPerson[name] = [];
    }
  }
  for (const { consumptions } of kegs) {
    for (const consumption of consumptions) {
      consumptionPerPerson[consumption.person]?.push(consumption);
    }
  }
  return (
    <TemplateApp>
      <div>
        <div>
          <h2>{place.name}</h2>
          <div>Již od </div>
        </div>
      </div>
      <ol>
        {activePersons.sort().map((personName) => (
          <PersonListItem
            recentConsumptions={consumptionPerPerson[personName]}
            name={personName}
          />
        ))}
      </ol>
    </TemplateApp>
  );
};
