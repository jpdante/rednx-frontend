import React from "react";

import { withTranslation } from "react-i18next";
import { Channel } from "../../model";
import { Link } from "@reach/router";

import styles from "./following.module.scss";
import Store, { StoreProps } from "../../undux";

interface IState {
  channels: Channel[];
}

class Following extends React.Component<StoreProps, IState> {
  constructor(props: StoreProps) {
    super(props);
    this.state = {
      channels: [],
    };
  }

  render() {
    const { t, profile } = this.props;
    return (
      <div className="feed-list">
        <h5>{t("components.navbar.following")}</h5>
        <hr />
        <div className="row">
          {profile.get("followedChannels").map((item: Channel) => (
            <Link className={`col-sm-auto ${styles.channel}`} key={item.id} to={`/channel/${item.link}`}>
              <img src={`/assets/${item.picture}`} className={styles.picture} alt="Channel"/>
              <h5>{item.name}</h5>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(Following));
