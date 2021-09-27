import firebase from "firebase";
import { atom } from "recoil";

export const valueTypeOnly = (obj: any): any => JSON.parse(JSON.stringify(obj));

/**
 * This is a Recoil atom with all necessary detail about currently authenticated
 * user. The value might be:
 *
 * - `undefined` - the authentication is not yet known, the SKD is initializing,
 * - `null` - unauthenticated,
 * - `Partial<firebase.User>` - authenticated.
 *
 * The SKD's `firebase.User` also provides methods for handling authenticatio,
 * which are not stored in this atom. This atom contains only value type
 * properties.
 */
export const userAtom = atom<
  | (Pick<
      firebase.User,
      | `displayName`
      | `emailVerified`
      | `email`
      | `isAnonymous`
      | `photoURL`
      | `providerData`
      | `uid`
    > & {
      createdAt: string;
      lastLoginAt: string;
    })
  | null
  | undefined
>({
  key: `user`,
  default: undefined,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const firebaseAuth = firebase.auth();
      const currentUser = firebaseAuth.currentUser;
      if (currentUser) {
        setSelf(valueTypeOnly(currentUser));
      }
      firebaseAuth.onAuthStateChanged((user) => {
        setSelf(user && valueTypeOnly(user));
      });
    },
  ],
});
