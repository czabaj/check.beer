import { TemplateApp } from "../../components/TemplateApp";
import buttonClasses from "../../styles/components/button.module.css";


export const NewPlace = () => {
  return (
    <TemplateApp pageTitle="Přidat místo">
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Název místa: <input type="text" />
        </label>
        <button className={buttonClasses.button} type="submit">Přidat místo</button>
      </form>
    </TemplateApp>
  );
};
