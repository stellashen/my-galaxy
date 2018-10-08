import React from "react";
import Radium from "radium";
import Searchbar from "./searchbar";

class Explore extends React.Component {
  render() {
    return (
      <div style={styles.base}>
        <Searchbar />
      </div>
    );
  }
}

const styles = {
  base: {
    padding: "20px"
  }
};

export default Radium(Explore);
