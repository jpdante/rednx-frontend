import React from "react";
import FadeIn from "react-fade-in";

import MyComponent from "../../components/MyComponent";

class Home extends React.Component {
  render() {
    return (
      <FadeIn className="page-content">
        <MyComponent />
      </FadeIn>
    );
  }
}

export default Home;
