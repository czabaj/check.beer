import { css } from "@linaria/core";
import Stack from "./components/layouts/Stack";
import { Logo } from "./logo";

const appStyle = css`
  height: 100%;
  text-align: center;
  background-color: #673ab8;
  color: #fff;
  font-size: 1.5em;
  padding-top: 100px;
`

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
        {data.places["Kosovští kumpáni"].participants.map((participant) => (
          <div>{participant.name}</div>
        ))}
      </Stack>
    </div>
  );
}
