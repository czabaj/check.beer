import { ReactComponent as ChevronLeftIcon } from "@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg";
import cx from "clsx";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { Trans } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Place } from "~/api/models";
import { Icon } from "~/components/layouts/Icon";
import { TemplateApp } from "~/components/TemplateApp";
import { useRelativeUnit } from "~/hooks/useRelativeUnit";
import { Established } from "~/pages/place/[placeId]/components/Established";
import buttonClasses from "~/styles/components/button.module.css";
import { toLocalDateString } from "~/utils/dateTime";

import classes from "./PlaceSettings.module.css";

const PersonItem = (props: { name: string; lastSeen: Timestamp }) => {
  const lastSeenTimestamp = props.lastSeen.toMillis();
  const relativeLastSeen = useRelativeUnit(lastSeenTimestamp);
  return (
    <div>
      <div>{props.name}</div>
      <div>
        <Trans
          defaults="Naposledy spatřen <time>{{seenBefore, relativetime}}</time>"
          values={{
            seenBefore: relativeLastSeen.value,
            formatParams: {
              seenBefore: { range: relativeLastSeen.range, numeric: "auto" },
            },
          }}
          components={{
            time: (
              <time dateTime={toLocalDateString(lastSeenTimestamp)} />
            ),
          }}
        />
      </div>
    </div>
  );
};

export const PlaceSettings = ({
  place,
  placeRef,
}: {
  place: Place;
  placeRef: DocumentReference<Place>;
}) => {
  const history = useHistory();
  return (
    <TemplateApp>
      <div className={classes.header}>
        <button
          className={cx(
            buttonClasses.button,
            buttonClasses.variantStealth,
            buttonClasses.icon
          )}
          onClick={history.goBack}
          type="button"
        >
          <Icon icon={ChevronLeftIcon} height="2rem" />
          Zpět
        </button>
        <div>
          <h2>{place.name}</h2>
          <div>
            <Established timestamp={place.established.toMillis()} />
          </div>
        </div>
      </div>
      <h3>Nastaveni mista</h3>
      {Object.entries(place.taps).map(([name, keg]) => {
        return <div key={name}>{name}</div>;
      })}
      {Object.entries(place.personsAll).map(([id, [name, lastSeen]]) => {
        return <PersonItem key={id} lastSeen={lastSeen} name={name} />;
      })}
    </TemplateApp>
  );
};
