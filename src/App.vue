<template>
  <div class="map-container">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="center"
      style="height: 70vh; width: 70%"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker
        v-for="building in buildings"
        :key="building.id"
        :lat-lng="[building.center.lat, building.center.lon]"
      >
        <l-popup>
          <div>
            <strong>ID:</strong>
            {{ building.id }}

            <br />

            <strong>Tipo:</strong>
            {{ building.tags.building }}
          </div>
        </l-popup>
      </l-marker>
    </l-map>
    <v-overlay v-model="overlay"></v-overlay>
    <v-snackbar v-model="message"></v-snackbar>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },

  data() {
    return {
      zoom: 13,

      center: [43.79, 7.61],

      buildings: [],
      overlay: false,
      message: "",
      // leisure=garden
      // way["building"="house"](43.77,7.58,43.81,7.64);
      query: `
[out:json];
(
  way["leisure"="garden"](43.77,7.58,43.81,7.64);
);
out center;
`,
    };
  },

  methods: {
    async fetchBuildings() {
      this.overlay = true;
      try {
        const response = await fetch(
          "https://overpass-api.de/api/interpreter",
          {
            method: "POST",
            body: this.query,
          }
        );

        const data = await response.json();

        this.buildings = data.elements;

        console.log(data.elements);
        this.overlay = false;
      } catch (error) {
        this.overlay = false;
        this.message = error;
        console.error(error);
      }
    },
  },

  mounted() {
    this.fetchBuildings();
  },
};
</script>

<style>
body {
  margin: 0;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
