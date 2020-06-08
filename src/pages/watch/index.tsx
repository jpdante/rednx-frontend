import React from "react";

import Loading from "../../components/loading";
import { withTranslation, WithTranslation } from "react-i18next";
import api from "../../api";
import { Video } from "../../model";

import styles from "./watch.module.scss";
import Player from "../../components/player";
import TitleBar from "../../components/watch/title-bar";
import Description from "../../components/watch/description";
import Comments from "../../components/watch/comments";

interface IState {
  loading: boolean;
  video: Video | null;
}

interface IProps extends WithTranslation {
  link?: string;
}

class Watch extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      video: null,
    };
  }

  async componentDidMount() {
    if (this.props.link === undefined || this.props.link === null) return;
    const response = await api.getVideo(this.props.link);
    if (response.data.success) {
      this.setState({
        loading: false,
        video: response.data.video,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading isPageContent={true} />;
    }
    return (
      <div className={`${styles.container} row`}>
        <div
          className={`${styles.playerContainer} col-sm-12 col-md-12 col-lg-12 col-xl-9`}
        >
          <Player video={this.state.video} />
          <TitleBar video={this.state.video} />
          <Description video={this.state.video} />
          <Comments video={this.state.video} />
        </div>
        <div
          className={`${styles.videosContainer} col-sm-12 col-md-12 col-lg-12 col-xl-3`}
        >
          <div className={`row`}></div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Watch);
