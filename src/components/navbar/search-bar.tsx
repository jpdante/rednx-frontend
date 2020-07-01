import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Store, { StoreProps } from "../../undux";
import { navigate } from "@reach/router";
import { withTranslation } from "react-i18next";

interface PropType extends StoreProps {
  hasNavbarToggler: boolean;
}
interface IState {
  searchContent: string;
}

class SearchBar extends React.Component<PropType, IState> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      searchContent: "",
    };
  }

  toggleSideBar = () => {
    const { sidebar } = this.props;
    sidebar.set("show")(!sidebar.get("show"));
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/search/" + this.state.searchContent);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-bar input-group mx-auto form-inline">
          {this.props.hasNavbarToggler && (
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-secondary"
                type="button"
                aria-label="Toggle navigation"
                onClick={this.toggleSideBar}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          )}
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={this.state.searchContent}
            onChange={(e) => this.setState({ searchContent: e.target.value })}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-outline-secondary">
              <FontAwesomeIcon icon="search" aria-hidden="true" />
            </button>
            {this.props.hasNavbarToggler && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                data-toggle="collapse"
                data-target="#mainNavbarColappser"
                aria-controls="mainNavbarColappser"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default Store.withStores(withTranslation()(SearchBar));
