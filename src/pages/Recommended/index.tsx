import React from "react";

import Loading from "../../components/loading";
import FeedNewVideos from "../../components/feed";
import { withTranslation, WithTranslation } from "react-i18next";
import { VideoThumbnail } from "../../model";
import net from "../../services/net";

interface IState {
  loading: boolean;
  videos: VideoThumbnail[]; 
}

class Recommended extends React.Component<WithTranslation, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      videos: []
    };
  }

  async componentDidMount() {
    const response = await net.get("/feed/recommended");
    this.setState({
      loading: false,
      videos: response.data,
    });
  }

  render() {
    const { t } = this.props;
    if (this.state.loading) {
      return <Loading isPageContent={true} />;
    }
    return (
      <div className="feed-list">
        <h5>{t("pages.home.videosai")}</h5>
        <hr />
        <FeedNewVideos videos={this.state.videos} />
      </div>
    );
  }
}

export default withTranslation()(Recommended);