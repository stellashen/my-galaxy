import React from "react";
import Radium from "radium";
import Markdown from "react-markdown";

class Readme extends React.Component {
  constructor(props) {
    super(props);
  }

  handleText(text) {
    console.log(text);
    let startIdx = text.indexOf('<img src="');
    while (startIdx !== -1) {
      const endIdx = text.indexOf(">", startIdx);
      const imgText = text.substring(startIdx, endIdx + 1);
      const relativeUrl = imgText.substring(10, imgText.indexOf('"', 11));
      if (relativeUrl.substring(0, 4) !== "http") {
        const absoluteUrl = `${
          this.props.repository.url
        }/blob/master/${relativeUrl}`;
        const newImgText = `<a href="${absoluteUrl}" target="_blank">${absoluteUrl}</a>`;
        text = text.replace(imgText, newImgText);
      }

      startIdx = text.indexOf('<img src="', endIdx);
    }
    return text;
  }

  render() {
    const { repository } = this.props;
    return (
      <div style={styles.base}>
        <Markdown
          source={
            repository.object
              ? this.handleText(repository.object.text)
              : "No README available"
          }
          escapeHtml={false}
          className="markdown"
        />
      </div>
    );
  }
}

const styles = {
  base: {
    padding: "20px"
  }
};

export default Radium(Readme);
