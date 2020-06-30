import React from "react";
import type { StoreProps } from "../../undux";
import Store from "../../undux";
import { withTranslation } from "react-i18next";
import { Link } from "@reach/router";
import net from "../../services/net";

interface IState {
  currentPassword: string;
  newPassword: string;
  newConfirmPassword: string;
  message: string;
  messageData: any;
  error: boolean;
  loading: boolean;
}

class SecurityTab extends React.Component<StoreProps, IState> {
  constructor(props: StoreProps) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newConfirmPassword: "",
      loading: false,
      message: "",
      messageData: null,
      error: false,
    };
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { currentPassword, newPassword, newConfirmPassword } = this.state;
    if (!currentPassword || !newPassword || !newConfirmPassword) {
      this.setState({ message: "errors.passwordEmpty", error: true });
      return;
    }
    if (newPassword !== newConfirmPassword) {
      this.setState({ message: "errors.passwordsDontMatch", error: true });
      return;
    }
    this.setState({ loading: true });
    const response = await net.post("/profile/changepassword", {
      currentPassword,
      newPassword,
      newConfirmPassword,
    });
    if (response.data.success) {
      this.setState({
        message: "successes.passwordChanged",
        messageData: response.data,
        error: false,
        currentPassword: "",
        newPassword: "",
        newConfirmPassword: "",
        loading: false,
      });
    } else {
      this.setState({
        message: response.data.message,
        messageData: response.data,
        error: true,
        loading: false,
      });
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div className="tab-pane fade" id="v-pills-security" role="tabpanel">
        <h4>{t("pages.profile.changePassword")}</h4>
        <hr />
        <form onSubmit={this.handleSubmit}>
          {this.state.message && (
            <div
              className={`alert ${
                this.state.error ? "alert-danger" : "alert-success"
              }`}
              role="alert"
            >
              {t(this.state.message, this.state.messageData)}
            </div>
          )}
          <div className="form-group">
            <label>{t("pages.profile.currentPassword")}</label>
            <input
              type="password"
              className="form-control"
              required
              minLength={8}
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
              minLength={8}
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
              minLength={8}
              value={this.state.newConfirmPassword}
              onChange={(e) =>
                this.setState({ newConfirmPassword: e.target.value })
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
