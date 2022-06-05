import { DocumentReference, Timestamp } from "firebase/firestore";

/**
 * All volume units are represented as integer of milliliters
 */
export type MillilitersInteger = number;
/**
 * Used as a key in Place.persons, thus must be unique per Place. Used as an
 * identifier in related Consumption and as a key for PersonalAccount document,
 * cannot be changed or removed when user has a historic Consumption or
 * accounting transaction (the personal account is created as soon as person
 * puts some money into the place or when the Keg where she had a Consumption
 * is accounted upon finishing).
 */
type PersonName = string;
/**
 * Used as a key in Place.taps, thus must be unique per Place. Can be changed.
 */
type TapName = string;

export type FinancialTransaction = {
  amount: number;
  at: Timestamp;
  keg?: DocumentReference<Keg>;
  note: string;
};

export type PersonalAccount = {
  balance: number;
  transactions: FinancialTransaction[];
};

export type Consumption = {
  at: Timestamp;
  milliliters: MillilitersInteger;
  person: PersonName;
};

export type Keg = {
  beer: string;
  consumptions: Consumption[];
  createdAt: Timestamp;
  finishedAt?: Timestamp;
  lastConsumptionAt?: Timestamp;
  milliliters: MillilitersInteger;
  priceEnd: number;
  priceNew: number;
};

type PersonIsActive = boolean;
export type Place = {
  established: Timestamp;
  name: string;
  persons: Record<PersonName, PersonIsActive>;
  taps: Record<TapName, DocumentReference<Keg> | null>;
};

export type CurrentUser = {
  email: string;
  name: string;
  places: Record<string, string>;
};
