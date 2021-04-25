import React from "react";
import ReactDOM from "react-dom";
import { ChartDemo } from "./ChartDemo";
import { setECharts } from "@echarts-start/react-bridge";
// import * as echarts from "echarts";

import * as echarts from "echarts/core";
import { BarChart, PieChart, FunnelChart, TreeChart, LineChart, LinesChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  AriaComponent,
  DatasetComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  LineChart,
  LinesChart,
  BarChart,
  PieChart,
  TreeChart,
  FunnelChart,
  CanvasRenderer,
  GridComponent,
  AriaComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
]);

setECharts(echarts as any);

ReactDOM.render(
  <div>
    <ChartDemo />
  </div>,
  document.getElementById("root"),
);
