import { createApp } from "vue";
import App from "./App.vue";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,

  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).href,

  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).href,
});

const app = createApp(App);

(async () => {
  const components = import.meta.glob(
    "./components/Framework/**/*.vue"
  );

  for (const path in components) {
    const componentName = path
      .split("/")
      .pop()
      .replace(/\.vue$/, "");

    const module = await components[path]();

    app.component(componentName, module.default);
  }

  app.mount("#app");
})();