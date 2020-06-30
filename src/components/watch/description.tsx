import React from "react";
import { Video, UserInfo } from "../../model";

import styles from "./watch.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@reach/router";
import { withTranslation } from "react-i18next";
import { StoreProps } from "../../undux";
import Store from "../../undux";
import net from "../../services/net";

interface IProps extends StoreProps {
  video: Video | null;
  userInfo: UserInfo | null;
}

interface IState {
  video: Video | null;
  like: boolean;
  dislike: boolean;
  following: boolean;
  showDescription: boolean;
}

class Description extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      video: props.video,
      like: props.userInfo?.liked || false,
      dislike: props.userInfo?.disliked || false,
      following: props.userInfo?.following || false,
      showDescription: false,
    };
  }

  follow = async (e: any) => {
    e.preventDefault();
    if (!this.props.auth.get("isLogged")) return;
    const { video, following } = this.state;
    if (video === undefined || video === null) return;
    if (following) {
      this.setState({
        following: false,
      });
      await net.post("/channel/follow", {
        id: video.channel.id,
        value: false,
      });
    } else {
      this.setState({
        following: true,
      });
      await net.post("/channel/follow", {
        id: video.channel.id,
        value: true,
      });
    }
  };

  toggleDescription = async (e: any) => {
    e.preventDefault();
    if (this.state.showDescription) {
      this.setState({
        showDescription: false,
      });
    } else {
      this.setState({
        showDescription: true,
      });
    }
  };

  like = async (e: any) => {
    e.preventDefault();
    if (!this.props.auth.get("isLogged")) return;
    const { video, like } = this.state;
    if (video === undefined || video === null) return;
    if (like) {
      this.setState({
        like: false,
        dislike: false,
      });
      await net.post("/video/like", {
        id: video.id,
        value: null,
      });
    } else {
      this.setState({
        like: true,
        dislike: false,
      });
      await net.post("/video/like", {
        id: video.id,
        value: true,
      });
    }
  };

  dislike = async (e: any) => {
    e.preventDefault();
    if (!this.props.auth.get("isLogged")) return;
    const { video, dislike } = this.state;
    if (video === undefined || video === null) return;
    if (dislike) {
      this.setState({
        like: false,
        dislike: false,
      });
      await net.post("/video/like", {
        id: video.id,
        value: null,
      });
    } else {
      this.setState({
        like: false,
        dislike: true,
      });
      await net.post("/video/like", {
        id: video.id,
        value: false,
      });
    }
  };

  numberToText(views: number | undefined, t: any) {
    if (views === undefined) return 0;
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
    const { t } = this.props;
    return (
      <div className={styles.descriptionContainer}>
        <div className={styles.channelInfoContainer}>
          <div className={styles.channelImage}>
            <Link
              className={styles.aaaaa}
              to={`/channel/${this.state.video?.channel.link}`}
            >
              <img
                src={`/assets/${this.state.video?.channel.picture || "default"}`}
                alt="Avatar do Canal"
              />
            </Link>
            <div className={styles.channelNameContainer}>
              <div className={styles.channelName}>
                <Link to={`/channel/${this.state.video?.channel.link}`}>
                  {this.state.video?.channel.name}
                </Link>
              </div>
              <div className={styles.channelFollowers}>
                {t("pages.watch.followers", {
                  countText: this.numberToText(
                    this.state.video?.channel.followers,
                    t
                  ),
                })}
              </div>
            </div>
          </div>
          <div className={styles.channelButtons}>
            <div className={`${styles.mobileBox} ${styles.topMobileBox}`}>
              <button
                type="button"
                className={`btn btn-sm ${this.state.like ? "btn-primary" : ""}`}
                onClick={this.like}
              >
                <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />
                &nbsp;&nbsp; {t("shared.like")}
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  this.state.dislike ? "btn-primary" : ""
                }`}
                onClick={this.dislike}
              >
                <FontAwesomeIcon icon="thumbs-down" className={styles.icon} />
                &nbsp;&nbsp; {t("shared.dislike")}
              </button>
            </div>
            <div className={styles.mobileBox}>
              <button type="button" className="btn btn-sm">
                <FontAwesomeIcon icon="share" className={styles.icon} />
                &nbsp;&nbsp; {t("shared.share")}
              </button>
              <button
                type="button"
                className="btn btn-sm"
                data-toggle="modal"
                data-target="#reportModal"
                title={t("shared.report")}
              >
                <FontAwesomeIcon icon="flag" className={styles.icon} />
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  this.state.following ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={this.follow}
              >
                <FontAwesomeIcon icon="heart" className={styles.icon} />
                &nbsp;&nbsp;{" "}
                {this.state.following
                  ? t("shared.following")
                  : t("shared.follow")}
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.card} card`}>
          <div
            className={`${styles.description} card-body ${
              this.state.showDescription ? styles.active : ""
            }`}
          >
            {this.state.video?.description}
          </div>
          <button
            type="button"
            className={`btn`}
            onClick={this.toggleDescription}
          >
            <FontAwesomeIcon
              icon={this.state.showDescription ? "eye-slash" : "eye"}
              className={styles.icon}
            />
            &nbsp;&nbsp;{" "}
            {this.state.showDescription
              ? t("pages.watch.hideDescription")
              : t("pages.watch.showDescription")}
          </button>
        </div>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(Description));
