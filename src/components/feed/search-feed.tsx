import React from "react";
import SearchVideoThumb from "../search-video-thumb";
import { VideoThumbnail } from "../../model";

interface IProps {
  videos: VideoThumbnail[];
}

function SearchFeed(props: IProps) {
  return (
    <div className="row">
      {props.videos.map((item) => (
        <SearchVideoThumb key={item.guid} data={item} />
      ))}
    </div>
  );
}

export default SearchFeed;
