import { ReactComponent as IconBars } from "@fortawesome/fontawesome-free/svgs/solid/bars.svg";
import { ReactComponent as IconTimes } from "@fortawesome/fontawesome-free/svgs/solid/times.svg";
import cx from "clsx";
import type {
  ComponentChild,
  ComponentChildren,
  FunctionComponent,
} from "preact";
import { useEffect } from "preact/hooks";
import { NavLink, useLocation, useHistory } from "react-router-dom";

import { PROFILE } from "../pages/routes";
import { ROOT as PLACE_ROOT } from "../pages/place/routes";
import buttonClasses from "../styles/components/button.module.css";
import classes from "./TemplateApp.module.css";
import React from "preact/compat";
import { Icon } from "./layouts/Icon";

const NAV_ID = `nav_menu`;
const NAV_LABEL_ID = `nav_menu_label`;
const NAV_TARGET = `#${NAV_ID}`;

export type Props = {
  children: ComponentChildren;
};

export const TemplateApp: FunctionComponent<Props> = ({ children }) => {
  const history = useHistory();
  const closeMenu = history.goBack;
  const location = useLocation();
  const menuOpen = location.hash === NAV_TARGET;
  useEffect(() => {
    // allow close the menu with Escape
    if (menuOpen) {
      const type = `keydown`;
      const handler = (event: KeyboardEvent) => {
        if (
          event.key === `Escape` &&
          !event.defaultPrevented &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey
        ) {
          closeMenu();
        }
      };
      document.addEventListener(type, handler);
      return () => document.removeEventListener(type, handler);
    }
  }, [menuOpen]);
  return (
    <div className={classes.root}>
      <header>
        <div>
          <h1>Untap.beer</h1>

          {menuOpen ? (
            <button
              className={cx(
                buttonClasses.button,
                buttonClasses.variantStealth,
                buttonClasses.flat
              )}
              onClick={closeMenu}
              title="Zpět na obsah"
            >
              <Icon icon={IconTimes} height="2rem" />
            </button>
          ) : (
            <a
              className={cx(
                buttonClasses.button,
                buttonClasses.variantStealth,
                buttonClasses.flat
              )}
              href={NAV_TARGET}
              title="Navigační menu"
            >
              <Icon icon={IconBars} height="2rem" />
            </a>
          )}
        </div>
      </header>
      <nav aria-labelledby={NAV_LABEL_ID} id={NAV_ID}>
        <h2 className="visually-hidden">Hlavní rozcestník</h2>
        <ul>
          <li>
            <NavLink to={PROFILE}>Moje nastavení</NavLink>
          </li>
          <li>
            <NavLink to={PLACE_ROOT}>Jinam</NavLink>
          </li>
          <li>
            <button onClick={closeMenu}>Zavřít</button>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};
