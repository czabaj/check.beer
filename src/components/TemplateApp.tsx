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
  const menuOpenRef = useRef<HTMLButtonElement>();
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === `Escape`) menuOpenRef.current!.blur();
    };
    document.addEventListener(`keydown`, listener);
    return () => document.removeEventListener(`keydown`, listener);
  }, []);

  return (
    <div className={classes.root}>
      <header>
        <div>
          <h1>Untap.beer</h1>
          <button
            aria-hidden={true}
            className={cx(
              classes.navMenuButton,
              buttonClasses.button,
              buttonClasses.variantStealth,
              buttonClasses.flat
            )}
            ref={menuOpenRef as any}
            title="Navigační menu"
            type="button"
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
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};
