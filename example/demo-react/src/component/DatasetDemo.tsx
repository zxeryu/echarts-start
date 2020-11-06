import React, { useState } from "react";
import {
  Chart,
  XAxis,
  YAxis,
  Series,
  Legend,
  Tooltip,
  Dataset,
  Grid,
  VisualMap,
  Event,
} from "@echarts-start/react-bridge";

const data = [
  ["product", "2015", "2016", "2017"],
  ["Matcha Latte", 43.3, 85.8, 93.7],
  ["Milk Tea", 83.1, 73.4, 55.1],
  ["Cheese Cocoa", 86.4, 65.2, 82.5],
  ["Walnut Brownie", 72.4, 53.9, 39.1],
];

const Single = () => {
  return (
    <Chart style={{ width: "100%", height: 300 }}>
      <XAxis type={"category"} />
      <YAxis />
      <Series type={"bar"} />
      <Series type={"bar"} />
      <Series type={"bar"} />
      <Legend />
      <Tooltip />
      <Dataset source={data} />
    </Chart>
  );
};

const Multi = () => {
  return (
    <Chart style={{ width: "80%", height: 600 }}>
      <XAxis type={"category"} gridIndex={0} />
      <XAxis type={"category"} gridIndex={1} />
      <YAxis gridIndex={0} />
      <YAxis gridIndex={1} />
      <Grid bottom={"55%"} />
      <Grid top={"55%"} />
      <Series type={"bar"} />
      <Series type={"bar"} />
      <Series type={"bar"} />
      <Series type={"bar"} xAxisIndex={1} yAxisIndex={1} />
      <Series type={"bar"} xAxisIndex={1} yAxisIndex={1} />
      <Series type={"bar"} xAxisIndex={1} yAxisIndex={1} />
      <Series type={"bar"} xAxisIndex={1} yAxisIndex={1} />
      <Legend />
      <Tooltip />
      <Dataset source={data} />
    </Chart>
  );
};

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

const Encode = () => {
  return (
    <Chart style={{ width: "40%", height: 300 }}>
      <XAxis />
      <YAxis type={"category"} />
      <Grid containLabel={true} />
      <Dataset source={data2} />
      <Series
        type={"bar"}
        encode={{
          // 将 "amount" 列映射到 X 轴。
          x: "amount",
          // 将 "product" 列映射到 Y 轴。
          y: "product",
        }}
      />
    </Chart>
  );
};

const VisualMapDemo = () => {
  return (
    <Chart style={{ width: "40%", height: 300 }}>
      <XAxis name={"amount"} />
      <YAxis type={"category"} />
      <Grid containLabel={true} />
      <VisualMap
        orient={"horizontal"}
        left={"center"}
        min={10}
        max={100}
        text={["High Score", "Low Score"]}
        dimension={0}
        inRange={{ color: ["#D7DA8B", "#E15457"] }}
      />
      <Dataset source={data2} />
      <Series
        type={"bar"}
        encode={{
          // 将 "amount" 列映射到 X 轴。
          x: "amount",
          // 将 "product" 列映射到 Y 轴。
          y: "product",
        }}
      />
    </Chart>
  );
};

const data3 = [
  ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
  ["Matcha Latte", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
  ["Milk Tea", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
  ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
  ["Walnut Brownie", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
];

const PieEncode = () => {
  return (
    <Chart style={{ width: "80%", height: 600 }} noCoordinate>
      <Legend />
      <Tooltip />
      <Dataset source={data3} />
      <Series type={"pie"} radius={60} center={["25%", "30%"]} />
      <Series type={"pie"} radius={60} center={["75%", "30%"]} encode={{ itemName: "product", value: "2013" }} />
      <Series type={"pie"} radius={60} center={["25%", "75%"]} encode={{ itemName: "product", value: "2014" }} />
      <Series type={"pie"} radius={60} center={["75%", "75%"]} encode={{ itemName: "product", value: "2015" }} />
    </Chart>
  );
};

const Extra = () => {
  const [year, setYear] = useState<string>("2012");
  return (
    <Chart style={{ width: "70%", height: 800 }}>
      <Legend />
      <Tooltip trigger={"axis"} showContent={false} />
      <Dataset source={data3} />
      <XAxis type={"category"} />
      <YAxis gridIndex={0} />
      <Grid top={"55%"} />
      <Series type={"line"} smooth seriesLayoutBy={"row"} />
      <Series type={"line"} smooth seriesLayoutBy={"row"} />
      <Series type={"line"} smooth seriesLayoutBy={"row"} />
      <Series type={"line"} smooth seriesLayoutBy={"row"} />
      <Series
        id={"pie"}
        type={"pie"}
        radius={"30%"}
        center={["50%", "25%"]}
        label={{
          formatter: `{b}: {@${year}} ({d}%)`,
        }}
        encode={{ itemName: "product", value: year, tooltip: year }}
      />
      <Event
        eventName={"updateAxisPointer" as any}
        eventHandler={(event: any) => {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            setYear(dimension);
          }
        }}
      />
    </Chart>
  );
};

export const DatasetDemo = () => {
  return (
    <div>
      <div>Single</div>
      <Single />
      <div>Multi</div>
      <Multi />
      <div>数据到图形的映射（ series.encode ）</div>
      <Encode />
      <div>视觉通道（颜色、尺寸等）的映射</div>
      <VisualMapDemo />
      <div>默认的 encode</div>
      <PieEncode />
      <div>其他</div>
      <Extra />
    </div>
  );
};
