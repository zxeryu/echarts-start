<template>
  <button @click="handleLoadingClick">toggle loading</button>
  <button @click="handleOptionClick">toggle option type</button>
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
    <c-event eventName="click" :handler="handleChartClick" />
  </c-base-chart>

  <c-chart style="width: 100%; height: 400px" backgroundColor="rgba(0,0,0,0.1)" :loading="loading" :resize="true">
    <c-x-axis type="category" />
    <c-y-axis />
    <c-dataset :source="chartData" :dimensions="dimensions" />
    <c-series type="line" />
    <c-series type="line" />
    <c-series :options="option" />
    <c-tooltip trigger="axis" />
    <c-legend />
    <c-event eventName="click" :handler="handleChartClick" />
  </c-chart>

  <c-base-chart style="width: 100%; height: 400px" :chartRef="handleChartInit" />
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
export default defineComponent({
  name: "BasicDemo",
  setup: () => {
    const dimensions = ["product", "2015", "2016", "2017"];
    const chartData = [
      { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
      { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
      { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
      { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
    ];

    const loading = ref<boolean>(false);

    const handleLoadingClick = () => {
      loading.value = !loading.value;
    };

    const handleChartClick = (e: any) => {
      console.log("@@@@@@@@@@@@", e);
    };

    const handleChartInit = (chart: any) => {
      chart.setOption({
        legend: {},
        tooltip: { trigger: "axis" },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "line" }, { type: "line" }, { type: "line" }],
        dataset: { dimensions: dimensions, source: chartData },
      });
    };

    const option = reactive({ type: "line" });

    const handleOptionClick = () => {
      option.type = option.type === "line" ? (option.type = "bar") : (option.type = "line");
    };

    return {
      dimensions,
      chartData,
      loading,
      handleLoadingClick,
      handleChartClick,
      handleChartInit,
      option,
      handleOptionClick,
    };
  },
});
</script>
