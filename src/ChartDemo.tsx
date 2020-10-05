import React, { useMemo, useState } from "react";
import { Chart, Dataset, Legend, Series, Tooltip, XAxis, YAxis } from "@echarts-start/react-bridge";

export const ChartDemo = () => {
  const datasetData = useMemo(
    () => [
      { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
      { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
      { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
      { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
    ],
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div>
      ChartDemo
      <button onClick={() => setLoading((prevState) => !prevState)}>toggle loading</button>
      <Chart
        style={{ width: "100%", height: 400 }}
        resize
        loading={loading}
        onChartClick={(e) => {
          console.log("click==========############", e);
        }}>
        <XAxis type={"category"} />
        <YAxis />
        <Tooltip trigger={"axis"} />
        <Legend />
        <Series type={"line"} />
        <Series type={"line"} />
        <Series type={"line"} />
        <Dataset dimensions={["product", "2015", "2016", "2017"]} source={datasetData} />
      </Chart>
    </div>
  );
};