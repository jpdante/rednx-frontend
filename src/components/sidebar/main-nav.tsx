import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavLink from "../sidebar/nav-link";

import styles from "./sidebar.module.scss";

function MainNav() {
  const { t } = useTranslation();
  return (
    <nav className={`nav flex-column ${styles.navVertical}`}>
      <li className={styles.navTable}>
        <NavLink to="/hot">
          <FontAwesomeIcon icon="fire" /> {t("components.navbar.hot")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/recommended">
          <FontAwesomeIcon icon="thumbs-up" /> {t("shared.recommended")}
        </NavLink>
      </li>
      <li className={styles.navTable}>
        <NavLink to="/live">
          <FontAwesomeIcon icon="satellite-dish" />{" "}
          {t("components.navbar.live")}
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/following">
          <FontAwesomeIcon icon="heart" className={styles.icon} />{" "}
          {t("components.navbar.following")}
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/history">
          <FontAwesomeIcon icon="history" className={styles.icon} />{" "}
          {t("components.navbar.history")}
        </NavLink>
      </li>
    </nav>
  );
}

export default MainNav;
