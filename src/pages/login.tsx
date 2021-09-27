import firebase from "firebase";
import { auth as firebaseAuthUI } from "firebaseui";
import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useAuth } from "reactfire";

import { LoadingIndicator } from "../components/LoadingIndicator";
import { RedirectAuth } from "../components/RedirectAuth";
const LOGIN_CONTENT_ID = `login_content`;

type Props = {
  foo?: string;
};

const LoginContent: FunctionComponent<Props> = ({ foo = `bar` }) => {
  const auth = useAuth();
  useEffect(() => {
    const ui = new firebaseAuthUI.AuthUI(auth);
    ui.start(`#${LOGIN_CONTENT_ID}`, {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: `/place/QhKiv2azHaO8l6dwrty2/`,
    });
  }, []);
  return (
    <div id={LOGIN_CONTENT_ID}>
      <LoadingIndicator />
    </div>
  );
};

export const Login: FunctionComponent<Props> = (props) => (
  <RedirectAuth authenticated to="/profil">
    <LoginContent {...props} />
  </RedirectAuth>
);
