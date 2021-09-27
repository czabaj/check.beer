import { css, cx } from "@linaria/core";
import * as dayjs from "dayjs";
import {
  query,
  collection,
  where,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import throttle from "lodash/throttle";
import type { FunctionComponent } from "preact";
import { useFirestoreCollectionData } from "reactfire";

import { Button } from "../../components/Button";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Cluster } from "../../components/layouts/Cluster";
import { TemplateApp } from "../../components/TemplateApp";
import type { Consumption, Keg, Place } from "../../models";

const stylePersonListItemBase = css`
  font-size: 120%;
  padding: 0 var(--s-1);
  position: relative;
  &::before {
    background-color: dodgerblue;
    bottom: -1px;
    content: "";
    left: 0;
    position: absolute;
    top: 0;
    width: calc(var(--s-1) + 1.5ch);
  }
  & > span:first-child {
    z-index: 1;
    &::first-letter {
      color: white;
      font-weight: bold;
    }
  }
  & > span:last-child {
    font-style: italic;
  }
`;

const sortConsumptions = (a: Consumption, b: Consumption) =>
  a.at.seconds - b.at.seconds;
const toConsumptionSymbol = ({ milliliters }: Consumption) =>
  milliliters >= 400 ? `X` : `I`;

type PersonListItemProps = {
  recentConsumptions: Consumption[];
  name: string;
};

const PersonListItem = (props: PersonListItemProps) => {
  const consumedMillilitersByDateAsc = props.recentConsumptions
    .sort(sortConsumptions)
    .map(toConsumptionSymbol);
  return (
    <Cluster
      as="li"
      className={stylePersonListItemBase}
      justify="space-between"
    >
      <span>{props.name}</span>
      <span>{consumedMillilitersByDateAsc.join(``)}</span>
    </Cluster>
  );
};

const stylePlaceOrderedList = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-indent: 0;
`;

const styleAddActiveUser = css`
  --height: calc(2.5ch + var(--s1));
  border-radius: calc(var(--height) * 0.5);
  bottom: var(--s-2);
  display: inline-block;
  font-size: 200%;
  height: var(--height);
  line-height: var(--height);
  min-width: var(--height);
  padding: 0 var(--s1);
  position: fixed;
  font-weight: 700;
  right: var(--s-2);
  & > :first-child {
    position: relative;
    bottom: 0.125rem;
  }
`;

const UPDATE_EVERY = 60 * 60 * 1000; // milliseconds
const getSlidingWindow = throttle((): Timestamp => {
  const fetchKegsWithConsumptionFrom = dayjs()
    .subtract(1, `month`)
    .startOf(`day`); // align to start of the unit - improves caching
  return Timestamp.fromMillis(fetchKegsWithConsumptionFrom.valueOf());
}, UPDATE_EVERY);

type OverviewProps = {
  place: Place;
  placeRef: DocumentReference;
};

export const Overview: FunctionComponent<OverviewProps> = ({
  place,
  placeRef,
}) => {
  const recentKegsRef = query<Keg>(
    collection(placeRef, `kegs`) as any,
    where(`lastConsumptionAt`, `>=`, getSlidingWindow())
  );
  const { data: kegs, status } = useFirestoreCollectionData<Keg>(recentKegsRef);
  console.log(`data`, { place, kegs });
  if (!kegs) {
    return <LoadingIndicator />;
  }
  const activePersons = [] as string[];
  const consumptionPerPerson = {} as Record<
    typeof activePersons[number],
    Consumption[]
  >;
  for (const [name, active] of Object.entries(place.persons)) {
    if (active) {
      activePersons.push(name);
      consumptionPerPerson[name] = [];
    }
  }
  for (const { consumptions } of kegs) {
    for (const consumption of consumptions) {
      consumptionPerPerson[consumption.person]?.push(consumption);
    }
  }
  return (
    <TemplateApp pageTitle={place.name}>
      <ol className={stylePlaceOrderedList}>
        {activePersons.sort().map((personName) => (
          <PersonListItem
            recentConsumptions={consumptionPerPerson[personName]}
            name={personName}
          />
        ))}
      </ol>
      <Button
        className={styleAddActiveUser}
        to={`/misto/${placeRef.id}/nova-osoba`}
      >
        <span>+</span>
        <span className="hide-visually"> přidat dalšího uživatele</span>
      </Button>
    </TemplateApp>
  );
};
