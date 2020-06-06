import React from "react";

import LangSelector from "./lang-selector";
import UploadAvatar from "./upload-avatar";
import { Match } from "@reach/router";

function Modals() {
  return (
    <div id="modals">
      <LangSelector />
      <Match path="/profile">
        {(props) => props.match && <UploadAvatar />}
      </Match>
    </div>
  );
}

export default Modals;
