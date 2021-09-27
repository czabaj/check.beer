import type { User } from "firebase/auth";
import { useUser } from "reactfire";

export const UNDETERMIED = `undetermined`;

/**
 * This hook is just a wrapper for `reactfire/useUser` solving one bug - the
 * `useUser` provides loading state and the data, but the loading state is
 * changed to `SUCCESS` sooner, then the user data are populated and I treat
 * empty user data as unauthenticated user - reading the user data after the
 * `status` change is thus unreliable.
 *
 * TODO: report an issue, try to resolve in the reactfire repo.
 */
export const useUserData = (): User | null | typeof UNDETERMIED => {
  const { data: user } = useUser({ initialData: UNDETERMIED });
  return user;
};
