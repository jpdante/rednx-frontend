import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import Store from "../../undux";

import styles from "./navbar.module.scss";

function UserBar() {
  const { t } = useTranslation();
  let stores = Store.useStores();

  async function logout() {
    stores.auth.set("token")(null);
  }

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
              src={`http://s3.tryhosting.com.br/pp/${stores.profile.get(
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
          <button className="dropdown-item" onClick={logout}>
            {t("components.navbar.logout")}
          </button>
        </div>
      </li>
    </ul>
  );
}

export default UserBar;
