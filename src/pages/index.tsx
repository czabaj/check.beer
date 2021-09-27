import { css } from "@linaria/core";
import type { FunctionComponent } from "preact";

import { Button } from "../components/Button";
import { Center } from "../components/layouts/Center";
import { Cover } from "../components/layouts/Cover";
import { Stack } from "../components/layouts/Stack";
import { LOGIN } from "../constants/routes";

type Props = {};

const styleStack = css`
  > * {
    text-align: center;
  }
`;

export const Index: FunctionComponent<Props> = () => {
  return (
    <Cover>
      <Stack className={styleStack}>
        <h1>Untap.beer</h1>
        <Center>
          <Button primary to={LOGIN}>
            Do aplikace
          </Button>
        </Center>
      </Stack>
    </Cover>
  );
};
