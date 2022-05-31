import { ReactComponent as PlusIcon } from "@fortawesome/fontawesome-free/svgs/solid/plus.svg";
import cx from "classnames";
import { Link, useRouteMatch } from "react-router-dom";

import { LoadingIndicator } from "../../components/LoadingIndicator";
import { TemplateApp } from "../../components/TemplateApp";
import { Icon } from "../../components/layouts/Icon";
import { useDBUser } from "../../hooks/useDBUser";
import { User as DBUser } from "../../models";
import { NEW_PLACE } from "./routes";
import buttonClasses from "../../styles/components/button.module.css";

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
