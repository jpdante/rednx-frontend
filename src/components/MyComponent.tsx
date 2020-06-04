import React from "react";
import Store, { StoreProps } from "../undux";

class MyComponent extends React.Component<StoreProps> {
  render() {
    return (
      <div>
        Foo: {this.props.store.get("foo")}
        <br />
        <input
          type="text"
          onChange={(e) => {
            this.props.store.set("foo")(parseInt(e.target.value));
          }}
        />
        <br />
      </div>
    );
  }
}

export default Store.withStore(MyComponent);
