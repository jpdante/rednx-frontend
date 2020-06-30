import React from "react";

import Loading from "../../components/loading";
import { withTranslation, WithTranslation } from "react-i18next";
import VideoThumb from "../../components/video-thumb";
import { VideoThumbnail } from "../../model";

import styles from "./category.module.scss";
import net from "../../services/net";

interface IProps extends WithTranslation {
  category?: string;
}

interface IState {
  loading: boolean;
  videos: VideoThumbnail[];
  category: string;
  categoryName: string;
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      videos: [],
      category: "none",
      categoryName: "none",
    };
  }

  async setCategory(category: string) {
    if (this.state.category === category) return;
    var categoryName = "";
    switch (category) {
      case "science":
        categoryName = "shared.science";
        break;
      case "comedy":
        categoryName = "shared.comedy";
        break;
      case "games":
        categoryName = "shared.games";
        break;
      case "vlog":
        categoryName = "shared.vlogs";
        break;
      case "sports":
        categoryName = "shared.sports";
        break;
      case "education":
        categoryName = "shared.education";
        break;
      default:
        categoryName = "shared.unknown";
        break;
    }
    this.setState({
      category: category,
      categoryName: categoryName,
      loading: true,
    });
    const response = await net.get("/feed/new");
    this.setState({
      loading: false,
      videos: response.data,
    });
  }

  async UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    await this.setCategory(nextProps.category || "");
  }

  async componentDidMount() {
    await this.setCategory(this.props.category || "");
  }

  render() {
    const { t } = this.props;
    if (this.state.loading) {
      return <Loading isPageContent={true} />;
    }
    return (
      <div className="feed-list">
        <div className={styles.cover}></div>
        <h5>{t("pages.home.videosai")}</h5>
        <hr />
        <div className="row">
          {this.state.videos.map((item) => (
            <VideoThumb key={item.guid} data={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Home);
