/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "@reach/router";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import type { StoreProps } from "../../undux";
import Store from "../../undux";

import styles from "./auth.module.scss";
import { getLanguage } from "../../services/language";
import net from "../../services/net";

interface IState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  error: string;
  success: string;
  errorData: any;
  captcha: string;
  loading: boolean;
  birthDate: Date | null;
}

class Register extends React.Component<StoreProps, IState> {
  private hCaptchaRef: any = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      success: "",
      error: "",
      errorData: null,
      captcha: "",
      loading: false,
      birthDate: new Date(),
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
    const {
      username,
      email,
      password,
      confirmPassword,
      birthDate,
      captcha,
    } = this.state;
    if (!username) {
      this.setState({
        error: "errors.usernameEmpty",
        success: "",
      });
      return;
    }
    if (/^[a-zA-Z0-9_.-]*$/.test(username) === false) {
      this.setState({
        error: "errors.usernameInvalid",
        success: "",
      });
      return;
    }
    if (username.length < 3 || username.length > 20) {
      this.setState({
        error: "errors.usernameSize",
        success: "",
      });
      return;
    }
    if (!email) {
      this.setState({
        error: "errors.emailEmpty",
        success: "",
      });
      return;
    }
    if (!password) {
      this.setState({
        error: "errors.passwordEmpty",
        success: "",
      });
      return;
    }
    if (!confirmPassword) {
      this.setState({
        error: "errors.confirmPasswordEmpty",
        success: "",
      });
      return;
    }
    if (password !== confirmPassword) {
      this.setState({
        error: "errors.passwordsDontMatch",
        success: "",
      });
      return;
    }
    if (!birthDate) {
      this.setState({
        error: "errors.birthDateEmpty",
        success: "",
      });
      return;
    }
    try {
      this.setState({ loading: true });
      const response = await net.post("/auth/register", {
        username,
        email,
        password,
        confirmPassword,
        birthDate: birthDate.getTime() / 1000,
        captcha,
        lang: getLanguage()
      });
      this.setState({ loading: false });
      if (response.data.success) {
        this.setState({
          loading: false,
          error: "",
          success: "modals.accountCreated",
        });
      } else {
        this.setState({
          loading: false,
          error: response.data.message,
          errorData: response.data,
          success: "",
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
        error: "errors.loginError",
        success: "",
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
            <div className="">
              <div className={`${styles.button} float-left`}>
                <Link className={`text-center`} to="/login">
                  {t("components.navbar.login")}
                </Link>
                <hr />
              </div>
              <div className={`${styles.button} ${styles.active} float-left`}>
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
            {this.state.success && (
              <div className="alert alert-success" role="alert">
                {t(this.state.success)}
              </div>
            )}
            <div className="form-group">
              <label>{t("modals.username")}</label>
              <input
                type="username"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder={t("modals.username")}
                required
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>{t("modals.email")}</label>
              <input
                type="email"
                className="form-control"
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
                aria-describedby="passwordHelp"
                required
                minLength={8}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <small className="form-text text-muted">
                {t("modals.passwordMinLength")}
              </small>
            </div>
            <div className="form-group">
              <label>{t("modals.confirmPassword")}</label>
              <input
                type="password"
                className="form-control"
                placeholder={t("modals.password")}
                required
                minLength={8}
                onChange={(e) =>
                  this.setState({ confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>{t("modals.birthDate")}</label>
              <DatePicker
                selected={this.state.birthDate}
                onChange={(date) => this.setState({ birthDate: date })}
                maxDate={new Date()}
                className={`form-control ${styles.birthDateForm}`}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
              />
            </div>
            <div className="form-group">
              <Link className="form-check-label" to="/login">
                {t("modals.alreadyHasAccount")}
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
                t("components.navbar.register")
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

export default Store.withStores(withTranslation()(Register));
