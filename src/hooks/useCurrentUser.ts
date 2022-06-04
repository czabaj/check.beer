import { useAuth, useFirestore, useObservable } from "reactfire";

import { currentUser$ } from "~/db";

export const useCurrentUser = () =>
  useObservable(`useCurrentUser`, currentUser$(useAuth(), useFirestore()));
