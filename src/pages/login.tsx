import firebase from "firebase";
import { auth as firebaseAuthUI } from "firebaseui";
import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useAuth } from "reactfire";

import { LoadingIndicator } from "../components/LoadingIndicator";
import { DEFAULT_PRIVATE_ROUTE } from "../constants/routes";

const LOGIN_CONTENT_ID = `login_content`;

type Props = {};

/**
 * The login page relies completely on firebaseUI
 */
export const Login: FunctionComponent<Props> = () => {
  const auth = useAuth();
  useEffect(() => {
    const ui = new firebaseAuthUI.AuthUI(auth);
    ui.start(`#${LOGIN_CONTENT_ID}`, {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: DEFAULT_PRIVATE_ROUTE,
    });
  }, []);
  return (
    <div id={LOGIN_CONTENT_ID}>
      <LoadingIndicator />
    </div>
  );
};
