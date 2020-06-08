import React from "react";
import VideoThumb from "../video-thumb";
import { VideoThumbnail } from "../../model";

interface IProps {
  videos: VideoThumbnail[];
}

function FeedNewVideos(props: IProps) {
  return (
    <div className="row">
      {props.videos.map((item) => (
        <VideoThumb key={item.guid} data={item} />
      ))}
    </div>
  );
}

export default FeedNewVideos;
