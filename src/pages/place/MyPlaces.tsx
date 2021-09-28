import { ReactComponent as PlusIcon } from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";
import type { FunctionComponent } from "preact";
import { Link, useRouteMatch } from "react-router-dom";
import { SuspenseWithPerf, useSigninCheck } from "reactfire";

import { Button } from "../../components/Button";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { TemplateApp } from "../../components/TemplateApp";
import { Icon } from "../../components/layouts/Icon";
import { useDBUser } from "../../hooks/useDBUser";
import { useLocalPlaces } from "../../hooks/useLocalPlaces";
import { User as DBUser } from "../../models";
import { LOGIN } from "../routes";
import { NEW_PLACE } from "./routes";

const PlacesListing: FunctionComponent<{ places?: DBUser[`places`] }> = ({
  places,
}) => {
  const placesEntries = places && Object.entries(places);
  const { url } = useRouteMatch();
  console.log(`object`, { PlusIcon });
  return (
    <>
      {!placesEntries?.length ? (
        <>Nemate zadna mista</>
      ) : (
        <ul>
          {placesEntries.map(([id, name]) => (
            <li>{name}</li>
          ))}
        </ul>
      )}
      <Link component={Button} primary round to={`${url}${NEW_PLACE}`}>
        <Icon icon={PlusIcon} noAlign />
        <span className="visually-hidden"> přidat dalsi misto</span>
      </Link>
    </>
  );
};

const PlacesListingAuthenticated: FunctionComponent = () => {
  const { data: DBUser } = useDBUser();
  return !DBUser ? (
    <LoadingIndicator />
  ) : (
    <PlacesListing places={DBUser.places} />
  );
};

const PlacesListingUnauthenticated: FunctionComponent = () => {
  const [localPlaces] = useLocalPlaces();
  return (
    <>
      <PlacesListing places={localPlaces} />
      <>
        <p>Pro vytvoreni mista se musite prihlasit nebo zaregistrovat</p>
        <Link component={Button} primary to={LOGIN}>
          Do aplikace
        </Link>
      </>
    </>
  );
};

export const MyPlaces: FunctionComponent = () => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const [localPlaces] = useLocalPlaces();

  return (
    <TemplateApp pageTitle="Moje mista">
      <SuspenseWithPerf fallback={<LoadingIndicator />} traceId="places">
        {status === `loading` ? (
          <LoadingIndicator />
        ) : signInCheckResult.signedIn === true ? (
          <PlacesListingAuthenticated />
        ) : (
          <PlacesListingUnauthenticated />
        )}
      </SuspenseWithPerf>
    </TemplateApp>
  );
};
