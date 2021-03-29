import { EChartOption } from "echarts";
import { get } from "lodash";
import { generateId } from "./util";
import { defineComponent, inject, watch, onBeforeUnmount } from "vue";

const createOption = (key: string) => {
  return defineComponent({
    props: {
      options: Object,
    },
    setup: (props, context) => {
      const updateOption = inject<(o: EChartOption) => void>("updateOption")!;

      const id = get({ ...context.attrs, ...props }, "id", generateId() + key);

      const attrProps = context.attrs;

      if (key === "extra") {
        updateOption({ ...attrProps });
      } else {
        updateOption({ [key]: { ...attrProps, ...props.options, id } });
      }

      const handleStop = watch(props.options as any, () => {
        updateOption({ [key]: { ...attrProps, ...props.options, id } });
      });

      onBeforeUnmount(() => {
        handleStop();
      });
    },
  });
};

export const Tooltip = createOption("tooltip");
export const XAxis = createOption("xAxis");
export const YAxis = createOption("yAxis");
export const Series = createOption("series");
export const Dataset = createOption("dataset");
export const Legend = createOption("legend");
export const Grid = createOption("grid");
export const Title = createOption("title");
export const DataZoom = createOption("dataZoom");
export const VisualMap = createOption("visualMap");
export const AxisPointer = createOption("axisPointer");
export const Calendar = createOption("calendar");
export const TextStyle = createOption("textStyle");

export const ExtraKeys = [
  "color",
  "backgroundColor",
  "animation",
  "animationThreshold",
  "animationDuration",
  "animationEasing",
  "animationDelay",
  "animationDurationUpdate",
  "animationEasingUpdate",
  "animationDelayUpdate",
  "progressive",
  "progressiveThreshold",
  "blendMode",
  "hoverLayerThreshold",
  "useUTC",
];

//综合(单个属性)
export const Extra = createOption("extra");

export const Toolbox = createOption("toolbox");
export const Brush = createOption("brush");
export const Geo = createOption("geo");
export const SingleAxis = createOption("singleAxis");
export const Timeline = createOption("timeline");
export const Graphic = createOption("graphic");

//极坐标
export const Polar = createOption("polar");
export const RadiusAxis = createOption("radiusAxis");
export const AngleAxis = createOption("angleAxis");
//雷达图坐标系组件 like polar
export const Radar = createOption("radar");
//平行坐标系
export const Parallel = createOption("parallel");
export const ParallelAxis = createOption("parallelAxis");
