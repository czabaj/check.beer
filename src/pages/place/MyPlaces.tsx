import { ReactComponent as PlusIcon } from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";
import type { FunctionComponent } from "preact";
import { Link, useRouteMatch } from "react-router-dom";

import { Button } from "../../components/Button";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { TemplateApp } from "../../components/TemplateApp";
import { Icon } from "../../components/layouts/Icon";
import { useDBUser } from "../../hooks/useDBUser";
import { User as DBUser } from "../../models";
import { NEW_PLACE } from "./routes";

const PlacesListing: FunctionComponent<{ places?: DBUser[`places`] }> = ({
  places,
}) => {
  const placesEntries = places && Object.entries(places);
  const { url } = useRouteMatch();
  return (
    <>
      {!placesEntries?.length ? (
        <>Nemate zadna mista</>
      ) : (
        <ul>
          {placesEntries.map(([id, name]) => (
            <li>
              <Link to={`${url}/${id}`}>{name}</Link>
            </li>
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

export const MyPlaces: FunctionComponent = () => {
  const { data: DBUser } = useDBUser();

  return (
    <TemplateApp pageTitle="Moje mista">
      {!DBUser ? (
        <LoadingIndicator />
      ) : (
        <PlacesListing places={DBUser.places} />
      )}
    </TemplateApp>
  );
};
