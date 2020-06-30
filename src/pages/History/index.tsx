import React from "react";

import Loading from "../../components/loading";
import { withTranslation, WithTranslation } from "react-i18next";
import { VideoThumbnail } from "../../model";

interface IState {
  loading: boolean;
  videos: VideoThumbnail[]; 
}

class History extends React.Component<WithTranslation, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      videos: []
    };
  }

  async componentDidMount() {
    //const response = await net.get("/feed/new");
    this.setState({
      loading: false,
      videos: [],
    });
  }

  render() {
    //const { t } = this.props;
    if (this.state.loading) {
      return <Loading isPageContent={true} />;
    }
    return (
      <div className="feed-list text-center">
        <br />
        <h1>Under Maintenance</h1>
        {/*<FeedNewVideos videos={this.state.videos} />*/}
      </div>
    );
  }
}

export default withTranslation()(History);