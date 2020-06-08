import React from "react";
import type { StoreProps } from "../../undux";
import Store from "../../undux";
import { withTranslation } from "react-i18next";

interface IState {
  loading: boolean;
}

class SettingsTab extends React.Component<StoreProps, IState> {
  constructor(props: StoreProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  render() {
    const { t } = this.props;
    return (
      <div className="tab-pane fade" id="v-pills-settings" role="tabpanel">
        <h4>{t("pages.profile.settings")}</h4>
        <hr />
        <form onSubmit={this.handleSubmit}></form>
      </div>
    );
  }
}

export default Store.withStores(withTranslation()(SettingsTab));
