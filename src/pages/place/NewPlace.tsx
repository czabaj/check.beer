import { useHistory } from "react-router-dom";
import { useFirestore, useUser } from "reactfire";

import { addNewPlace } from "~/api/db";
import { TemplateApp } from "~/components/TemplateApp";
import buttonClasses from "~/styles/components/button.module.css";

import { ROOT } from "./routes";

const FORM_FIELD_PLACE_NAME = `name`;

export const NewPlace = () => {
  const firestore = useFirestore();
  const user = useUser();
  const history = useHistory();
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const valid = form.reportValidity();
    if (!valid) return;
    const formData = new FormData(form);
    const newPlace = await addNewPlace(firestore, user.data!, {
      name: formData.get(FORM_FIELD_PLACE_NAME) as string,
    });
    history.push(`${ROOT}/${newPlace.id}`);
  };
  return (
    <TemplateApp>
      <h2>Přidat místo</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor={FORM_FIELD_PLACE_NAME}>Název místa</label>
            <input
              id={FORM_FIELD_PLACE_NAME}
              name={FORM_FIELD_PLACE_NAME}
              required
              type="text"
            />
          </div>
          <div>
            <button className={buttonClasses.button} type="submit">
              Přidat místo
            </button>
          </div>
        </fieldset>
      </form>
    </TemplateApp>
  );
};
