import type { Auth } from "firebase/auth";
import { Firestore, collection, query, where } from "firebase/firestore";
import { useAuth, useFirestore, useObservable } from "reactfire";
import { user } from "rxfire/auth";
import { collectionData } from "rxfire/firestore";
import { filter, map, switchMap } from "rxjs/operators";

import { User as DBUser } from "../models";

export const getDBUser$ = (auth: Auth, firestore: Firestore) =>
  user(auth)
    .pipe(filter(Boolean))
    .pipe(
      switchMap((user) =>
        collectionData(
          query<DBUser>(
            collection(firestore, `users`) as any,
            where(`email`, `==`, user.email)
          ),
          {
            idField: `email`,
          }
        )
      )
    )
    .pipe(map((users) => users[0]));

export const useDBUser = () =>
  useObservable(`useDBUser`, getDBUser$(useAuth(), useFirestore()));
