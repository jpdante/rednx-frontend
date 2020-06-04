import React from "react";

import MainNav from "./main-nav";
import FollowingNav from "./following-nav";
import CategoryNav from "./category-nav";

function SideBar() {
  return (
    <div className="sidebar">
      <MainNav />
      <hr />
      <FollowingNav />
      <hr />
      <CategoryNav />
    </div>
  );
}

export default SideBar;
