import type { ComponentChildren, FunctionComponent } from "preact";
import { useRecoilValue } from "recoil";

import { userAtom } from "../atoms/userAtom";
import LoadingIndicator from "./LoadingIndicator";

export type Props = {
  children: ComponentChildren;
  to: string;
};

export const RedirectUnauthenticated: FunctionComponent<Props> = ({
  children,
  to,
}) => {
  const user = useRecoilValue(userAtom);
  switch (user) {
    case undefined:
      return <LoadingIndicator />;
    case null:
      return <>redirect</>;
    default:
      return <>{children}</>;
  }
};
