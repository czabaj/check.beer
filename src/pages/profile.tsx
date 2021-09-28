import type { FunctionComponent } from "preact";
import { useAuth, useUser } from "reactfire";

import { Button } from "../components/Button";
import { TemplateApp } from "../components/TemplateApp";

export const Profile: FunctionComponent = () => {
  const { data: user } = useUser();
  const auth = useAuth();
  return (
    <TemplateApp pageTitle="Moje nastavení">
      <Button onClick={() => auth.signOut()}>Odhlasit se</Button>
      <pre style={{ overflow: `scroll` }}>{JSON.stringify(user, null, 2)}</pre>
    </TemplateApp>
  );
};
