# `vue-bridge`

> echarts vue bridge

## Necessary

```
1. window对象注入echart. <script type="text/javascript" src="//cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js"></script>
2. 需要 "lodash": "^4.x", "vue": "2.6.x", "uuid": "^8.x"
```

## Install

```
yarn add @echarts-start/vue-bridge
```

## Usage

### common

> 推荐使用

```
import { XAxis, YAxis, Dataset, Series, Tooltip, Legend, Chart } from "@echarts-start/vue-bridge";

  data(){
    return {
        loading: false,
          dimensions: ["product", "2015", "2016", "2017"],
          chartData : [
            { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
            { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
            { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
            { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
          ]
    }
  }

<Chart
  style="width: 100%; height: 400px"
  backgroundColor="rgba(0,0,0,0.1)"
  :loading="loading"
  :resize="true"
  :onChartClick="handleChartClick"
>
      <XAxis type="category" />
      <YAxis />
      <Dataset :source="chartData" :dimensions="dimensions" />
      <Series type="line" />
      <Series type="line" />
      <Series type="line" />
      <Tooltip trigger="axis" />
      <Legend />
    </Chart>
```

### base

> 基础使用

```vue
import { XAxis, YAxis, Dataset, Series, Tooltip, Legend, BaseChart, MethodLoading, MethodResize, Event } from
"@echarts-start/vue-bridge";

<BaseChart style="width: 100%; height: 400px">
      <XAxis type="category" />
      <YAxis />
      <Dataset :source="chartData" :dimensions="dimensions" />
      <Series type="line" />
      <Series type="line" />
      <Series type="line" />
      <Tooltip trigger="axis" />
      <Legend />
      <MethodLoading :loading="loading" />
      <MethodResize :resize="true" />
      <Event eventName="click" :eventHandler="handleChartClick" />
    </BaseChart>
```

### ref

> 操作 chart 对象

```
import { Chart } from "@echarts-start/vue-bridge";
<Chart style="width: 100%; height: 400px" :chartRef="handleChartInit" />
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
```

[详细 demo](https://github.com/zxeryu/echarts-start/tree/master/example/demo-vue)
