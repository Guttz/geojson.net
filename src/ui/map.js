import React from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import "leaflet-hash";
import "leaflet-editable";
import marker from "../map/marker";
import Popup from "./popup";
import DeleteFeature from "./golf_popup";
import geojsonRewind from "geojson-rewind";
import simplestyle from "./simplestyle";
import iconRetinaUrl from "../../css/marker-icon-2x.png";
import iconUrl from "../../css/marker-icon.png";
import greenIconSVG from "../../css/green-icon.svg";
import waterIconSVG from "../../css/water-icon.svg";
import treeIconSVG from "../../css/tree-icon.svg";
import fairwayIconSVG from "../../css/fairway-icon.svg";
import roughIconSVG from "../../css/rough-icon.svg";
import teeIconSVG from "../../css/tee-icon.svg";
import bunkerIconSVG from "../../css/bunker-icon.svg";
import customIconSVG from "../../css/custom-icon.svg";
import shadowUrl from "../../css/marker-shadow.png";
import golfStyleLayerConfig from "./map_golfStyle";

const polygon = <path d="M15 6l8.56 6.219-3.27 10.062H9.71L6.44 12.22z" />;
const line = <path d="M6 7l8.31 3.99v7.822l8.31 4.746" />;
const rectangle = <path d="M7.5 7.5h15v15h-15z" />;
const point = (
  <path d="M15 24.152L7 13.015c-.747-4.83 1.92-7.246 8-7.246s8.747 2.415 8 7.246l-8 11.137z" />
);

