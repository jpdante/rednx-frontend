import React from "react";
import { useTranslation } from "react-i18next";
import Store from "../../undux";

import styles from "./sidebar.module.scss";

import NavLink from "../sidebar/nav-link";
import { Channel } from "../../model";

function FollowingNav() {
  const { t } = useTranslation();
  const { profile } = Store.useStores();
  return (
    <nav className={`nav flex-column ${styles.navVertical}`}>
      <p>{t("components.navbar.following")}</p>
      {profile.get("followedChannels").map((item: Channel) => (
        <NavLink to={`/channel/${item.link}`} key={item.id}>
          <div className="float-left">
            <img
              src={`/assets/${item.picture}`}
              width="21"
              height="21"
              className="rounded-circle mx-auto d-inline-block align-top"
              alt="Profile"
            />
            {item.name}
          </div>
          {/*<div className="float-right">
            <span className="badge badge-primary">3</span>
          </div>*/}
        </NavLink>
      ))}
    </nav>
  );
}

export default FollowingNav;
