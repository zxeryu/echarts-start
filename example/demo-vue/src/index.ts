import Vue from "vue";
import App from "./App.vue";
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
} from "@echarts-start/vue-bridge";

Vue.component("CBaseChart", BaseChart);
Vue.component("CChart", Chart);
Vue.component("CXAxis", XAxis);
Vue.component("CYAxis", YAxis);
Vue.component("CDataset", Dataset);
Vue.component("CSeries", Series);
Vue.component("CTooltip", Tooltip);
Vue.component("CLegend", Legend);
Vue.component("CMethodLoading", MethodLoading);
Vue.component("CMethodResize", MethodResize);
Vue.component("CEvent", Event);
Vue.component("CGrid", Grid);
Vue.component("CVisualMap", VisualMap);

new Vue({
  render: (h) => h(App),
}).$mount("#root");
