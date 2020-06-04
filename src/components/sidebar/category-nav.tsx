import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavLink from "../sidebar/nav-link";

import styles from "./sidebar.module.scss";

function CategoryNav() {
  const { t } = useTranslation();
  return (
    <nav className={`nav flex-column ${styles.navVertical}`}>
      <p>{t("shared.category", { count: 2 })}</p>
      <li className={`${styles.navTable}`}>
        <NavLink to="/category/science">
          <FontAwesomeIcon icon="vial" className={styles.icon} />
          {t("shared.science")}
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/category/comedy">
          <FontAwesomeIcon icon="theater-masks" className={styles.icon} />
          {t("shared.comedy")}
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/category/games">
          <FontAwesomeIcon icon="gamepad" className={styles.icon} />
          {t("shared.games")}
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/category/vlog">
          <FontAwesomeIcon icon="camera" className={styles.icon} />
          {t("shared.vlogs")}
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/category/sports">
          <FontAwesomeIcon icon="futbol" className={styles.icon} />
          {t("shared.sports")}
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/category/education">
          <FontAwesomeIcon icon="graduation-cap" className={styles.icon} />
          {t("shared.education")}
        </NavLink>
      </li>
    </nav>
  );
}

export default CategoryNav;
