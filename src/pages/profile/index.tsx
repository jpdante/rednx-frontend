import React from "react";
import type { StoreProps } from "../../undux";
import Store from "../../undux";
import { withTranslation } from "react-i18next";
import ProfileTab from "./profile-tab";
import SecurityTab from "./security-tab";
import SettingsTabs from "./settings-tab";

interface IState {
  username: string;
  email: string;
};

class Profile extends React.Component<StoreProps, IState> {
  render() {
    const { t } = this.props;
    return (
      <div className="container mt-2">
        <div className="row">
          <div className="col mt-2">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className="nav-link active"
                id="v-pills-profile-tab"
                data-toggle="pill"
                href="#v-pills-profile"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="true"
              >
                {t("pages.profile.profile")}
              </a>
              <a
                className="nav-link"
                id="v-pills-security-tab"
                data-toggle="pill"
                href="#v-pills-security"
                role="tab"
                aria-controls="v-pills-security"
                aria-selected="false"
              >
                {t("pages.profile.security")}
              </a>
              <a
                className="nav-link"
                id="v-pills-settings-tab"
                data-toggle="pill"
                href="#v-pills-settings"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
              >
                {t("pages.profile.settings")}
              </a>
            </div>
          </div>
          <div className="col-10 mt-2">
            <div className="tab-content" id="v-pills-tabContent">
              <ProfileTab />
              <SecurityTab />
              <SettingsTabs />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(Profile));
