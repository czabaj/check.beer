import {
  addDoc,
  collection,
  updateDoc,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";
import { set, update } from "lodash/fp";

import { TemplateApp } from "../../components/TemplateApp";
import buttonClasses from "../../styles/components/button.module.css";
import { Place, User as DBUser } from "../../models";

const FORM_FIELD_PLACE_NAME = `name`;

export const NewPlace = () => {
  const firestore = useFirestore();
  const user = useUser();
  return (
    <TemplateApp pageTitle="Přidat místo">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const valid = form.reportValidity();
          if (!valid) return;
          const formData = new FormData(form);
          const name = formData.get(FORM_FIELD_PLACE_NAME) as string;
          const userRef = query<DBUser>(
            collection(firestore, `users`) as any,
            where(`email`, `==`, user.data!.email)
          );
          const userDocs = await getDocs(userRef);
          const DBUser = userDocs.docs[0];
          const placeRef = await addDoc<Place>(
            collection(firestore, "places") as any,
            {
              name,
              taps: { main: null },
              persons: { [DBUser.data().name]: true },
            }
          );
          const updatedData = update(
            `places`,
            set(placeRef.id, name),
            DBUser.data()
          );
          await updateDoc(DBUser.ref, updatedData);
        }}
      >
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
