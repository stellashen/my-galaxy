import React from "react";
import Radium from "radium";

class NoRepo extends React.Component {
  render() {
    return (
      <div style={styles.base}>
        <div style={styles.container}>
          <img
            src="https://res.cloudinary.com/devleg/image/upload/v1539228474/if_saturn_916283.png"
            width="80px"
          />
        </div>
        <div style={[styles.container, styles.center]}>
          <img
            src="https://res.cloudinary.com/devleg/image/upload/v1539226756/if_046_planet_earth_world_space_global_globe_2090183.png"
            width="150px"
          />
        </div>
        <span>Click a repository on the left </span>
        <span> to view its README here.</span>
        <div style={[styles.container, styles.width80]}>
          <img
            src="https://res.cloudinary.com/devleg/image/upload/v1539228474/if_sim4315_2329724.png"
            width="80px"
          />
        </div>
        <div style={[styles.container, styles.end]}>
          <img
            src="https://res.cloudinary.com/devleg/image/upload/v1539228474/if_Virgo_2051562.png"
            width="100px"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    backgroundColor: "rgb(246, 248, 250)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    verticalAlign: "middle",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  container: {
    opacity: "0.3",
    filter: "alpha(opacity=30)",
    width: "90%"
  },
  center: {
    textAlign: "center"
  },
  end: {
    textAlign: "end"
  },
  width80: {
    width: "80%"
  }
};

export default Radium(NoRepo);
