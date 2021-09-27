import type { FunctionComponent } from "preact";

import { TemplateApp } from "../../components/TemplateApp";
import { UNDETERMIED, useUserData } from "../../hooks/useUserData";

export type Props = {};

export const MyPlaces: FunctionComponent<Props> = () => {
  const user = useUserData();

  return <TemplateApp pageTitle="Moje mista">Moje mista</TemplateApp>;
};
