import { Auth, User } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  type CollectionReference,
  type DocumentReference,
  type Firestore,
  type Query,
  type QueryDocumentSnapshot,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { head, set, update } from "lodash/fp";
import { user } from "rxfire/auth";
import { filter, map, switchMap } from "rxjs/operators";
import { collectionData } from "rxfire/firestore";

import { CurrentUser, Place } from "~/models";

export const currentUserCollection = (
  firestore: Firestore
): CollectionReference<CurrentUser> => collection(firestore, `users`) as any;

export const currentUserQuery = (
  firestore: Firestore,
  user: User
): Query<CurrentUser> =>
  query(currentUserCollection(firestore), where(`email`, `==`, user.email));

export const currentUserDoc = (
  firestore: Firestore,
  user: User
): Promise<QueryDocumentSnapshot<CurrentUser>> =>
  getDocs(currentUserQuery(firestore, user)).then(
    (currentUsersDocs) => currentUsersDocs.docs[0]
  );

export const currentUser$ = (auth: Auth, firestore: Firestore) =>
  user(auth)
    .pipe(filter(Boolean))
    .pipe(
      switchMap((user) =>
        collectionData(currentUserQuery(firestore, user), {
          idField: `id`,
        })
      )
    )
    .pipe(map(head));

export const placeCollection = (
  firestore: Firestore
): CollectionReference<Place> => collection(firestore, `places`) as any;

export const addNewPlace = async (
  firestore: Firestore,
  user: User,
  place: Pick<Place, `name`>
): Promise<DocumentReference<Place>> => {
  const currentUser = await currentUserDoc(firestore, user);
  const newPlaceData = {
    ...place,
    taps: { main: null },
    persons: { [currentUser.data().name]: true },
  };
  const newPlace = await addDoc(placeCollection(firestore), newPlaceData);
  const updatedCurrentUser = update(
    `places`,
    set(newPlace.id, place.name),
    currentUser.data()
  );
  await updateDoc(currentUser.ref, updatedCurrentUser);
  return newPlace;
};
