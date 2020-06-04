import React, { ReactNode } from "react";
import { Link } from "@reach/router";

import styles from "./sidebar.module.scss";

type PropType = {
  to: string;
  children?: ReactNode;
};

function NavLink(props: PropType) {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        return {
          className: isCurrent
            ? `nav-link ${styles.navLink} ${styles.active}`
            : `nav-link ${styles.navLink}`,
        };
      }}
    >
      {props.children}
      <div className="nav-item-active" />
    </Link>
  );
}

export default NavLink;
