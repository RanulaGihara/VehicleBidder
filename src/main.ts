import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "./style.css";
import "element-plus/dist/index.css";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(ElementPlus);

app.use(router);

app.mount("#app");