L.Marker.prototype.options.icon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  componentDidMount() {
    const featuresLayer = L.layerGroup();
    let map = new L.Map(this.mapRef.current, {
      editable: true,
      editOptions: {
        featuresLayer,
      },
      maxNativeZoom: 20,
      maxZoom: 20,
    });
    const { layer } = this.props;
    L.control.scale().setPosition("bottomright").addTo(map);
    map.zoomControl.setPosition("bottomright");
    map.setView([50.1200896, 9.081323], 16);

    L.hash(map);
    const metric =
      navigator.language !== "en-us" && navigator.language !== "en-US";

    map.attributionControl.setPrefix("");

    const baseLayerGroup = L.layerGroup().addTo(map);
    this.props.layers
      .find(({ id }) => id === layer)
      .layer.addTo(baseLayerGroup);
    // map.on("editable:drawing:commit", this.updateFromMap);

    L.EditControl = L.Control.extend({
      options: {
        position: "topleft",
        callback: null,
        kind: "",
      },

      onAdd: function (map) {
        var container = L.DomUtil.create(
            "div",
            "leaflet-control leaflet-bar bg-white black hover-bg-purple hover-white"
          ),
          link = L.DomUtil.create("a", "", container);

        link.href = "#";
        link.title = "Create a new " + this.options.kind;
        const iconContainer = link.appendChild(document.createElement("div"));
        ReactDOM.render(
          <svg
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            width="30"
            height="30"
          >
            {this.options.icon}
          </svg>,
          iconContainer
        );
        L.DomEvent.on(link, "click", L.DomEvent.stop).on(
          link,
          "click",
          function () {
            window.LAYER = this.options.callback.call(map.editTools);
          },
          this
        );

        return container;
      },
    });

    L.NewLineControl = L.EditControl.extend({
      options: {
        position: "topleft",
        callback: map.editTools.startPolyline,
        kind: "line",
        icon: line,
      },
    });

    L.NewPolygonControl = L.EditControl.extend({
      options: {
        position: "topleft",
        callback: map.editTools.startPolygon,
        kind: "Custom Area",
        icon: polygon,
      },
    });

    L.NewMarkerControl = L.EditControl.extend({
      options: {
        position: "topleft",
        callback: map.editTools.startMarker,
        kind: "marker",
        icon: point,
      },
    });

    L.NewRectangleControl = L.EditControl.extend({
      options: {
        position: "topleft",
        callback: map.editTools.startRectangle,
        kind: "rectangle",
        icon: rectangle,
      },
    });

    L.NewSVGControl = L.Control.extend({
      options: {
        position: "topleft",
        callback: null,
        kind: "",
        background: "black",
      },

      onAdd: function (map) {
        var container = L.DomUtil.create(
            "div",
            "leaflet-control leaflet-bar golf-mark"
          ),
          link = L.DomUtil.create("a", "", container);

        link.href = "#";
        link.title = "Create a new " + this.options.kind;
        const iconContainer = link.appendChild(document.createElement("div"));
        ReactDOM.render(
          <div>
            <img
              style={{ display: "inline-block" }}
              width={50}
              src={this.options.svgPath}
              alt={this.options.kind + "Marker"}
            />
            <span style={{ display: "inline-block" }}>{this.options.kind}</span>
          </div>,
          iconContainer
        );
        L.DomEvent.on(link, "click", L.DomEvent.stop).on(
          link,
          "click",
          function () {
            window.LAYER = this.options.callback.call(map.editTools);
          },
          this
        );

        return container;
      },
    });

    L.NewGreenControl = L.NewSVGControl.extend({
      options: {
        position: "topleft",
        callback: () => this.startPolygon(null, golfStyleLayerConfig["GREEN"]),
        kind: "Green Area",
        svgPath: greenIconSVG,
      },
    });

    L.NewWaterControl = L.NewSVGControl.extend({
      options: {
        position: "topleft",
        callback: () => this.startPolygon(null, golfStyleLayerConfig["WATER"]),
        kind: "Water Area",
        svgPath: waterIconSVG,
      },
    });

    L.NewBunkerControl = L.NewSVGControl.extend({
      options: {
        position: "topleft",
        callback: () => this.startPolygon(null, golfStyleLayerConfig["BUNKER"]),
        kind: "Bunker Area",
        svgPath: bunkerIconSVG,
      },
    });

    L.NewFairwayControl = L.NewSVGControl.extend({
      options: {
        position: "topleft",
        callback: () =>
          this.startPolygon(null, golfStyleLayerConfig["FAIRWAY"]),
        kind: "Fairway Area",
        svgPath: fairwayIconSVG,
      },
    });

    L.NewTeeControl = L.NewSVGControl.extend({
      options: {
        position: "topleft",
        callback: () => this.startRectangle(null, golfStyleLayerConfig["TEE"]),
        kind: "Tee Spot",
        svgPath: teeIconSVG,
      },
    });

    L.NewTreeControl = L.NewSVGControl.extend({
      options: {
        position: "topleft",
        callback: () => this.startPolygon(null, golfStyleLayerConfig["TREE"]),
        kind: "Tree Area",
        svgPath: treeIconSVG,
      },
    });

    L.NewRoughControl = L.NewSVGControl.extend({
      options: {
        position: "topleft",
        callback: () => this.startPolygon(null, golfStyleLayerConfig["ROUGH"]),
        kind: "Rough Area",
        svgPath: roughIconSVG,
      },
    });

    L.NewCustomControl = L.NewSVGControl.extend({
      options: {
        position: "topleft",
        callback: () => this.startPolygon(null, golfStyleLayerConfig["CUSTOM"]),
        kind: "Rough Area",
        svgPath: customIconSVG,
      },
    });

    map.addControl(new L.NewGreenControl());
    map.addControl(new L.NewWaterControl());
    map.addControl(new L.NewBunkerControl());
    map.addControl(new L.NewFairwayControl());
    map.addControl(new L.NewTeeControl());
    map.addControl(new L.NewTreeControl());
    map.addControl(new L.NewRoughControl());
    map.addControl(new L.NewCustomControl());

    //map.addControl(new L.NewMarkerControl());
    //map.addControl(new L.NewLineControl());
    //map.addControl(new L.NewPolygonControl());
    //map.addControl(new L.NewRectangleControl());
    map.addLayer(featuresLayer);

    map
      .on("editable:dragend", this.updateFromMap)
      .on("editable:created", this.updateFromMap)
      .on("editable:drawing:commit", this.styleGolfMapIsGeoJson);
    //.on("editable:editing", this.updateFromMap);

    this.setState({
      map,
      baseLayerGroup,
    });
  }
  bindLayerPopup = (layer) => {
    if ("bindPopup" in layer) {
      layer.bindPopup(
        L.popup(
          {
            closeButton: false,
            maxWidth: 500,
            maxHeight: 400,
            autoPanPadding: [5, 45],
            closeOnClick: true,
            classname: "geojsonnet-feature",
          },
          layer
        ).setContent(this.makePopup(layer))
      );
    }
  };
  popupRemoveLayer = (layer) => {
    const { setGeojson } = this.props;
    const {
      map: {
        editTools: { featuresLayer },
      },
    } = this.state;
    featuresLayer.removeLayer(layer);
    let geojson = geojsonRewind(featuresLayer.toGeoJSON());
    setGeojson(geojson, "map");
  };
  editProperties = (update, layer) => {
    layer.feature.properties = update.updated_src;
    this.updateFromMap();
  };

  makePopup = (layer) => {
    const { setGeojson } = this.props;
    const div = document.createElement("div");
    if (layer.feature.properties.golfCourtType) {
      ReactDOM.render(
        <DeleteFeature
          layer={layer}
          editProperties={(update) => this.editProperties(update, layer)}
          setGeojson={setGeojson}
          popupRemoveLayer={this.popupRemoveLayer}
        />,
        div
      );
    } else {
      ReactDOM.render(
        <Popup layer={layer} popupRemoveLayer={this.popupRemoveLayer} />,
        div
      );
    }

    div.className = "ispopup";
    return div;
  };
  styleGolfMapIsGeoJson = (e) => {
    const {
      map: {
        editTools: { featuresLayer },
      },
    } = this.state;
    // Ading golf type according to the selected control - [GOLFPACE]
    featuresLayer._layers[e.layer._leaflet_id].feature = {
      type: "Feature",
      properties: { golfCourtType: e.layer.options["golfCourtType"] },
    };
    const geojson = featuresLayer.toGeoJSON();
    featuresLayer.clearLayers();
    L.geoJson(geojson).eachLayer((layer) => {
      // Golf Styling Options according to golfStyleLayerConfig - [GOLFPACE]
      const updatedOptions =
        golfStyleLayerConfig[layer.feature.properties["golfCourtType"]];
      layer.options = { ...layer.options, ...updatedOptions };

      featuresLayer.addLayer(layer);
      // layer must be added before editing can be enabled.
      //layer.enableEdit();
      layer.on("click", this.clickPolygon);
    });

    this.updateFromMap(e);
  };
  clickPolygon = (e) => {
    const { target } = e;
    if (
      (e.originalEvent.ctrlKey || e.originalEvent.metaKey) &&
      target.editEnabled()
    ) {
      target.editor.newHole(e.latlng);
    } else {
      // Adding edit toggle on click - [GOLFPACE]
      target.toggleEdit();
    }
  };
  updateFromMap = () => {
    const {
      map: {
        editTools: { featuresLayer },
      },
    } = this.state;
    const { setGeojson } = this.props;
    let geojson = geojsonRewind(featuresLayer.toGeoJSON());
    setGeojson(geojson, "map");
    featuresLayer.eachLayer(this.bindLayerPopup);
  };
  componentDidUpdate(prevProps, prevState) {
    const { baseLayerGroup, map } = this.state;
    const { showPanel, layer, geojson, changeFrom } = this.props;
    if (prevProps.showPanel !== showPanel) {
      map.invalidateSize();
    }
    if (layer !== prevProps.layer) {
      baseLayerGroup.clearLayers();
      this.props.layers
        .find(({ id }) => id === layer)
        .layer.addTo(baseLayerGroup);
    }
    if (geojson !== prevProps.geojson && changeFrom !== "map") {
      const {
        map: {
          editTools: { featuresLayer },
        },
      } = this.state;
      featuresLayer.clearLayers();
      L.geoJson(geojson).eachLayer((layer) => {
        // layer must be added before editing can be enabled.
        featuresLayer.addLayer(layer);
        layer.enableEdit();
      });

      featuresLayer.eachLayer(this.bindLayerPopup);
    }
  }
  startLine = (latLng, options) => {
    const { map } = this.state;
    map.editTools.startPolyline(latLng, options);
  };
  startPolygon = (latLng, options) => {
    const { map } = this.state;
    const createdPolygon = map.editTools.startPolygon(latLng, options);
    return createdPolygon;
  };
  startRectangle = (latLng, options) => {
    const { map } = this.state;
    map.editTools.startRectangle(latLng, options);
  };
  startMarker = (latLng, options) => {
    const { map } = this.state;
    const createdMarker = map.editTools.startMarker(latLng, options);
    return createdMarker;
  };
  render() {
    return <div className="flex-auto" ref={this.mapRef} />;
  }
}
