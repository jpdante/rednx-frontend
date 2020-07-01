import React from "react";
import { withTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import type { StoreProps } from "../../undux";
import Store from "../../undux";

import styles from "./auth.module.scss";
import net from "../../services/net";
import { HCaptchaKey } from '../../constants';

interface IState {
  email: string;
  error: string;
  success: string;
  errorData: any;
  successData: any;
  captcha: string;
  loading: boolean;
}

class ForgotPassword extends React.Component<StoreProps, IState> {
  private hCaptchaRef: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      error: "",
      success: "",
      errorData: null,
      successData: null,
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
    const { email, captcha } = this.state;
    if (!email) {
      this.setState({ error: "errors.emailEmpty" });
      return;
    }
    if (!captcha) {
      this.setState({ error: "errors.invalidCaptcha" });
      return;
    }
    try {
      this.setState({ loading: true });
      const response = await net.post("/auth/forgotpassword", {
        email,
        captcha,
      });
      this.setState({ loading: false });
      if (response.data.success) {
        this.setState({
          loading: false,
          error: "",
          success: "modals.recoverRequestSent",
          successData: {email}
        });
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
              <div className={`${styles.button} ${styles.semiActive}`}>
                <Link className={`text-center`} to="/forgot-password">
                  {t("pages.auth.forgotPassword")}
                </Link>
                <hr />
              </div>
            </div>
          </div>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            {this.state.error && (
              <div className="alert alert-danger" role="alert">
                {t(this.state.error, this.state.errorData)}
              </div>
            )}
            {this.state.success && (
              <div className="alert alert-success" role="alert">
                {t(this.state.success)}
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
            <div className="text-center">
              <HCaptcha
                ref={this.hCaptchaRef}
                sitekey={HCaptchaKey}
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
                t("pages.auth.recover")
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
        </div>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(ForgotPassword));
