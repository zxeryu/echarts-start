<template>
  <div>
    <button @click="handleLoadingClick">toggle loading</button>
    <BaseChart style="width: 100%; height: 400px">
      <XAxis type="category" />
      <YAxis />
      <Dataset :source="chartData" :dimensions="['product', '2015', '2016', '2017']" />
      <Series type="line" />
      <Series type="line" />
      <Series type="line" />
      <Tooltip trigger="axis" />
      <Legend />
      <MethodLoading :loading="loading" />
      <MethodResize :resize="true" />
      <Event eventName="click" :eventHandler="handleChartClick" />
    </BaseChart>

    <Chart style="width: 100%; height: 400px" backgroundColor="rgba(0,0,0,0.1)" :loading="loading" :resize="true">
      <XAxis type="category" />
      <YAxis />
      <Dataset :source="chartData" :dimensions="['product', '2015', '2016', '2017']" />
      <Series type="line" />
      <Series type="line" />
      <Series type="line" />
      <Tooltip trigger="axis" />
      <Legend />
      <Event eventName="click" :eventHandler="handleChartClick" />
    </Chart>

    <Chart style="width: 100%; height: 400px" :chartRef="handleChartInit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  BaseChart,
  XAxis,
  YAxis,
  Dataset,
  Series,
  Tooltip,
  Legend,
  MethodLoading,
  MethodResize,
  Event,
  IChartMouseEvent,
  Chart,
} from "@echarts-start/vue-bridge";
import { ECharts as IEChart } from "echarts";

@Component({
  components: {
    BaseChart,
    XAxis,
    YAxis,
    Dataset,
    Series,
    Tooltip,
    Legend,
    MethodLoading,
    MethodResize,
    Event,
    Chart,
  },
})
export default class ChartDemo extends Vue {
  chartData: [] = [];
  loading: boolean = false;

  data(): object {
    return {
      chartData: [
        { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
        { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
        { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
        { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
      ],
    };
  }

  handleLoadingClick() {
    this.loading = !this.loading;
  }

  handleChartClick(e: IChartMouseEvent) {
    console.log("=====chart-----click==", e);
  }

  handleChartInit(chart: IEChart) {
    chart.setOption({
      legend: {},
      tooltip: { trigger: "axis" },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "line" }, { type: "line" }, { type: "line" }],
      dataset: { dimensions: ["product", "2015", "2016", "2017"], source: this.chartData },
    });
  }
}
</script>

<style scoped></style>
