import React, { useState } from "react";
import {
  BaseChart,
  Chart,
  Dataset,
  Event,
  Legend,
  MethodResize,
  Series,
  Tooltip,
  XAxis,
  YAxis,
} from "@echarts-start/react-bridge";

const data = [
  { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
  { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
  { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
  { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
];

const dimensions = ["product", "2015", "2016", "2017"];

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

const Demo2 = () => {
  return (
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
  );
};

const Demo3 = () => {
  return (
    <Chart
      resize
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
      onChartClick={(e) => {
        console.log("click event=", e);
      }}
    />
  );
};

export const ChartDemo = () => {
  return (
    <div>
      ChartDemo
      <Demo1 />
      <Demo2 />
      <Demo3 />
    </div>
  );
};
