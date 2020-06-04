import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";

function ButtonBar() {
  const { t } = useTranslation();
  return (
    <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
      <div className="form-inline">
        <button
          className="btn btn-sm btn-secondary mx-1"
          data-toggle="modal"
          data-target="#languageModal"
        >
          {t("components.navbar.language")}
        </button>
        <Link className={`btn btn-sm btn-secondary mx-1`} to="/login">
          {t("components.navbar.login")}
        </Link>
        <Link className={`btn btn-sm btn-primary mx-1`} to="/register">
          {t("components.navbar.register")}
        </Link>
      </div>
    </ul>
  );
}

export default ButtonBar;
