/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import Store from "../../undux";

import styles from "./navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserBar() {
  const { t } = useTranslation();
  let stores = Store.useStores();

  async function logout() {
    stores.auth.set("token")(null);
  }

  return (
    <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
      <li className="nav-item mr-3">
        <a
          className="nav-link active"
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon="bell" />
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className={`${styles.userBar} nav-link`}
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className={styles.profileIcon}>
            <img
              src={`https://storage.bhs.cloud.ovh.net/v1/AUTH_d86662c318654f248055a1f464721aa8/public/pp/${stores.profile.get(
                "picture"
              )}.webp`}
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
          <Link className="dropdown-item" to="/dashboard">
            {t("components.navbar.dashboard")}
          </Link>
          <Link className="dropdown-item" to="/profile">
            {t("components.navbar.profile")}
          </Link>
          <hr />
          <button
            className="dropdown-item"
            data-toggle="modal"
            data-target="#languageModal"
          >
            {t("components.navbar.language")}
          </button>
          <button className="dropdown-item" onClick={logout}>
            {t("components.navbar.logout")}
          </button>
        </div>
      </li>
    </ul>
  );
}

export default UserBar;
