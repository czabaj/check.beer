import { ReactComponent as PlusIcon } from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";
import cx from "clsx";
import { Link, useRouteMatch } from "react-router-dom";

import { LoadingIndicator } from "~/components/LoadingIndicator";
import { TemplateApp } from "~/components/TemplateApp";
import { Icon } from "~/components/layouts/Icon";
import { useCurrentUser } from "~/hooks/useCurrentUser";
import { CurrentUser as DBUser } from "~/models";
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
      <Link className={cx(buttonClasses.button)} to={`${url}${NEW_PLACE}`}>
        <Icon icon={PlusIcon} noAlign />
        <span className="visually-hidden"> přidat dalsi misto</span>
      </Link>
    </>
  );
};

export const MyPlaces = () => {
  const { data: DBUser } = useCurrentUser();

  return (
    <TemplateApp>
      <h2>Moje mista</h2>
      {!DBUser ? (
        <LoadingIndicator />
      ) : (
        <PlacesListing places={DBUser.places} />
      )}
    </TemplateApp>
  );
};
