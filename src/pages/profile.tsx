import { useRecoilValue } from "recoil";

import { TemplateApp } from "../components/TemplateApp";
import { userAtom } from "../atoms/userAtom";

export const Profile = () => {
  const user = useRecoilValue(userAtom);
  return (
    <TemplateApp pageTitle="Moje nastavení">
      <pre style={{ overflow: `scroll` }}>{JSON.stringify(user, null, 2)}</pre>
    </TemplateApp>
  );
};
