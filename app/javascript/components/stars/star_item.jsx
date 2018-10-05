import React from "react";
import Radium from "radium";

const StarItem = ({ star }) => (
  <div>
    {star.node.owner.login} / <p style={styles.strong}>{star.node.name}</p>
  </div>
);

const styles = {
  strong: {
    fontWeight: "900",
    display: "inline"
  }
};

export default Radium(StarItem);
