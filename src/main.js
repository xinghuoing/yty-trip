import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import Lazyload from "vant";

import "normalize.css";
import "./assets/css/index.css";

createApp(App).use(router).use(pinia).use(Lazyload, {
  lazyComponent: true,
}).mount("#app");
