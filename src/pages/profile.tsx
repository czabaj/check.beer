import { useRecoilValue } from "recoil";

import { userAtom } from "../atoms/userAtom";

export const Profile = () => {
  const user = useRecoilValue(userAtom);
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};
