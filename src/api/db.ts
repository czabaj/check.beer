import { Auth, User } from "firebase/auth";
import {
  collection,
  getDocsFromCache,
  getDocsFromServer,
  query,
  type CollectionReference,
  type DocumentReference,
  type Firestore,
  type Query,
  type QuerySnapshot,
  type QueryDocumentSnapshot,
  where,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { head, set, throttle, update } from "lodash/fp";
import { user } from "rxfire/auth";
import { collectionData } from "rxfire/firestore";
import { filter, map, switchMap } from "rxjs/operators";
import { Temporal } from "temporal-polyfill";

import { CurrentUser, Keg, Place } from "~/api/models";

const getDocsFromCacheFirst = <T>(query: Query<T>): Promise<QuerySnapshot<T>> =>
  getDocsFromCache(query).catch(() => getDocsFromServer(query));

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
  getDocsFromCacheFirst(currentUserQuery(firestore, user)).then(
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
  const newPlaceData: Place = {
    ...place,
    active: [currentUser.data().name],
    established: Timestamp.fromMillis(Date.now()),
    persons: { [currentUser.data().name]: true },
    taps: { main: null },
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

export const kegCollection = (
  place: DocumentReference<Place>
): CollectionReference<Keg> => collection(place, `kegs`) as any;

const UPDATE_EVERY = 60 * 60 * 1000; // milliseconds
export const getSlidingWindow = throttle(UPDATE_EVERY, (): Timestamp => {
  const monthAgo = Temporal.Now.plainDateISO()
    .subtract({ months: 1 })
    .toZonedDateTime(Temporal.Now.timeZone());
  return Timestamp.fromMillis(monthAgo.epochMilliseconds);
});

export const kegRecentQuery = (place: DocumentReference<Place>) =>
  query<Keg>(
    kegCollection(place),
    where(`lastConsumptionAt`, `>=`, getSlidingWindow())
  );
