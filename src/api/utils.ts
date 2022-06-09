import { Consumption, PersonShort, Place } from "~/api/models";

export const sortConsumptions = (a: Consumption, b: Consumption) =>
  a.at.seconds - b.at.seconds;

export const toConsumptionSymbol = ({ milliliters }: Consumption) =>
  milliliters >= 400 ? `X` : `I`;

export const firstBumpedTapOrFirstTapName = (taps: Place[`taps`]): string => {
  const tapsEntries = Object.entries(taps);
  const firstBumpedTap = tapsEntries.find(([, keg]) => keg);
  return (firstBumpedTap || tapsEntries[0])[0];
};

export const placePersonsShort = (
  personsAll: Place[`personsAll`]
): PersonShort[] => {
  return Object.entries(personsAll).map(
    ([id, [name, lastSeen, preferredTap]]) => ({
      id,
      name,
      lastSeen,
      preferredTap,
    })
  );
};
