const token =
  "pk.eyJ1IjoiZ3V0dHotYXBwZGV2IiwiYSI6ImNrZGhmZTBtbTJ3OTczNGs2bnlhanpka2IifQ.mH21k1PHf58All6DWOtX-A";

export const layers = [
  {
    title: "Mapbox",
    id: "mapbox",
    layer: L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=" +
        token,
      {
        maxNativeZoom:20,
        maxZoom:20
      }
    )
  },
  {
    title: "Satellite",
    id: "satellite",
    layer: L.tileLayer(
      "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=" +
        token,
      {
        maxNativeZoom:20,
        maxZoom:20
      }
    )
  },
  {
    title: "OSM",
    id: "osm",
    layer: L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }, 
    {
      maxNativeZoom:20,
      maxZoom:20
    })
  } /*,
  {
    title: "Wikimedia",
    id: "wikimedia",
    layer: L.tileLayer(
      "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png",
      {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    )
  },
  {
    title: "HOT",
    id: "hot",
    layer: L.tileLayer("http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    })
  },
  {
    title: "Toner",
    id: "toner",
    layer: L.tileLayer("http://a.tile.stamen.com/toner/{z}/{x}/{y}@2x.png", {
      attribution:
        '&copy; Stamen, <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    })
  },
  {
    title: "Watercolor",
    id: "watercolor",
    layer: L.tileLayer("http://a.tile.stamen.com/watercolor/{z}/{x}/{y}.png", {
      attribution:
        '&copy; Stamen, <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    })
  },
  {
    title: "Positron",
    id: "positron",
    layer: L.tileLayer(
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png",
      {
        attribution:
          '&copy; Carto, <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    )
  },
  {
    title: "Dark Matter",
    id: "dark",
    layer: L.tileLayer(
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}@2x.png",
      {
        attribution:
          '&copy; Carto, <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    )
  }
  */
];
