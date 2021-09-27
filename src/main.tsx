import "firebase/firestore";
import "normalize.css";
import { render } from "preact";
import { Suspense } from "preact/compat";
import { Route, Router } from "preact-router";
import { FirebaseAppProvider } from "reactfire";
import { RecoilRoot } from "recoil";

import LoadingIndicator from "./components/LoadingIndicator";
import "./css/global.css";
import "./css/utils.css";
import { Index } from "./pages/index";
import { Login } from "./pages/login";
import { Place } from "./pages/place";
import { Profile } from "./pages/profile";

const firebaseConfig = {
  apiKey: "AIzaSyCnlgTK7_2DyPyeAubyD-uxMlKleaSJ5Gs",
  authDomain: "beerbook2-da255.firebaseapp.com",
  projectId: "beerbook2-da255",
  storageBucket: "beerbook2-da255.appspot.com",
  messagingSenderId: "687871039584",
  appId: "1:687871039584:web:55f923926cbb2002618b05",
  measurementId: "G-RX9W09W11H",
};

const Main = () => {
  return (
    <RecoilRoot>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Suspense fallback={<LoadingIndicator />}>
          <Router>
            <Route component={Index} path="/" />
            <Route component={Login} path="/prihlaseni" />
            <Route component={Profile} path="/profil" />
            <Route component={Place} path="/misto/:placeId" />
            <Route component={Place} path="/misto/:placeId/:*rest" />
          </Router>
        </Suspense>
      </FirebaseAppProvider>
    </RecoilRoot>
  );
};

render(<Main />, document.getElementById("app")!);
