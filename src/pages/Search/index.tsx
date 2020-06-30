import React from "react";

import Loading from "../../components/loading";
import SearchFeed from "../../components/feed/search-feed";
import { withTranslation, WithTranslation } from "react-i18next";
import { VideoThumbnail } from "../../model";
import net from "../../services/net";

interface IState {
  loading: boolean;
  content: string;
  videos: VideoThumbnail[];
}

interface IProps extends WithTranslation {
  info?: string;
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      content: props.info || "",
      videos: [],
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    await this.doSearch(nextProps.info);
  }

  async componentDidMount() {
    await this.doSearch(this.props.info);
  }

  async doSearch(info: string | undefined) {
    if (info === undefined || info === null) return;
    this.setState({
      loading: true,
      content: info,
    });
    const response = await net.post("/search", {
      info,
    });
    this.setState({
      loading: false,
      content: info,
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
        <h5>{t("pages.search.resultsFor", {content: this.state.content})}</h5>
        <hr />
        <SearchFeed videos={this.state.videos} />
      </div>
    );
  }
}

export default withTranslation()(Search);
