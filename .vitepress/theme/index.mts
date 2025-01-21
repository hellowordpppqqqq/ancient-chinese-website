import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import DefaultTheme from "vitepress/theme";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
  },
};
