import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import DefaultTheme from "vitepress/theme";
import ReadText from "../components/read-text.vue";
import PreviewPDF from "../components/preview-pdf.vue";
import FontSource from "../components/font-source.vue";
import Analysis from "../components/analysis.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';


export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    app.component("ac-read-text", ReadText);
    app.component("ac-preview-pdf", PreviewPDF);
    app.component("ac-font-source", FontSource);
    app.component("ac-analysis", Analysis);
  },
};
