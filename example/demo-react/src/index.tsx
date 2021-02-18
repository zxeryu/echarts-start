import React from "react";
import ReactDOM from "react-dom";
import { ChartDemo } from "./ChartDemo";
import * as echarts from "echarts";
import { setECharts } from "../../../@echarts-start/react-bridge/src";

setECharts(echarts);

ReactDOM.render(
  <div>
    <ChartDemo />
  </div>,
  document.getElementById("root"),
);
