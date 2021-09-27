import "firebase/firestore";
import { FunctionComponent, render } from "preact";
import { Suspense } from "preact/compat";
import { Route, Router } from "preact-router";
import { FirebaseAppProvider } from "reactfire";
import { RecoilRoot } from "recoil";

import { LoadingIndicator } from "./components/LoadingIndicator";
import { withRedirectAuth } from "./components/RedirectAuth";
import {
  DEFAULT_PRIVATE_ROUTE,
  LOGIN,
  PLACE,
  PROFILE,
} from "./constants/routes";
import "./styles/index";
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

const redirectAuthenticatedIntoApp = (Component: FunctionComponent<any>) =>
  withRedirectAuth({ authenticated: true, to: DEFAULT_PRIVATE_ROUTE })(
    Component
  );
const redirectUnauthenticatedToLogin = (Component: FunctionComponent<any>) =>
  withRedirectAuth({ to: LOGIN })(Component);

const Main = () => {
  return (
    <RecoilRoot>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Suspense fallback={<LoadingIndicator />}>
          <Router>
            <Route component={Index} path="/" />
            <Route
              component={redirectAuthenticatedIntoApp(Login)}
              path={LOGIN}
            />
            <Route
              component={redirectUnauthenticatedToLogin(Profile)}
              path={PROFILE}
            />
            <Route
              component={redirectUnauthenticatedToLogin(Place)}
              path={`${PLACE}/:placeId`}
            />
            <Route
              component={redirectUnauthenticatedToLogin(Place)}
              path={`${PLACE}/:placeId/:*rest`}
            />
          </Router>
        </Suspense>
      </FirebaseAppProvider>
    </RecoilRoot>
  );
};

render(<Main />, document.getElementById("app")!);
