import type { FunctionComponent } from "preact";
import { Link } from "react-router-dom";

import { Button } from "../components/Button";
import { Center } from "../components/layouts/Center";
import { Cover } from "../components/layouts/Cover";
import { Stack } from "../components/layouts/Stack";
import { LOGIN } from "./routes";

export type Props = {};

export const Homepage: FunctionComponent<Props> = () => {
  return (
    <Cover>
      <Stack>
        <h1 className="text-center">Untap.beer</h1>
        <Center>
          <Link component={Button} primary to={LOGIN}>
            Do aplikace
          </Link>
        </Center>
      </Stack>
    </Cover>
  );
};
