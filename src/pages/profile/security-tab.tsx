import React from "react";
import type { StoreProps } from "../../undux";
import Store from "../../undux";
import { withTranslation } from "react-i18next";
import { Link } from "@reach/router";

interface IState {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  loading: boolean;
}

class SecurityTab extends React.Component<StoreProps, IState> {
  constructor(props: StoreProps) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      loading: false,
    };
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  render() {
    const { t } = this.props;
    return (
      <div className="tab-pane fade" id="v-pills-security" role="tabpanel">
        <h4>{t("pages.profile.changePassword")}</h4>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>{t("pages.profile.currentPassword")}</label>
            <input
              type="password"
              className="form-control"
              required
              value={this.state.currentPassword}
              onChange={(e) =>
                this.setState({ currentPassword: e.target.value })
              }
              autoComplete="current-password"
            />
          </div>
          <div className="form-group">
            <label>{t("pages.profile.newPassword")}</label>
            <input
              type="password"
              className="form-control"
              required
              value={this.state.newPassword}
              onChange={(e) => this.setState({ newPassword: e.target.value })}
              autoComplete="new-password"
            />
            <small className="form-text text-muted">
              {t("modals.passwordMinLength")}
            </small>
          </div>
          <div className="form-group">
            <label>{t("pages.profile.confirmNewPassword")}</label>
            <input
              type="password"
              className="form-control"
              required
              value={this.state.confirmNewPassword}
              onChange={(e) =>
                this.setState({ confirmNewPassword: e.target.value })
              }
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-primary mx-1">
            {this.state.loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              t("pages.profile.updatePassword")
            )}
          </button>
          <Link className="form-check-label mx-1" to="/forgot-password">
            {t("modals.forgotPassword")}
          </Link>
        </form>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(SecurityTab));
