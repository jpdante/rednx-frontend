import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";

class NotFound extends React.Component<WithTranslation> {
  render() {
    //const { t } = this.props;
    return (
      <div className="text-center">
          <h1>404 Not Found</h1>
      </div>
    );
  }
}

export default withTranslation()(NotFound);