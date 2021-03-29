<template>
  <div>Single</div>
  <c-chart style="width: 100%; height: 300px">
    <c-x-axis type="category" />
    <c-y-axis />
    <c-series type="bar" />
    <c-series type="bar" />
    <c-series type="bar" />
    <c-legend />
    <c-tooltip />
    <c-dataset :source="data" />
  </c-chart>
  <div>Multi</div>
  <c-chart style="width: 80%; height: 600px">
    <c-x-axis type="category" :gridIndex="0" />
    <c-x-axis type="category" :gridIndex="1" />
    <c-y-axis :gridIndex="0" />
    <c-y-axis :gridIndex="1" />
    <c-grid bottom="55%" />
    <c-grid top="55%" />
    <c-series type="bar" />
    <c-series type="bar" />
    <c-series type="bar" />
    <c-series type="bar" :xAxisIndex="1" :yAxisIndex="1" />
    <c-series type="bar" :xAxisIndex="1" :yAxisIndex="1" />
    <c-series type="bar" :xAxisIndex="1" :yAxisIndex="1" />
    <c-series type="bar" :xAxisIndex="1" :yAxisIndex="1" />
    <c-legend />
    <c-tooltip />
    <c-dataset :source="data" />
  </c-chart>
  <div>数据到图形的映射（ series.encode ）</div>
  <c-chart style="width: 40%; height: 300px">
    <c-x-axis />
    <c-y-axis type="category" />
    <c-grid :containLabel="true" />
    <c-dataset :source="data2" />
    <c-series
      type="bar"
      :encode="{
        x: 'amount',
        y: 'product',
      }"
    />
  </c-chart>
  <div>视觉通道（颜色、尺寸等）的映射</div>
  <c-chart style="width: 40%; height: 300px">
    <c-x-axis name="amount" />
    <c-y-axis type="category" />
    <c-grid :containLabel="true" />
    <c-visual-map
      orient="horizontal"
      left="center"
      :min="10"
      :max="100"
      :text="['High Score', 'Low Score']"
      :dimension="0"
      :inRange="{ color: ['#D7DA8B', '#E15457'] }"
    />
    <c-dataset :source="data2" />
    <c-series
      type="bar"
      :encode="{
        x: 'amount',
        y: 'product',
      }"
    />
  </c-chart>
  <div>默认的 encode</div>
  <c-chart style="width: 80%; height: 600px" :noCoordinate="true">
    <c-legend />
    <c-tooltip />
    <c-dataset :source="data3" />
    <c-series type="pie" :series="{ radius: 60, center: ['25%', '30%'] }" />
    <c-series
      type="pie"
      :series="{ radius: 60, center: ['75%', '30%'] }"
      :encode="{ itemName: 'product', value: '2013' }"
    />
    <c-series
      type="pie"
      :series="{ radius: 60, center: ['25%', '75%'] }"
      :encode="{ itemName: 'product', value: '2014' }"
    />
    <c-series
      type="pie"
      :series="{ radius: 60, center: ['75%', '75%'] }"
      :encode="{ itemName: 'product', value: '2015' }"
    />
  </c-chart>
  <div>其他</div>
  <c-chart style="width: 70%; height: 800px">
    <c-legend />
    <c-tooltip trigger="axis" :showContent="false" />
    <c-dataset :source="data3" />
    <c-x-axis type="category" />
    <c-y-axis :gridIndex="0" />
    <c-grid top="55%" />
    <c-series type="line" :smooth="true" seriesLayoutBy="row" />
    <c-series type="line" :smooth="true" seriesLayoutBy="row" />
    <c-series type="line" :smooth="true" seriesLayoutBy="row" />
    <c-series type="line" :smooth="true" seriesLayoutBy="row" />
    <c-series id="pie" type="pie" radius="30%" :center="['50%', '25%']" :options="options" />
    <c-event eventName="updateAxisPointer" :handler="handleEvent" />
  </c-chart>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef } from "vue";
export default defineComponent({
  name: "DatasetDemo",
  setup: () => {
    const data = [
      ["product", "2015", "2016", "2017"],
      ["Matcha Latte", 43.3, 85.8, 93.7],
      ["Milk Tea", 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 86.4, 65.2, 82.5],
      ["Walnut Brownie", 72.4, 53.9, 39.1],
    ];

    const data2 = [
      ["score", "amount", "product"],
      [89.3, 58212, "Matcha Latte"],
      [57.1, 78254, "Milk Tea"],
      [74.4, 41032, "Cheese Cocoa"],
      [50.1, 12755, "Cheese Brownie"],
      [89.7, 20145, "Matcha Cocoa"],
      [68.1, 79146, "Tea"],
      [19.6, 91852, "Orange Juice"],
      [10.6, 101852, "Lemon Juice"],
      [32.7, 20112, "Walnut Brownie"],
    ];

    const data3 = [
      ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
      ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
      ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
      ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
      ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
    ];

    const toRefs = (target: any) => {
      const ret: any = {};
      for (const key in target) {
        ret[key] = toRef(target, key);
      }
      return ret;
    };

    const options = reactive({
      encode: {
        itemName: "product",
        value: "2012",
        tooltip: "2012",
      },
      label: {
        formatter: `{b}: {@2012}} ({d}%)`,
      },
    });

    const year = ref("2012");

    const handleEvent = (event: any) => {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        if (year.value === dimension) {
          return;
        }

        options.encode = reactive({
          itemName: "product",
          value: dimension,
          tooltip: dimension,
        });
        options.label = reactive({
          formatter: `{b}: {@${dimension}} ({d}%)`,
        });

        year.value = dimension;
      }
    };

    return {
      data,
      data2,
      data3,
      options,
      handleEvent,
    };
  },
});
</script>
