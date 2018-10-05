import React from "react";
import Radium from "radium";
import StarItem from "./star_item";

const StarList = ({ stars }) => (
  <ul style={styles.list}>
    {stars.map((star, idx) => (
      <li key={`${idx}${star.cursor}`}>
        <StarItem star={star} />
      </li>
    ))}
  </ul>
);

const styles = {
  list: {
    paddingTop: "20px"
  }
};

export default Radium(StarList);
