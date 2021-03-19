import { useChartContext } from "./Chart";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { EChartOption, EChartTitleOption } from "echarts";
import { get, isEqual, pick, omit } from "lodash";
import { generateId, shallowEqual } from "./utils";

/**
 *
 * @param key
 * @param deepCompareKeys 指定深度比较的key
 */
const createOption = <T>(key: string, deepCompareKeys?: string[]) => {
  return (props: T & { options?: T }) => {
    const { updateOption } = useChartContext();
    const ref = useRef<T>(); //上一次update对象
    const id = useMemo(() => get(props, "id", generateId() + key), []);

    const compare = useCallback((objA: any, objB: any) => {
      if (deepCompareKeys) {
        if (shallowEqual(omit(objA, deepCompareKeys), omit(objB, deepCompareKeys))) {
          return isEqual(pick(objA, deepCompareKeys), pick(objB, deepCompareKeys));
        }
        return false;
      }
      return shallowEqual(objA, objB);
    }, []);

    useEffect(() => {
      const otherProps = omit(props, "options");
      const options = get(props, "options");
      //浅比较，减少更新次数
      if (!compare(ref.current, props)) {
        if (key === "extra") {
          updateOption({ ...otherProps });
        } else {
          updateOption({ [key]: { ...props, ...options, id } });
        }
        ref.current = props;
      }
    }, [props]);
    return null;
  };
};

export const Tooltip = createOption<EChartOption.Tooltip>("tooltip");
export const XAxis = createOption<EChartOption.XAxis>("xAxis");
export const YAxis = createOption<EChartOption.YAxis>("yAxis");
export const Series = createOption<EChartOption.Series>("series");
export const Dataset = createOption<EChartOption.Dataset>("dataset", ["dimensions"]);
export const Legend = createOption<EChartOption.Legend>("legend");
export const Grid = createOption<EChartOption.Grid>("grid");
export const Title = createOption<EChartTitleOption>("title");
export const DataZoom = createOption<EChartOption.DataZoom>("dataZoom");
export const VisualMap = createOption<EChartOption.VisualMap>("visualMap");
export const AxisPointer = createOption<EChartOption.AxisPointer>("axisPointer");
export const Calendar = createOption<EChartOption.Calendar>("calendar");
export const TextStyle = createOption<EChartOption.BaseTextStyle>("textStyle");

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

export interface IExtraProps
  extends Pick<
    EChartOption,
    | "color"
    | "backgroundColor"
    | "animation"
    | "animationThreshold"
    | "animationDuration"
    | "animationEasing"
    | "animationDelay"
    | "animationDurationUpdate"
    | "animationEasingUpdate"
    | "animationDelayUpdate"
    | "progressive"
    | "progressiveThreshold"
    | "blendMode"
    | "hoverLayerThreshold"
    | "useUTC"
  > {}

//综合(单个属性)
export const Extra = createOption<IExtraProps>("extra", ["color"]);

export const Toolbox = createOption<object>("toolbox");
export const Brush = createOption<object>("brush");
export const Geo = createOption<object>("geo");
export const SingleAxis = createOption<object>("singleAxis");
export const Timeline = createOption<object>("timeline");
export const Graphic = createOption<object>("graphic");

//极坐标
export const Polar = createOption<object>("polar");
export const RadiusAxis = createOption<object>("radiusAxis");
export const AngleAxis = createOption<object>("angleAxis");
//雷达图坐标系组件 like polar
export const Radar = createOption<object>("radar");
//平行坐标系
export const Parallel = createOption<object>("parallel");
export const ParallelAxis = createOption<object>("parallelAxis");
