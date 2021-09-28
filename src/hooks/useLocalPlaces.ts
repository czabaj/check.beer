import { User } from "../models";
import { useLocalStorage } from "./useLocalStorage";

export const LOCAL_PLACES = `localPlaces`;

export const useLocalPlaces = () =>
  useLocalStorage<User[`places`] | undefined>(LOCAL_PLACES, undefined);
