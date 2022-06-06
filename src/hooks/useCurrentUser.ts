import { useAuth, useFirestore, useObservable } from "reactfire";

import { currentUser$ } from "~/api/db";

export const useCurrentUser = () =>
  useObservable(`useCurrentUser`, currentUser$(useAuth(), useFirestore()));
