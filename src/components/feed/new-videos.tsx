import React from "react";
import VideoThumb from "../video-thumb";

interface IProps {
  videos: Video[];
}

type Video = {
  title: string;
  guid: string;
  views: number;
  creationDate: number;
  time: number;
  thumb: string;
  channel: Channel;
};

type Channel = {
  link: string;
  name: string;
  picture: string;
};

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
