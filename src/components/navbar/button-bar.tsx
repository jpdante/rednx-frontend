/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import NavLink from "./nav-link";

function ButtonBar() {
  const { t } = useTranslation();
  return (
    <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
      <div className="visible-md">
        <li className="nav-item">
          <a className="nav-link">{t("components.navbar.language")}</a>
        </li>
        <NavLink to="/login">{t("components.navbar.login")}</NavLink>
        <NavLink to="/register">{t("components.navbar.register")}</NavLink>
      </div>
      <div className="form-inline hidden-md">
        <button
          className="btn btn-sm btn-secondary btn-block-md mx-1"
          data-toggle="modal"
          data-target="#languageModal"
        >
          {t("components.navbar.language")}
        </button>
        <Link
          className={`btn btn-sm btn-secondary btn-block-md mx-1`}
          to="/login"
        >
          {t("components.navbar.login")}
        </Link>
        <Link
          className={`btn btn-sm btn-primary btn-block-md mx-1`}
          to="/register"
        >
          {t("components.navbar.register")}
        </Link>
      </div>
    </ul>
  );
}

export default ButtonBar;
