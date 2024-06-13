import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import Progress from "@/components/ProgressBar.vue";

//引入nprogress
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; //这个样式必须引入

// 清除默认样式
import "/src/assets/common/common.css";

const app = createApp(App);

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(router);
app.component("Progress", Progress);
app.mount("#app");
