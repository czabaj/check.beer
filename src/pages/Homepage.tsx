import cx from "clsx";
import { Link } from "react-router-dom";

import buttonClasses from "~/styles/components/button.module.css";

import classes from "./Homepage.module.css";
import { LOGIN } from "./routes";


export const Homepage = () => {
  return (
    <div className={classes.root}>
      <div>
        <h1 className="text-center">Untap.beer</h1>
        <Link
          className={cx(buttonClasses.button, buttonClasses.variantPrimary)}
          to={LOGIN}
        >
          Do aplikace
        </Link>
      </div>
    </div>
  );
};
