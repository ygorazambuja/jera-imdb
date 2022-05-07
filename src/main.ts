import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import Toast from "vue3-toast-single";
import "vue3-toast-single/dist/toast.css";

import App from "@/App.vue";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(router);
app.use(pinia);

app.use(Toast, { verticalPosition: "bottom", duration: 1500 });

app.mount("#app");
