import { Stack } from "react-every-layout";
import { Logo } from "./logo";

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
    <Stack>
      {data.places["Kosovští kumpáni"].participants.map((participant) => (
        <div>{participant.name}</div>
      ))}
    </Stack>
  );
}
