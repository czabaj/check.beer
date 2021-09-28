import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { FunctionComponent } from "preact";
import { useAuth } from "reactfire";

import { Button } from "../components/Button";
import { Center } from "../components/layouts/Center";
import { Cover } from "../components/layouts/Cover";
import { Stack } from "../components/layouts/Stack";

/**
 * The login page relies completely on firebaseUI
 */
export const Login: FunctionComponent = () => {
  const auth = useAuth();
  return (
    <Cover>
      <Stack>
        <h1 className="text-center">Login</h1>
        <Center>
          <Button
            onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider());
            }}
            primary
          >
            Login with Google
          </Button>
        </Center>
      </Stack>
    </Cover>
  );
};
