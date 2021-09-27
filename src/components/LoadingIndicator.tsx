import type { FunctionComponent } from "preact";

import { Center } from "./layouts/Center";
import { Cover } from "./layouts/Cover";

type Props = {};

export const LoadingIndicator: FunctionComponent<Props> = () => {
  return (
    <Center>
      <Cover className="text:center">
        <strong aria-busy="true" role="alert">
          Loading...
        </strong>
      </Cover>
    </Center>
  );
};
