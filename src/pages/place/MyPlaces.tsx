import { ReactComponent as PlusIcon } from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";
import cx from "clsx";
import { Link, useRouteMatch } from "react-router-dom";

import { CurrentUser as DBUser } from "~/api/models";
import { Icon } from "~/components/layouts/Icon";
import { LoadingIndicator } from "~/components/LoadingIndicator";
import { TemplateApp } from "~/components/TemplateApp";
import { useCurrentUser } from "~/hooks/useCurrentUser";
import buttonClasses from "~/styles/components/button.module.css";

import { NEW_PLACE } from "./routes";

const PlacesListing = ({ places }: { places?: DBUser[`places`] }) => {
  const placesEntries = places && Object.entries(places);
  const { url } = useRouteMatch();
  return (
    <>
      {!placesEntries?.length ? (
        <div>Nemate zadna mista</div>
      ) : (
        <ul>
          {placesEntries.map(([id, name]) => (
            <li>
              <Link to={`${url}/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export const MyPlaces = () => {
  const { data: DBUser } = useCurrentUser();
  const { url } = useRouteMatch();

  return (
    <TemplateApp>
      <h2>Moje mista</h2>
      <Link className={cx(buttonClasses.button)} to={`${url}${NEW_PLACE}`}>
        <Icon icon={PlusIcon} noAlign />
        <span className="visually-hidden"> přidat dalsi misto</span>
      </Link>
      {!DBUser ? (
        <LoadingIndicator />
      ) : (
        <PlacesListing places={DBUser.places} />
      )}
    </TemplateApp>
  );
};
