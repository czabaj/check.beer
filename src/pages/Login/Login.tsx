import cx from "clsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

import buttonClasses from "~/styles/components/button.module.css";

import classes from "./Login.module.css";

/**
 * The login page relies completely on firebaseUI
 */
export const Login = () => {
  const auth = useAuth();
  return (
    <div id={classes.login}>
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
