import React from "react";

import Loading from "../../components/loading";
import FeedNewVideos from "../../components/feed/new-videos";
import { withTranslation, WithTranslation } from "react-i18next";
import api from "../../api";
import { VideoThumbnail } from "../../model";

interface IState {
  loading: boolean;
  videos: VideoThumbnail[]; 
}

class Home extends React.Component<WithTranslation, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      videos: []
    };
  }

  async componentDidMount() {
    const response = await api.getNewVideos();
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

export default withTranslation()(Home);