import React from "react";
import Radium from "radium";
import StarItemContainer from "./star_item_container";

const StarList = ({ stars, page }) => (
  <div style={[styles.list, styles.scroll]}>
    <ul>
      {stars.map((star, idx) => (
        <li key={`${idx}${star.cursor}`}>
          <StarItemContainer star={star} page={page} />
        </li>
      ))}
    </ul>
  </div>
);

const styles = {
  list: {
    paddingTop: "20px"
  }
};

export default Radium(StarList);
