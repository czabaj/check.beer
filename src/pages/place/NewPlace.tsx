import { TemplateApp } from "../../components/TemplateApp";
import buttonClasses from "../../styles/components/button.module.css";

const FORM_FIELD_PLACE_NAME = `name`;

export const NewPlace = () => {
  return (
    <TemplateApp pageTitle="Přidat místo">
      <form onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <div>
            <label htmlFor={FORM_FIELD_PLACE_NAME}>Název místa</label>
            <input
              id={FORM_FIELD_PLACE_NAME}
              name={FORM_FIELD_PLACE_NAME}
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
