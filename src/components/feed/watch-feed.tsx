import React from "react";

import { VideoThumbnail } from "../../model";

import net from "../../services/net";
import CompactVideoThumb from "../../components/compact-video-thumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IState {
  loading: boolean;
  videos: VideoThumbnail[];
}

interface IProps {}

class WatchFeed extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      videos: [],
    };
  }

  async componentDidMount() {
    const response = await net.get("/feed/newvideos");
    this.setState({
      loading: false,
      videos: response.data,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border mt-5"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        {this.state.videos.map((video) => (
          <CompactVideoThumb key={video.guid} data={video} />
        ))}
      </div>
    );
  }
}

export default WatchFeed;
