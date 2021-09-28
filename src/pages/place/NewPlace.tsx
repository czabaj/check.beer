import { FunctionComponent } from "preact";

import { TemplateApp } from "../../components/TemplateApp";

export const NewPlace: FunctionComponent = () => {
  return (
    <TemplateApp pageTitle="Přidat místo">
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Název místa: <input type="text" />
        </label>
        <button type="submit">Přidat místo</button>
      </form>
    </TemplateApp>
  );
};
