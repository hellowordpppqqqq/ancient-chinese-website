import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import DefaultTheme from "vitepress/theme";
import ReadText from "../components/read-text.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.component("ac-read-text", ReadText);
  },
};
