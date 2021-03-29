import { createApp, App } from "vue";
import StartApp from "./App.vue";
import {
  BaseChart,
  Chart,
  XAxis,
  YAxis,
  Dataset,
  Series,
  Tooltip,
  Legend,
  MethodLoading,
  MethodResize,
  Event,
  Grid,
  VisualMap,
  setECharts,
} from "@echarts-start/vue-bridge";
import * as echarts from "echarts";
setECharts(echarts);

const bridge = (app: App) => {
  app.component("CBaseChart", BaseChart);
  app.component("CChart", Chart);
  app.component("CXAxis", XAxis);
  app.component("CYAxis", YAxis);
  app.component("CDataset", Dataset);
  app.component("CSeries", Series);
  app.component("CTooltip", Tooltip);
  app.component("CLegend", Legend);
  app.component("CMethodLoading", MethodLoading);
  app.component("CMethodResize", MethodResize);
  app.component("CEvent", Event);
  app.component("CGrid", Grid);
  app.component("CVisualMap", VisualMap);
};

createApp(StartApp).use(bridge).mount("#root");
