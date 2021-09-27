import { getAuth } from "firebase/auth";
import { FunctionComponent, render } from "preact";
import { Suspense } from "preact/compat";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, FirebaseAppProvider, useFirebaseApp } from "reactfire";

import { LoadingIndicator } from "./components/LoadingIndicator";
import "./styles/index";
import { Root } from "./pages";

const firebaseConfig = {
  apiKey: "AIzaSyCnlgTK7_2DyPyeAubyD-uxMlKleaSJ5Gs",
  authDomain: "beerbook2-da255.firebaseapp.com",
  projectId: "beerbook2-da255",
  storageBucket: "beerbook2-da255.appspot.com",
  messagingSenderId: "687871039584",
  appId: "1:687871039584:web:55f923926cbb2002618b05",
  measurementId: "G-RX9W09W11H",
};

const FirebaseAuthProvider: FunctionComponent = ({ children }) => {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};

const Main = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseAuthProvider>
        <Suspense fallback={<LoadingIndicator />}>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </Suspense>
      </FirebaseAuthProvider>
    </FirebaseAppProvider>
  );
};

render(<Main />, document.getElementById("app")!);
