import { Auth, User } from "firebase/auth";
import {
  collection,
  getDocFromCache,
  getDocFromServer,
  getDocsFromCache,
  getDocsFromServer,
  query,
  type CollectionReference,
  type DocumentReference,
  type DocumentSnapshot,
  type Firestore,
  type Query,
  type QuerySnapshot,
  type QueryDocumentSnapshot,
  where,
  addDoc,
  updateDoc,
  Timestamp,
  doc,
} from "firebase/firestore";
import { head, throttle } from "lodash/fp";
import { user } from "rxfire/auth";
import { collectionData } from "rxfire/firestore";
import { filter, map, switchMap } from "rxjs/operators";
import { Temporal } from "temporal-polyfill";

import { CurrentUser, Keg, Person, Place } from "~/api/models";
import { firstBumpedTapOrFirstTapName } from "~/api/utils";

const getDocsFromCacheFirst = <T>(query: Query<T>): Promise<QuerySnapshot<T>> =>
  getDocsFromCache(query).catch(() => getDocsFromServer(query));

const getDocFromCacheFirst = <T>(
  reference: DocumentReference<T>
): Promise<DocumentSnapshot<T>> =>
  getDocFromCache(reference).catch(() => getDocFromServer(reference));

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

export const placePersonsCollection = (
  firestore: Firestore,
  placeId: string
): CollectionReference<Person> =>
  collection(firestore, `places`, placeId, `persons`) as any;

export const placeDoc = (
  firestore: Firestore,
  placeId: string
): DocumentReference<Place> => doc(firestore, `places`, placeId) as any;

export const placeAdd = async (
  firestore: Firestore,
  user: User,
  place: Pick<Place, `name`>
): Promise<DocumentReference<Place>> => {
  const currentUser = await currentUserDoc(firestore, user);
  const currentUserName = currentUser.data().name;
  const mainTapName = "Pípa 1";
  const newPlaceData: Place = {
    ...place,
    currency: `CZK`,
    established: Timestamp.fromMillis(Date.now()),
    personsAll: {},
    taps: { [mainTapName]: null },
  };
  const newPlace = await addDoc(placeCollection(firestore), newPlaceData);
  await Promise.all([
    placePersonAdd(firestore, newPlace, {
      account: currentUser.ref,
      name: currentUserName,
    }),
    updateDoc(currentUser.ref, `places.${newPlace.id}`, newPlaceData.name),
  ]);
  return newPlace;
};

export const placePersonAdd = async (
  firestore: Firestore,
  place: DocumentReference<Place>,
  person: Pick<Person, `account` | `name`>
): Promise<DocumentReference<Person>> => {
  const newPersonName = person.name;
  const placeData = await getDocFromCacheFirst(place);
  const nameAlreadyTaken = Object.values(placeData.data()!.personsAll).some(
    ([name]) => name === newPersonName
  );
  if (nameAlreadyTaken) throw new Error(`Name already taken.`);
  const now = Timestamp.fromMillis(Date.now());
  const newPersonData: Person = {
    ...person,
    balance: 0,
    created: now,
    transactions: [],
  };
  const newPerson = await addDoc(
    placePersonsCollection(firestore, place.id),
    newPersonData
  );
  const preferredTapName = firstBumpedTapOrFirstTapName(placeData.data()!.taps);
  await updateDoc(place, `personsAll.${newPerson.id}`, [
    newPersonData.name,
    now,
    preferredTapName,
  ]);
  return newPerson;
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
