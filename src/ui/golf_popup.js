import React from "react";

export default class DeleteFeature extends React.Component {
  state = {
    tab: "properties",
  };
  setTab = (tab) => {
    this.setState({ tab });
  };
  render() {
    const { layer, popupRemoveLayer } = this.props;
    return (
      <div className="bt flex">
        <span
          className="db pointer bn pa2 hover-bg-light-blue"
          onClick={() => popupRemoveLayer(layer)}
        >
          Delete
        </span>
      </div>
    );
  }
}
