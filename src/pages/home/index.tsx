import React from "react";

import MyComponent from "../../components/MyComponent";
import Loading from "../../components/loading";
import FeedNewVideos from "../../components/feed/new-videos";
import { withTranslation, WithTranslation } from "react-i18next";
import api from "../../api";

interface IProps extends WithTranslation {
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
interface IState {
  loading: boolean;
  videos: Video[]; 
}

class Home extends React.Component<IProps, IState> {
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