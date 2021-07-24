import { css } from "@linaria/core";
import Center from "./components/layouts/Center";
import Cluster from "./components/layouts/Cluster";
import Stack from "./components/layouts/Stack";
import { Logo } from "./logo";

const appStyle = css`
  height: 100%;
  text-align: center;
  background-color: #673ab8;
  color: #fff;
  font-size: 1.5em;
  padding-top: 100px;
`;

const data = {
  places: {
    "Kosovští kumpáni": {
      participants: [
        { name: "Lubík", user: "prvni@telefonni" },
        { name: "Kamílo" },
        { name: "Míla" },
        { name: "Honzík" },
      ],
      kegs: {
        uuid1: {},
      },
    },
  },
  users: {
    "prvni@telefonni": {
      name: "Lubík",
      places: { "Kosovští kumpáni": true },
    },
  },
};

export function App() {
  return (
    <div className={appStyle}>
      <Stack>
        <Cluster as="header" justify="space-between">
          <Cluster>
            <div>Zpět</div>
            <h2>Titulek stranky</h2>
          </Cluster>
          <Stack as="nav">
            <a href="#">Nastavení místa</a>
            <a href="#">Statistiky</a>
            <a href="#">Moje konto</a>
            <a href="#">Jinam</a>
          </Stack>
        </Cluster>
        <Center>
          <Stack>
            {data.places["Kosovští kumpáni"].participants.map((participant) => (
              <div>{participant.name}</div>
            ))}
          </Stack>
        </Center>
      </Stack>
    </div>
  );
}
