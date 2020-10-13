import ECharts from "echarts";

export const getECharts = (): typeof ECharts => {
  return window.echarts;
};
