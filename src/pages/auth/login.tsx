import React from "react";
import { withTranslation } from "react-i18next";
import api from "../../api";
import { Link, navigate } from "@reach/router";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import type { StoreProps } from "../../undux";
import Store from "../../undux";

import styles from "./auth.module.scss";

interface IState {
  email: string;
  password: string;
  error: string;
  errorData: any;
  captcha: string;
  loading: boolean;
}

class Login extends React.Component<StoreProps, IState> {
  private hCaptchaRef: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      errorData: null,
      captcha: "",
      loading: false,
    };
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    this.hCaptchaRef.current.execute();
  };

  handleVerificationSuccess = async (token: string) => {
    this.setState({
      captcha: token,
      error: "",
      loading: false,
    });
    const { email, password, captcha } = this.state;
    if (!email) {
      this.setState({ error: "errors.emailEmpty" });
      return;
    }
    if (!password) {
      this.setState({ error: "errors.passwordEmpty" });
      return;
    }
    if (!captcha) {
      this.setState({ error: "errors.invalidCaptcha" });
      return;
    }
    try {
      this.setState({ loading: true });
      const response = await api.login(email, password, captcha);
      this.setState({ loading: false });
      if (response.data.success) {
        const { auth, profile } = this.props;
        profile.set("username")(response.data.account.username);
        profile.set("picture")(response.data.account.profilePicture);
        profile.set("email")(email);
        auth.set("token")(response.data.token);
        navigate("/");
      } else {
        this.setState({
          error: response.data.message,
          errorData: response.data,
        });
      }
    } catch (err) {
      console.debug(err);
      this.setState({
        loading: false,
        error: "errors.loginError",
      });
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div className={`${styles.fixBorder} shadow mt-5`}>
        <div className={`${styles.authContainer}`}>
          <h4 className="text-center w-100">
            <span style={{ color: "#B10003" }}>Red</span>NX
          </h4>
          <div className={`${styles.bar}`}>
            <div>
              <div className={`${styles.button} ${styles.active} float-left`}>
                <Link className={`text-center`} to="/login">
                  {t("components.navbar.login")}
                </Link>
                <hr />
              </div>
              <div className={`${styles.button} float-left`}>
                <Link className={`text-center`} to="/register">
                  {t("components.navbar.register")}
                </Link>
                <hr />
              </div>
              <div className={`${styles.button} float-none`}>&nbsp;</div>
            </div>
            <hr />
          </div>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            {this.state.error && (
              <div className="alert alert-danger" role="alert">
                {t(this.state.error, this.state.errorData)}
              </div>
            )}
            <div className="form-group">
              <label>{t("modals.email")}</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder={t("modals.email")}
                required
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t("modals.password")}</label>
              <input
                type="password"
                className="form-control"
                placeholder={t("modals.password")}
                required
                minLength={8}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <small className="form-text text-muted">
                {t("modals.passwordMinLength")}
              </small>
            </div>
            <div className="form-group">
              <Link className="form-check-label" to="/forgot-password">
                {t("modals.forgotPassword")}
              </Link>
            </div>
            <div className="text-center">
              <HCaptcha
                ref={this.hCaptchaRef}
                sitekey="0bf5a996-480a-4bab-81b5-20d85f1ade44"
                theme="dark"
                size="invisible"
                onVerify={(token) => this.handleVerificationSuccess(token)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {this.state.loading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                t("components.navbar.login")
              )}
            </button>
            <div className="text-center my-3">
              <p>
                {t("hcaptcha.msg1")}{" "}
                <a href="https://hcaptcha.com/privacy">
                  {t("hcaptcha.privacyPolicy")}
                </a>{" "}
                {t("hcaptcha.msg2")}{" "}
                <a href="https://hcaptcha.com/terms">
                  {t("hcaptcha.termsOfService")}
                </a>{" "}
                {t("hcaptcha.msg3")}
              </p>
            </div>
          </form>
          <hr />
        </div>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(Login));
