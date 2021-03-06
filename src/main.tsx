import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { type ReactNode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, FirebaseAppProvider, useFirebaseApp } from "reactfire";

import { LoadingIndicator } from "~/components/LoadingIndicator";
import "~/i18n";
import { Root } from "~/pages";
import "~/styles/index.css";

const APP_CHECK_TOKEN = `6LcR8pUcAAAAAGYjKIm5p1owwr23EpDQxbfEGlpo`;

const firebaseConfig = {
  apiKey: "AIzaSyCnlgTK7_2DyPyeAubyD-uxMlKleaSJ5Gs",
  authDomain: "beerbook2-da255.firebaseapp.com",
  projectId: "beerbook2-da255",
  storageBucket: "beerbook2-da255.appspot.com",
  messagingSenderId: "687871039584",
  appId: "1:687871039584:web:55f923926cbb2002618b05",
  measurementId: "G-RX9W09W11H",
};

const FirebaseAuthProvider = (props: { children: ReactNode }) => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  return <AuthProvider sdk={auth}>{props.children as any}</AuthProvider>;
};

const FirebaseAppCheck = () => {
  const app = useFirebaseApp();
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(APP_CHECK_TOKEN),
    isTokenAutoRefreshEnabled: true,
  });
  return null;
};

const Main = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseAuthProvider>
        <FirebaseAppCheck />
        <Suspense fallback={<LoadingIndicator />}>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </Suspense>
      </FirebaseAuthProvider>
    </FirebaseAppProvider>
  );
};

const root = createRoot(document.getElementById("app")!);
root.render(<Main />);
