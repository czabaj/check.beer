import { useFirestore, useUser } from "reactfire";
import { useHistory } from "react-router-dom";

import { TemplateApp } from "~/components/TemplateApp";
import { addNewPlace } from "~/db";
import buttonClasses from "~/styles/components/button.module.css";

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
    history.push(`/place/${newPlace.id}`);
  };
  return (
    <TemplateApp pageTitle="Přidat místo">
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
