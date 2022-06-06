import React from "preact/compat";
import { useAuth, useUser } from "reactfire";

import { TemplateApp } from "~/components/TemplateApp";

export const Profile = () => {
  const { data: user } = useUser();
  const auth = useAuth();
  return (
    <TemplateApp>
      <h2>Moje nastavení</h2>
      <button onClick={() => auth.signOut()}>Odhlasit se</button>
      <pre style={{ overflow: `scroll` }}>{JSON.stringify(user, null, 2)}</pre>
    </TemplateApp>
  );
};
