const defaultProperties = {
  opacity: 1,
  fillOpacity: 1,
};

export default {
  GREEN: {
    // Spread operator not working for when used multiple times
    // probably problem with babel spread plugin
    ...defaultProperties,
    ...{
      golfCourtType: "GREEN",
      color: "#BAD278",
      fill: true,
      fillColor: "#BAD278",
    },
  },
  WATER: Object.assign(
    {
      golfCourtType: "WATER",
      color: "#72BDF6",
      fill: true,
      fillColor: "#72BDF6",
    },
    defaultProperties
  ),
  BUNKER: Object.assign(
    {
      golfCourtType: "BUNKER",
      color: "#EDD9AF",
      fill: true,
      fillColor: "#EDD9AF",
    },
    defaultProperties
  ),
  FAIRWAY: Object.assign(
    {
      golfCourtType: "FAIRWAY",
      color: "#43A93B",
      fill: true,
      fillColor: "#43A93B",
    },
    defaultProperties
  ),
  TEE: Object.assign(
    {
      golfCourtType: "TEE",
      color: "red",
      fill: true,
      fillColor: "red",
    },
    defaultProperties
  ),
  TREE: Object.assign(
    {
      golfCourtType: "TREE",
      color: "#997960",
      fill: true,
      fillColor: "#997960",
    },
    defaultProperties
  ),
  ROUGH: Object.assign(
    {
      golfCourtType: "ROUGH",
      color: "#005130",
      fill: true,
      fillColor: "#005130",
    },
    defaultProperties
  ),
  CUSTOM: Object.assign(
    {
      golfCourtType: undefined,
      color: "yellow",
      fill: true,
      fillColor: "yellow",
    },
    defaultProperties
  ),
};
