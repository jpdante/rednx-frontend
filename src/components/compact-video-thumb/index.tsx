import React from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./compact-video-thumb.module.scss";
import { VideoThumbnail } from "../../model";

interface IProps {
  data: VideoThumbnail;
}

function numberToTime(time: number) {
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;
  var ret = "";
  if (hrs > 0) {
    ret += "" + (hrs < 10 ? "0" : "") + hrs + ":";
  }
  ret +=
    "" +
    (mins < 10 ? "0" : "") +
    mins +
    ":" +
    (secs < 10 ? "0" : "") +
    "" +
    secs;
  return ret;
}

function numberToText(views: number, t: any) {
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

function timeToText(unix_timestamp: number, t: any) {
  var seconds = Math.floor(
    (new Date().getTime() - new Date(unix_timestamp * 1000).getTime()) / 1000
  );
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return t("time.year", { count: interval });
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return t("time.month", { count: interval });
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return t("time.week", { count: interval });
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return t("time.day", { count: interval });
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return t("time.hour", { count: interval });
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return t("time.minute", { count: interval });
  }
  return t("time.second", { count: Math.floor(seconds) });
}

function CompactVideoThumb(props: IProps) {
  const { t } = useTranslation();
  return (
    <div className={`${styles.videoThumb} col-12`}>
      <div className={`no-gutters row`}>
        <div className="col-6">
          <Link
            to={`/watch/${props.data.guid}`}
            className={`${styles.videoLink}`}
          >
            <div className={`${styles.video}`}>
              <div className={styles.overlay}>
                <div className={styles.playIcon}>
                  <FontAwesomeIcon icon="play" size="lg" />
                </div>
                <div className={styles.spaceConsumer}></div>
                <div className={styles.videoData}>
                  <div
                    className={`${styles.infoOverlay} ${styles.playTime} float-right`}
                  >
                    {numberToTime(props.data.time)}
                  </div>
                </div>
              </div>
              <img
                src="/assets/thumb.jpg"
                alt="Thumbnail do video"
                className={styles.image}
              />
            </div>
          </Link>
        </div>
        <div className="col-6">
          <div className={styles.videoInfo}>
            <Link
              className={styles.videoTitle}
              to={`/watch/${props.data.guid}`}
            >
              {props.data.title}
            </Link>
            <div className={styles.channelName}>
              <Link to={`/channel/${props.data.channel.link}`}>
                {props.data.channel.name}
              </Link>
            </div>
            <div className={styles.videoViews}>
              {t("components.thumbnail.view", {
                count: props.data.views,
                countText: numberToText(props.data.views, t),
              })}
            </div>
            <div className={styles.videoDate}>
              {t("time.ago", {
                time: timeToText(props.data.creationDate, t),
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompactVideoThumb;
