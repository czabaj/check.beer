import { ReactComponent as IconBars } from "@fortawesome/fontawesome-free/svgs/solid/bars.svg";
import { ReactComponent as IconTimes } from "@fortawesome/fontawesome-free/svgs/solid/times.svg";
import { css } from "@linaria/core";
import type {
  ComponentChild,
  ComponentChildren,
  FunctionComponent,
} from "preact";
import { NavLink, useLocation, useHistory } from "react-router-dom";

import { Button } from "./Button";
import { Touchable } from "./Touchable";
import { Center } from "./layouts/Center";
import { Cluster } from "./layouts/Cluster";
import { Icon } from "./layouts/Icon";
import { Stack } from "./layouts/Stack";
import { resetList, visuallyHidden } from "../styles/tools";
import { PROFILE } from "../pages/routes";
import { ROOT as PLACE_ROOT } from "../pages/place/routes";

const NAV_ID = `nav_menu`;
const NAV_LABEL_ID = `nav_menu_label`;
const NAV_TARGET = `#${NAV_ID}`;

const styleHeader = css`
  padding: var(--s-1);
  & > h1 {
    font-size: 1.5rem;
    margin: 0;
    text-decoration: underline;
  }
`;

const styleNav = css`
  :not(:target) {
    ${visuallyHidden}
  }
  :target + main {
    ${visuallyHidden}
  }
  ul {
    ${resetList}
  }
  li {
    padding: var(--s-1) var(--s-1);
  }
`;

export type Props = {
  children: ComponentChildren;
  pageTitle: ComponentChild;
};

export const TemplateApp: FunctionComponent<Props> = ({
  children,
  pageTitle,
}) => {
  const history = useHistory();
  const location = useLocation();
  const menuOpen = location.hash === NAV_TARGET;
  return (
    <Center>
      <Stack as="article">
        <Cluster as="header" className={styleHeader} justify="space-between">
          <h1>{pageTitle}</h1>
          {menuOpen ? (
            <Touchable className="align-self:center" onClick={history.goBack}>
              <Icon icon={IconTimes} height="2rem" />
              <span className="visually-hidden">Zpět na obsah</span>
            </Touchable>
          ) : (
            <Touchable className="align-self:center" href={NAV_TARGET}>
              <Icon icon={IconBars} height="2rem" />
              <span className="visually-hidden">Navigační menu</span>
            </Touchable>
          )}
        </Cluster>
        <nav aria-labelledby={NAV_LABEL_ID} className={styleNav} id={NAV_ID}>
          <h2 className="visually-hidden">Hlavní rozcestník</h2>
          <ul>
            <li>
              <NavLink component={Touchable} to={PROFILE}>
                Moje nastavení
              </NavLink>
            </li>
            <li>
              <NavLink component={Touchable} to={PLACE_ROOT}>
                Jinam
              </NavLink>
            </li>
            <li>
              <Button onClick={history.goBack}>Zavřít</Button>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </Stack>
    </Center>
  );
};
