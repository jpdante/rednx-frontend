import React from "react";
import { useTranslation } from "react-i18next";

import NavLink from "../sidebar/nav-link";

import styles from "./sidebar.module.scss";

function FollowingNav() {
  const { t } = useTranslation();
  return (
    <nav className={`nav flex-column ${styles.navVertical}`}>
      <p>{t("components.navbar.following")}</p>
      <li className={`${styles.navTable}`}>
        <NavLink to="/channel/pentagrama">
          <div className="float-left">
            <img
              src="https://yt3.ggpht.com/a/AATXAJyVzvS5VwifcSWwYzMSjz0SjtKCNuQ3cjcQ7Q=s288-c-k-c0xffffffff-no-rj-mo"
              width="21"
              height="21"
              className="rounded-circle mx-auto d-inline-block align-top"
              alt="Profile"
            />
            PentagramaSG
          </div>
          <div className="float-right">
            <span className="badge badge-primary">3</span>
          </div>
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/channel/mikagamer">
          <div className="float-left">
            <img
              src="https://yt3.ggpht.com/a/AATXAJxyFPzS26mEMneX4cFmE11hm2sbc9s7GOyM5g=s288-c-k-c0xffffffff-no-rj-mo"
              width="21"
              height="21"
              className="rounded-circle mx-auto d-inline-block align-top"
              alt="Profile"
            />
            MikaGamer
          </div>
          <div className="float-right">
            <span className="badge badge-primary">5</span>
          </div>
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/channel/ellisiumx">
          <div className="float-left">
            <img
              src="https://yt3.ggpht.com/-sNHMsBMptyM/AAAAAAAAAAI/AAAAAAAAAAA/vsaEYt0DpQI/s108-c-k-c0x00ffffff-no-rj-mo/photo.jpg"
              width="21"
              height="21"
              className="rounded-circle mx-auto d-inline-block align-top"
              alt="Profile"
            />
            Ellisiumx
          </div>
        </NavLink>
      </li>
      <li className={`${styles.navTable}`}>
        <NavLink to="/channel/caverinha">
          <div className="float-left">
            <img
              src="https://yt3.ggpht.com/a/AATXAJxGOgmcqR8CvdWpCMMABdif-wvgZeeE5xIeqw=s288-c-k-c0xffffffff-no-rj-mo"
              width="21"
              height="21"
              className="rounded-circle mx-auto d-inline-block align-top"
              alt="Profile"
            />
            Caverinha
          </div>
          <div className="float-right">
            <span className="badge badge-primary">7</span>
          </div>
        </NavLink>
      </li>
    </nav>
  );
}

export default FollowingNav;
