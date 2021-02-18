# `react-bridge`

> echarts react bridge

## Necessary

```
1.
window对象注入echarts. <script type="text/javascript" src="//cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js"></script>
或：
import * as echarts from 'echarts';
setEcharts(echarts);

2. 需要 "lodash": "^4.x", "react": "16.8+"
```

## Install

```
yarn add @echarts-start/react-bridge
```

## Usage

### common

> 推荐使用

```
import { Chart, Dataset, Event, Legend, Series, Tooltip, XAxis, YAxis } from "@echarts-start/react-bridge";

const data = [
  { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
  { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
  { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
  { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
];

const Demo1 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div style={{ textAlign: "center" }}>
      <a href={"#"} onClick={() => setLoading((prevState) => !prevState)}>
        toggle loading
      </a>
      <Chart
        style={{ width: "100%", height: 400 }}
        resize
        loading={loading}
        onChartClick={(e) => {
          console.log("click event=", e);
        }}>
        <XAxis type={"category"} />
        <YAxis />
        <Tooltip trigger={"axis"} />
        <Legend />
        <Series type={"line"} />
        <Series type={"line"} />
        <Series type={"line"} />
        <Dataset dimensions={dimensions} source={data} />
      </Chart>
    </div>
  );
};
```

### base

> 基础使用

```
import { BaseChart, Dataset, Event, Legend, Series, Tooltip, XAxis, YAxis, MethodLoading, Event } from "@echarts-start/react-bridge";
 <BaseChart style={{ width: "100%", height: 400 }}>
      <XAxis type={"category"} />
      <YAxis />
      <Tooltip trigger={"axis"} />
      <Legend />
      <Series type={"line"} />
      <Series type={"line"} />
      <Series type={"line"} />
      <Dataset dimensions={dimensions} source={data} />
      <MethodResize resize />
      <Event
        eventName={"click"}
        eventHandler={(e) => {
          console.log("click event=", e);
        }}
      />
    </BaseChart>
```

### ref

> 操作 chart 对象

```
import { Chart } from "@echarts-start/react-bridge";

const Demo2 = () => {
  return (
    <Chart
      style={{ width: "100%", height: 400 }}
      chartRef={(chart) => {
        chart.setOption({
          legend: {},
          tooltip: { trigger: "axis" },
          xAxis: { type: "category" },
          yAxis: {},
          series: [{ type: "line" }, { type: "line" }, { type: "line" }],
          dataset: { dimensions, source: data },
        });
      }}
    />
  );
};
```

[详细 demo](https://github.com/zxeryu/echarts-start/tree/master/example/demo-react)
