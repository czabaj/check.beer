import { ReactComponent as GearIcon } from "@fortawesome/fontawesome-free/svgs/solid/cog.svg";
import cx from "clsx";
import { DocumentReference } from "firebase/firestore";
import { memo } from "preact/compat";
import { useFirestoreCollectionData } from "reactfire";
import { Trans } from "react-i18next";
import { Link, useRouteMatch } from "react-router-dom";
import { Temporal } from "temporal-polyfill";

import { LoadingIndicator } from "~/components/LoadingIndicator";
import { Icon } from "~/components/layouts/Icon";
import { TemplateApp } from "~/components/TemplateApp";
import { kegRecentQuery } from "~/db";
import type { Consumption, Keg, PersonName, Place } from "~/models";
import buttonClasses from "~/styles/components/button.module.css";
import { NEW_PERSON } from "./routes";
import classes from "./Overview.module.css";

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
    <li>
      <div>{props.name}</div>
      <div>{consumedMillilitersByDateAsc.join(``)}</div>
    </li>
  );
};

export type OverviewProps = {
  place: Place;
  placeRef: DocumentReference<Place>;
};

const toLocalDateString = (timestamp: number): string =>
  Temporal.Instant.fromEpochMilliseconds(timestamp)
    .toZonedDateTimeISO(Temporal.Now.timeZone())
    .toPlainDate()
    .toString();

const Established = memo(({ timestamp }: { timestamp: number }) => {
  return (
    <Trans
      defaults="Již od <time>{{established, datetime}}</time>"
      values={{
        established: new Date(timestamp),
        formatParams: {
          established: { year: "numeric", month: "numeric", day: "numeric" },
        },
      }}
      components={{
        time: (<time dateTime={toLocalDateString(timestamp)} />) as any,
      }}
    />
  );
});

export const Overview = ({ place, placeRef }: OverviewProps) => {
  const { data: kegs, status } = useFirestoreCollectionData(
    kegRecentQuery(placeRef)
  );
  const { url } = useRouteMatch();
  console.log(`data`, { place, kegs });
  if (!kegs) {
    return <LoadingIndicator />;
  }
  const activePersons = place.active;
  const consumptionPerPerson = {} as Record<PersonName, Consumption[]>;
  for (const name of Object.keys(place.persons)) {
    if (activePersons.includes(name)) {
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
      <div className={classes.header}>
        <div>
          <h2>{place.name}</h2>
          <div>
            <Established timestamp={place.established.toMillis()} />
          </div>
        </div>
        <button
          className={cx(
            buttonClasses.button,
            buttonClasses.variantStealth,
            buttonClasses.icon
          )}
          type="button"
        >
          <Icon icon={GearIcon} height="2rem" />
          Nastavení
        </button>
      </div>
      <ol className={classes.personsList}>
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
