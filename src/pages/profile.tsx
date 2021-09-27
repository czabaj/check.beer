import { useUser } from 'reactfire'

import { TemplateApp } from "../components/TemplateApp";

export const Profile = () => {
  const user = useUser();
  return (
    <TemplateApp pageTitle="Moje nastavení">
      <pre style={{ overflow: `scroll` }}>{JSON.stringify(user, null, 2)}</pre>
    </TemplateApp>
  );
};
