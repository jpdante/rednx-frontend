import React from "react";

import MyComponent from "../../components/MyComponent";
import Loading from "../../components/loading";

interface IProps {}
interface IState {
  loading?: boolean;
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  render() {
    if (this.state.loading) {
      return <Loading isPageContent={true} />;
    }
    return (
      <div>
        <MyComponent />
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>a</span>
        <br />
        <span>penis</span>
      </div>
    );
  }
}

export default Home;
