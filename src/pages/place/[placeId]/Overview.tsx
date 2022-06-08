import { ReactComponent as GearIcon } from "@fortawesome/fontawesome-free/svgs/solid/cog.svg";
import cx from "clsx";
import { DocumentReference } from "firebase/firestore";
import { orderBy } from "lodash/fp";
import { Link, useRouteMatch } from "react-router-dom";
import { useFirestoreCollectionData } from "reactfire";

import { kegRecentQuery } from "~/api/db";
import type { Consumption, Place } from "~/api/models";
import { sortConsumptions, toConsumptionSymbol } from "~/api/utils";
import { Icon } from "~/components/layouts/Icon";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { TemplateApp } from "~/components/TemplateApp";
import buttonClasses from "~/styles/components/button.module.css";

import { Established } from "./components/Established";
import classes from "./Overview.module.css";
import { SETTINGS } from "./routes";

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
  if (!kegs) {
    return <LoadingIndicator />;
  }
  const activePersons: Record<
    string,
    { consumptions: Consumption[]; id: string; name: string }
  > = {};
  for (const [id, [name, , preferredTap]] of Object.entries(place.personsAll)) {
    const isActive = Boolean(preferredTap);
    if (isActive) {
      activePersons[id] = { consumptions: [], id, name };
    }
  }
  for (const { consumptions } of kegs) {
    for (const consumption of consumptions) {
      activePersons[consumption.person.id]?.consumptions.push(consumption);
    }
  }
  const sortedPersons = orderBy(
    [`name`],
    [`asc`],
    Object.values(activePersons)
  );

  return (
    <TemplateApp>
      <div className={classes.header}>
        <div>
          <h2>{place.name}</h2>
          <div>
            <Established timestamp={place.established.toMillis()} />
          </div>
        </div>
        <Link
          className={cx(
            buttonClasses.button,
            buttonClasses.variantStealth,
            buttonClasses.icon
          )}
          to={`${url}${SETTINGS}`}
        >
          <Icon icon={GearIcon} height="2rem" />
          Nastavení
        </Link>
      </div>
      <ol className={classes.personsList}>
        {sortedPersons.map(({ consumptions, id, name }) => (
          <PersonListItem
            hrefDetail={`${url}/osoba/${id}`}
            key={id}
            name={name}
            recentConsumptions={consumptions}
          />
        ))}
      </ol>
    </TemplateApp>
  );
};
