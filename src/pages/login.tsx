import cx from "clsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { FunctionComponent } from "preact";

import { useAuth } from "reactfire";
import buttonClasses from "../styles/components/button.module.css";


/**
 * The login page relies completely on firebaseUI
 */
export const Login: FunctionComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <h1 className="text-center">Login</h1>
      <button
      className={cx(buttonClasses.button, buttonClasses.variantPrimary)}
        onClick={() => {
          signInWithPopup(auth, new GoogleAuthProvider());
        }}
      >
        Login with Google
      </button>
    </div>
  );
};
