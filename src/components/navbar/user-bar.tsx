import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";

import styles from "./navbar.module.scss";

function UserBar() {
  const { t } = useTranslation();
  return (
    <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
      <li className="nav-item dropdown">
        <a
          className={`${styles.userBar} nav-link`}
          href="/"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div>
            <img
              src="http://public.tryhosting.com.br/pp/5d4221c86dc946dca206b9060543c3d5.webp"
              width="30"
              height="30"
              className="rounded mx-auto d-inline-block align-top"
              alt="Profile"
            />
          </div>
        </a>
        <div
          className={`${styles.animate} ${styles.slideIn} dropdown-menu dropdown-menu-right`}
          aria-labelledby="navbarDropdownMenuLink"
        >
          <Link className="dropdown-item" to="/profile">
            {t("components.navbar.profile")}
          </Link>
          <button
            className="dropdown-item"
            data-toggle="modal"
            data-target="#languageModal"
          >
            {t("components.navbar.language")}
          </button>
          <button className="dropdown-item">
            {t("components.navbar.logout")}
          </button>
        </div>
      </li>
    </ul>
  );
}

export default UserBar;
