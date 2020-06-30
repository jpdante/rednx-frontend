import React from "react";
import type { StoreProps } from "../../undux";
import Store from "../../undux";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./profile.module.scss";

interface IState {
  username: string;
  email: string;
  password: string;
  loading: boolean;
}

class ProfileTab extends React.Component<StoreProps, IState> {
  constructor(props: StoreProps) {
    super(props);
    this.state = {
      username: props.profile.get("username") || "",
      email: props.profile.get("email") || "",
      password: "",
      loading: false,
    };
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  render() {
    const { t, profile } = this.props;
    return (
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <h4>{t("pages.profile.publicProfile")}</h4>
        <hr />
        <div className="row">
          <div className="col-8">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>{t("pages.profile.username")}</label>
                &nbsp;
                <span className="badge badge-warning">{t("pages.profile.notSupported")}</span>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  autoComplete="username"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>{t("pages.profile.email")}</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label>{t("pages.profile.password")}</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  autoComplete="password"
                />
              </div>
              <button type="submit" className="btn btn-primary mx-1" disabled={profile.get("email") === this.state.email}>
                {this.state.loading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  t("pages.profile.updateProfile")
                )}
              </button>
            </form>
          </div>
          <div className="col-4">
            <div
              className={styles.profilePicture}
              data-toggle="modal"
              data-target="#uploadAvatarModal"
            >
              <div className={styles.overlay}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon="edit" size="lg" />
                </div>
              </div>
              <img
                src={`https://storage.bhs.cloud.ovh.net/v1/AUTH_d86662c318654f248055a1f464721aa8/public/pp/${profile.get(
                  "picture"
                )}.webp`}
                className="rounded mx-auto d-inline-block align-top"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(ProfileTab));
