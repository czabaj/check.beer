import { ReactComponent as ChevronLeftIcon } from "@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg";
import cx from "clsx";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { orderBy, pipe } from "lodash/fp";
import { DialogHTMLAttributes, useMemo, useReducer } from "react";
import { Trans } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useFirestore } from "reactfire";

import { placePersonAdd } from "~/api/db";
import { PersonShort, Place } from "~/api/models";
import { placePersonsShort } from "~/api/utils";
import { Icon } from "~/components/layouts/Icon";
import { TemplateApp } from "~/components/TemplateApp";
import { useRelativeUnit } from "~/hooks/useRelativeUnit";
import { Established } from "~/pages/place/[placeId]/components/Established";
import buttonClasses from "~/styles/components/button.module.css";
import { toLocalDateString } from "~/utils/dateTime";
import { toggle } from "~/utils/fp";

import classes from "./PlaceSettings.module.css";

const PersonListItem = (props: {
  isPresent: boolean;
  lastSeen: Timestamp;
  name: string;
}) => {
  const lastSeenTimestamp = props.lastSeen.toMillis();
  const relativeLastSeen = useRelativeUnit(lastSeenTimestamp);
  return (
    <li>
      <div>
        <div>{props.name}</div>
        <div className={classes.lastActivity}>
          <Trans
            defaults="Naposledy spatřen <time>{{seenBefore, relativetime}}</time>"
            values={{
              seenBefore: relativeLastSeen.value,
              formatParams: {
                seenBefore: { range: relativeLastSeen.range, numeric: "auto" },
              },
            }}
            components={{
              time: <time dateTime={toLocalDateString(lastSeenTimestamp)} />,
            }}
          />
        </div>
      </div>
      <input type="checkbox" checked={props.isPresent} readOnly={true} />
    </li>
  );
};

const AddUserDialog = (
  props: Pick<DialogHTMLAttributes<HTMLDialogElement>, `open` | `onClose`> & {
    placeRef: DocumentReference<Place>;
  }
) => {
  const firestore = useFirestore();
  return (
    <dialog
      open={props.open}
      onClose={(event) => {
        event.preventDefault();
        if (!event.nativeEvent.returnValue) {
          props.onClose?.(event);
        }
        const form = (event.target as HTMLDialogElement).querySelector(
          `form`
        ) as HTMLFormElement;
        const valid = form.reportValidity();
        if (!valid) {
          return;
        }
        const formData = new FormData(form);
        placePersonAdd(firestore, props.placeRef, {
          name: formData.get(`name`) as string,
        }).then(
          () => {
            props.onClose?.(event);
          },
          (error) => {
            console.error(error);
          }
        );
      }}
      onCancel={(event) => {
        debugger;
      }}
    >
      <form method="dialog">
        <label htmlFor="new_user_name">Jméno</label>
        <input
          id="new_user_name"
          minLength={3}
          name="name"
          required
          type="text"
        />
        <button type="submit" value="ok">
          OK
        </button>
      </form>
    </dialog>
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
  const [addUserDialogOpen, toggleAddUserDialogOpen] = useReducer(
    toggle,
    false
  );
  const personsSorted = useMemo<PersonShort[]>(() => {
    return pipe(
      placePersonsShort,
      orderBy<PersonShort>([`name`], [`asc`])
    )(place.personsAll) as any;
  }, [place.personsAll]);
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
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <caption>Nastaveni mista</caption>
        <ul>
          {Object.entries(place.taps).map(([name, keg]) => {
            return <li key={name}>{name}</li>;
          })}
        </ul>
        <fieldset>
          <legend>Uživatelé</legend>
          <ol className={classes.personList}>
            {personsSorted.map(({ id, lastSeen, name, preferredTap }) => {
              return (
                <PersonListItem
                  key={id}
                  isPresent={Boolean(preferredTap)}
                  lastSeen={lastSeen}
                  name={name}
                />
              );
            })}
          </ol>
          <button onClick={toggleAddUserDialogOpen} type="button">
            Přidat uživatele
          </button>
        </fieldset>
      </form>
      <AddUserDialog
        onClose={toggleAddUserDialogOpen}
        open={addUserDialogOpen}
        placeRef={placeRef}
      />
    </TemplateApp>
  );
};
