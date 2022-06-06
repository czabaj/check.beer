import { ReactComponent as GearIcon } from "@fortawesome/fontawesome-free/svgs/solid/cog.svg";
import cx from "clsx";
import { DocumentReference } from "firebase/firestore";
import { memo } from "preact/compat";
import { Trans } from "react-i18next";
import { Link, useRouteMatch } from "react-router-dom";
import { useFirestoreCollectionData } from "reactfire";

import { kegRecentQuery } from "~/api/db";
import type { Consumption, PersonName, Place } from "~/api/models";
import { sortConsumptions, toConsumptionSymbol } from "~/api/utils";
import { Icon } from "~/components/layouts/Icon";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { TemplateApp } from "~/components/TemplateApp";
import buttonClasses from "~/styles/components/button.module.css";
import { toLocalDateString } from "~/utils/dateTime";

import classes from "./Overview.module.css";

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

const PersonListItem = (props: {
  hrefDetail: string;
  name: string;
  recentConsumptions: Consumption[];
}) => {
  const consumedMillilitersByDateAsc = props.recentConsumptions
    .sort(sortConsumptions)
    .map(toConsumptionSymbol);

  return (
    <li>
      <Link to={props.hrefDetail}>{props.name}</Link>
      <div>{consumedMillilitersByDateAsc.join(``)}</div>
    </li>
  );
};

export const Overview = ({
  place,
  placeRef,
}: {
  place: Place;
  placeRef: DocumentReference<Place>;
}) => {
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
            hrefDetail={`${url}/konzument/${personName}`}
            key={personName}
            name={personName}
            recentConsumptions={consumptionPerPerson[personName]}
          />
        ))}
      </ol>
    </TemplateApp>
  );
};
