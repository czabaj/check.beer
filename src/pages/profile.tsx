import type { FunctionComponent } from "preact";
import { useAuth, useUser } from "reactfire";

import { TemplateApp } from "../components/TemplateApp";

export const Profile: FunctionComponent = () => {
  const { data: user } = useUser();
  const auth = useAuth();
  return (
    <TemplateApp pageTitle="Moje nastavení">
      <button onClick={() => auth.signOut()}>Odhlasit se</button>
      <pre style={{ overflow: `scroll` }}>{JSON.stringify(user, null, 2)}</pre>
    </TemplateApp>
  );
};
