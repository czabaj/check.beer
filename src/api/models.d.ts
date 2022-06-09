import { DocumentReference, Timestamp } from "firebase/firestore";

/**
 * All volume units are represented as integer of milliliters
 */
export type MillilitersInteger = number;
type PersonName = string;
type PersonUID = string;
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

export type PersonShort = {
  id: PersonUID;
  lastSeen: Timestamp;
  name: PersonName;
  preferredTap?: TapName;
};

export type Person = {
  account?: DocumentReference<CurrentUser>;
  balance: number;
  created: Timestamp;
  name: string;
  transactions: FinancialTransaction[];
};

export type Consumption = {
  at: Timestamp;
  milliliters: MillilitersInteger;
  person: DocumentReference<Person>;
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

export type Place = {
  currency: string;
  established: Timestamp;
  name: string;
  personsAll: Record<PersonUID, [PersonName, Timestamp, TapName | undefined]>;
  taps: Record<TapName, DocumentReference<Keg> | null>;
};

export type CurrentUser = {
  email: string;
  name: string;
  places: Record<string, string>;
};
