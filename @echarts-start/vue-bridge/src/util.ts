import ECharts from "echarts";

export const getECharts = (): typeof ECharts => {
  return window.echarts;
};

export const generateId = () => {
  return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
};
