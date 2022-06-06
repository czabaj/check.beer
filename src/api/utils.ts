import { Consumption } from "~/api/models";

export const sortConsumptions = (a: Consumption, b: Consumption) =>
  a.at.seconds - b.at.seconds;

export const toConsumptionSymbol = ({ milliliters }: Consumption) =>
  milliliters >= 400 ? `X` : `I`;
