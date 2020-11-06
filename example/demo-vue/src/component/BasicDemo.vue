<template>
  <div>
    <button @click="handleLoadingClick">toggle loading</button>
    <button @click="handleChange">change</button>
    <c-base-chart style="width: 100%; height: 400px">
      <c-x-axis type="category" />
      <c-y-axis />
      <c-dataset :source="chartData" :dimensions="dimensions" />
      <c-series type="line" />
      <c-series type="line" />
      <c-series type="line" />
      <c-tooltip trigger="axis" />
      <c-legend />
      <c-method-loading :loading="loading" />
      <c-method-resize :resize="true" />
      <c-event eventName="click" :eventHandler="handleChartClick" />
    </c-base-chart>

    <c-chart style="width: 100%; height: 400px" backgroundColor="rgba(0,0,0,0.1)" :loading="loading" :resize="true">
      <c-x-axis type="category" />
      <c-y-axis />
      <c-dataset :source="chartData" :dimensions="dimensions" />
      <c-series type="line" />
      <c-series type="line" />
      <c-series type="line" />
      <c-tooltip trigger="axis" />
      <c-legend />
      <c-event eventName="click" :eventHandler="handleChartClick" />
    </c-chart>

    <c-chart style="width: 100%; height: 400px" :chartRef="handleChartInit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IChartMouseEvent } from "@echarts-start/vue-bridge";
import { ECharts as IEChart } from "echarts";

@Component
export default class ChartDemo extends Vue {
  loading: boolean = false;
  dimensions = ["product", "2015", "2016", "2017"];
  chartData = [
    { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
    { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
    { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
    { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
  ];

  handleLoadingClick() {
    this.loading = !this.loading;
  }

  handleChartClick(e: IChartMouseEvent) {
    console.log("==chart-click==", e);
  }

  handleChartInit(chart: IEChart) {
    chart.setOption({
      legend: {},
      tooltip: { trigger: "axis" },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "line" }, { type: "line" }, { type: "line" }],
      dataset: { dimensions: this.dimensions, source: this.chartData },
    });
  }
  handleChange() {
    this.chartData[0]["2015"] = this.chartData[0]["2015"] + 5;
    this.chartData = this.chartData.slice();
  }
}
</script>

<style scoped></style>
