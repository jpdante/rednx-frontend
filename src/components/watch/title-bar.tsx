import React from "react";
import { Video } from "../../model";

import styles from "./watch.module.scss";

function getClassification(classification: number | undefined | null) {
  if (classification === 0 || classification === undefined || classification === null) return "L";
  return classification;
}

function getClassificationColor(classification: number | undefined | null) {
  if (classification === undefined || classification === null) return "#0C9447";
  switch (classification) {
    case 10:
      return "#0F7DC2";
    case 12:
      return "#F8C411";
    case 14:
      return "#E67824";
    case 16:
      return "#DB2827";
    case 18:
      return "#1D1815";
    default:
      return "#0C9447";
  }
}

function TitleBar(props: {video: Video | null}) {
  return (
    <div className={`${styles.videoTitleContainer}`}>
      <div className={`${styles.videoIcon}`}>
        <img src={`/assets/${props.video?.icon}`} alt="game" />
      </div>
      <div
        className={`${styles.videoClassification}`}
        style={{
          backgroundColor: getClassificationColor(props.video?.classification),
        }}
      >
        {getClassification(props.video?.classification)}
      </div>
      <div className={`${styles.videoTitle}`}>
        <h5>{props.video?.title}</h5>
      </div>
    </div>
  );
}

export default TitleBar;
