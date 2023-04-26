import cx from "clsx";
import { type ReactNode, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import { ROOT as PLACE_ROOT } from "~/pages/place/routes";
import { PROFILE } from "~/pages/routes";
import buttonClasses from "~/styles/components/button.module.css";

import classes from "./TemplateApp.module.css";

export type TemplateProps = {
  children: ReactNode;
};

export const TemplateApp = ({ children }: TemplateProps) => {
  return (
    <>
      <header className={classes.header}>
        <div>
          <h1>Untap.beer</h1>
          <details className={classes.navMenuButton}>
            <summary
              className={cx(
                buttonClasses.button,
                buttonClasses.variantStealth,
                buttonClasses.flat
              )}
              title="Navigační menu"
            />
            <nav>
              <div>Hlavní rozcestník</div>
              <ul>
                <li>
                  <NavLink to={PROFILE}>Moje nastavení</NavLink>
                </li>
                <li>
                  <NavLink to={PLACE_ROOT}>Jinam</NavLink>
                </li>
                <li>
                  <button type="button">Zavřít</button>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </header>
      <main className={classes.main}>{children}</main>
    </>
  );
};
