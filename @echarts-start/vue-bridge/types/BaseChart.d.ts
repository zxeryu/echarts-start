import Vue from "vue";
import { ECharts as IEChart } from "echarts";

export declare class BaseChart extends Vue {
  chartRef?: (chartRef: IEChart) => void;
  //echarts init func
  theme?: object | string;
  opts?: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
  };
}
