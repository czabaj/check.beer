import type { FunctionComponent } from "preact";

import { Button } from "../components/Button";
import { Center } from "../components/layouts/Center";
import { Cover } from "../components/layouts/Cover";
import { Stack } from "../components/layouts/Stack";
import { LOGIN } from "../constants/routes";

type Props = {};

export const Index: FunctionComponent<Props> = () => {
  return (
    <Cover>
      <Stack>
        <h1 className="text-center">Untap.beer</h1>
        <Center>
          <Button primary to={LOGIN}>
            Do aplikace
          </Button>
        </Center>
      </Stack>
    </Cover>
  );
};
