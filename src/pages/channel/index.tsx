import React from "react";

import Loading from "../../components/loading";
import { withTranslation } from "react-i18next";
import type { StoreProps } from "../../undux";
import Store from "../../undux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@reach/router";

import styles from "./channel.module.scss";
import net from "../../services/net";

interface IProps extends StoreProps {
  link?: string;
}

interface IState {
  loading: boolean;
  channel: {
    id: string;
    picture: string;
    link: string;
    name: string;
    following: boolean;
    followers: number;
  };
  following: boolean;
}

class Channel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      channel: {
        id: "",
        picture: "",
        link: "",
        name: "",
        following: false,
        followers: 0,
      },
      following: false,
    };
  }

  async componentWillReceiveProps(nextProps: IProps) {
    await this.loadChannel(nextProps.link || "");
  }

  async componentDidMount() {
    await this.loadChannel(this.props.link || "");
  }

  async loadChannel(link: string) {
    const response = await net.post("/channel/get", {
      link,
    });
    if (response.data.success) {
      this.setState({
        loading: false,
        channel: response.data.channel,
      });
    } else {
      console.error("Failed to get channel '" + this.state.channel.link + "'");
      this.setState({
        loading: true,
        channel: {
          id: "",
          name: "",
          link: "",
          picture: "",
          followers: 0,
          following: false,
        },
        following: false,
      });
    }
  }

  follow = async (e: any) => {
    e.preventDefault();
    if (!this.props.auth.get("isLogged")) return;
    const { channel, following } = this.state;
    if (channel === undefined || channel === null) return;
    if (following) {
      this.setState({
        following: false,
      });
      await net.post("/channel/follow", {
        id: channel.id,
        value: false,
      });
    } else {
      this.setState({
        following: true,
      });
      await net.post("/channel/follow", {
        id: channel.id,
        value: true,
      });
    }
  };

  numberToText(views: number, t: any) {
    if (views > 999_999_999) {
      return t("numbers.billionMinify", {
        count: (views / 1_000_000_000).toFixed(1),
      });
    } else if (views > 999_999) {
      return t("numbers.millionMinify", {
        count: (views / 1_000_000).toFixed(1),
      });
    } else if (views > 999) {
      return t("numbers.thousandMinify", { count: (views / 1_000).toFixed(1) });
    } else {
      return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }

  render() {
    const { t, auth } = this.props;
    if (this.state.loading) {
      return <Loading isPageContent={true} />;
    }
    return (
      <div className={styles.contentPadding}>
        <div className={styles.channelMenu}>
          <div className={`row`}>
            <div className={`${styles.channelLogo} col-lg-12 col-xl-6`}>
              <img
                src={`/assets/${this.state.channel.picture}`}
                alt="Avatar do Canal"
              />
              <div className={styles.channelNameContainer}>
                <div className={styles.channelName}>
                  <Link to={`/channel/${this.state.channel.link}`}>
                    {this.state.channel.name}
                  </Link>
                </div>
                <div className={styles.channelFollowers}>
                  {t("pages.watch.followers", {
                    countText: this.numberToText(
                      this.state.channel.followers,
                      t
                    ),
                  })}
                </div>
              </div>
            </div>
            <div className={`${styles.channelButtons} col-lg-12 col-xl-6`}>
              {auth.get("isLogged") && (
                <button
                  type="button"
                  className={`btn ${
                    this.state.channel.following
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={this.follow}
                >
                  <FontAwesomeIcon icon="heart" className={styles.icon} />
                  &nbsp;&nbsp;{" "}
                  {this.state.channel.following
                    ? t("shared.following")
                    : t("shared.follow")}
                </button>
              )}
              <button
                type="button"
                className="btn"
                data-toggle="modal"
                data-target="#reportModal"
                title={t("shared.report")}
              >
                <FontAwesomeIcon icon="flag" className={styles.icon} />
              </button>
            </div>
          </div>
          <ul
            className="nav nav-pills mb-3 justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Videos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active text-center"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h4>Custom Content</h4>
            {/*<div className="row">
              <VideoThumb />
              <VideoThumb />
              <VideoThumb />
              <VideoThumb />
                </div>*/}
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="row"></div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            Contact Information:
            <br />
            Email:{" "}
            <a href="mailto:batata@tryhosting.com.br">
              batata@tryhosting.com.br
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(Channel));
