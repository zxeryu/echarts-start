import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { EChartOption, VisualMap } from "echarts";
import { CreateElement, VNode } from "vue";
import { get } from "lodash";
import { generateId } from "./util";

@Component
class BaseOption extends Vue {
  @Prop() id?: string;
  //options key
  protected optionKey!: string;

  private readonly uniqueId: string = generateId();

  @Inject("updateOption") updateOption!: (option: EChartOption) => void;

  mounted(): void {
    this.refreshOption();
  }

  refreshOption() {
    const propsData = this.$options.propsData;
    const id = get(propsData, "id", this.uniqueId + this.optionKey);
    if (this.optionKey === "extra") {
      this.updateOption({ ...propsData });
    } else {
      this.updateOption({ [this.optionKey]: { ...propsData, id } });
    }
  }

  render(createElement: CreateElement): VNode {
    return createElement("");
  }
}

@Component
class BaseAxis extends BaseOption {
  @Prop() show?: boolean;
  @Prop() gridIndex?: number;
  @Prop() offset?: number;
  @Prop() name?: string;
  @Prop() nameLocation?: "start" | "middle" | "center" | "end";
  @Prop() nameGap?: number;
  @Prop() nameRotate?: number;
  @Prop() inverse?: boolean;
  @Prop() boundaryGap?: boolean | (string | number)[];
  @Prop() min?: number | string | ((value: { min: number; max: number }) => number);
  @Prop() max?: number | string | ((value: { min: number; max: number }) => number);
  @Prop() scale?: boolean;
  @Prop() splitNumber?: number;
  @Prop() minInterval?: any;
  @Prop() interval?: number;
  @Prop() logBase?: number;
  @Prop() silent?: boolean;
  @Prop() triggerEvent?: boolean;
  @Prop() axisLine?: EChartOption.BasicComponents.Line;
  @Prop() axisTick?: EChartOption.BasicComponents.CartesianAxis.Tick;
  @Prop() minorTick?: EChartOption.BasicComponents.CartesianAxis.MinorTick;
  @Prop() axisLabel?: EChartOption.BasicComponents.CartesianAxis.Label;
  @Prop() splitLine?: EChartOption.BasicComponents.CartesianAxis.SplitLine;
  @Prop() minorSplitLine?: EChartOption.BasicComponents.CartesianAxis.MinorSplitLine;
  @Prop() splitArea?: EChartOption.BasicComponents.CartesianAxis.SplitArea;
  @Prop() data?: (string | number | EChartOption.BasicComponents.CartesianAxis.DataObject)[];
  @Prop() axisPointer?: EChartOption.BasicComponents.CartesianAxis.Pointer;
  @Prop() zlevel?: number;
  @Prop() z?: number;
}

@Component
export class XAxis extends BaseAxis {
  @Prop() position?: "top" | "bottom";
  @Prop() type?: EChartOption.BasicComponents.CartesianAxis.Type;

  optionKey = "xAxis";
}

@Component
export class YAxis extends BaseAxis {
  @Prop() position?: "left" | "right";
  @Prop() type?: EChartOption.BasicComponents.CartesianAxis.Type;

  optionKey = "yAxis";
}

@Component
export class Dataset extends BaseOption {
  @Prop() source?: any[] | object;
  @Prop() dimensions?: string[] | EChartOption.Dataset.DimensionObject[];

  optionKey = "dataset";

  @Watch("source")
  onSourceChange() {
    this.refreshOption();
  }

  @Watch("dimensions")
  onDimensionsChange() {
    this.refreshOption();
  }
}

@Component
export class Series extends BaseOption {
  @Prop() type?:
    | "line"
    | "bar"
    | "pie"
    | "scatter"
    | "effectScatter"
    | "radar"
    | "tree"
    | "treemap"
    | "sunburst"
    | "boxplot"
    | "candlestick"
    | "heatmap"
    | "map"
    | "parallel"
    | "lines"
    | "graph"
    | "sankey"
    | "funnel"
    | "gauge"
    | "pictorialBar"
    | "themeRiver"
    | "custom";
  @Prop() seriesLayoutBy?: "row" | "column";
  @Prop() xAxisIndex?: number;
  @Prop() yAxisIndex?: number;
  @Prop() dimensions?: string[] | EChartOption.Dataset.DimensionObject[];
  @Prop() encode?: object;

  optionKey = "series";
}

@Component
export class Tooltip extends BaseOption {
  //base
  @Prop() position?: EChartOption.Tooltip.Position.Type;
  @Prop() formatter?: EChartOption.Tooltip.Formatter;
  @Prop() backgroundColor?: string;
  @Prop() borderColor?: string;
  @Prop() borderWidth?: number;
  @Prop() padding?: number | number[];
  @Prop() textStyle?: EChartOption.BaseTextStyle;
  @Prop() extraCssText?: string;
  //cur
  @Prop() show?: boolean;
  @Prop() trigger?: "item" | "axis" | "none";
  @Prop() axisPointer?: EChartOption.Tooltip.AxisPointer;
  @Prop() showContent?: boolean;
  @Prop() alwaysShowContent?: boolean;
  @Prop() triggerOn?: "mousemove" | "click" | "mousemove|click" | "none";
  @Prop() showDelay?: number;
  @Prop() hideDelay?: number;
  @Prop() enterable?: boolean;
  @Prop() renderMode?: "html";
  @Prop() confine?: boolean;
  @Prop() transitionDuration?: number;

  optionKey = "tooltip";
}

@Component
export class Legend extends BaseOption {
  @Prop() type?: "plain" | "scroll";
  @Prop() show?: boolean;
  @Prop() zlevel?: number;
  @Prop() z?: number;
  @Prop() left?: string | number;
  @Prop() top?: string | number;
  @Prop() right?: string | number;
  @Prop() bottom?: string | number;
  @Prop() width?: number;
  @Prop() height?: number;
  @Prop() orient?: "horizontal" | "vertical";
  @Prop() align?: "auto" | "left" | "right";
  @Prop() padding?: number | number[];
  @Prop() itemGap?: number;
  @Prop() itemWidth?: number;
  @Prop() itemHeight?: number;
  @Prop() symbolKeepAspect?: boolean;
  @Prop() formatter?: string | EChartOption.Legend.Formatter;
  @Prop() selectedMode?: boolean | "single" | "multiple";
  @Prop() inactiveColor?: string;
  @Prop() selected?: object;
  @Prop() textStyle?: EChartOption.TextStyleWithRich;
  @Prop() tooltip?: EChartOption.Tooltip;
  @Prop() icon?: string;
  @Prop() data?: string[] | EChartOption.Legend.LegendDataObject[];
  @Prop() backgroundColor?: string;
  @Prop() borderColor?: string;
  @Prop() borderWidth?: number;
  @Prop() borderRadius?: number | number[];
  @Prop() shadowBlur?: number;
  @Prop() shadowColor?: string;
  @Prop() shadowOffsetX?: number;
  @Prop() shadowOffsetY?: number;
  @Prop() scrollDataIndex?: number;
  @Prop() pageButtonItemGap?: number;
  @Prop() pageButtonGap?: number;
  @Prop() pageButtonPosition?: "start" | "end";
  @Prop() pageFormatter?: string | EChartOption.Legend.PageFormatter;
  @Prop() pageIcons?: EChartOption.Legend.PageIcons;
  @Prop() pageIconColor?: string;
  @Prop() pageIconInactiveColor?: string;
  @Prop() pageIconSize?: number | number[];
  @Prop() pageTextStyle?: EChartOption.TextStyle;
  @Prop() animation?: boolean;
  @Prop() animationDurationUpdate?: number;

  optionKey = "legend";
}

@Component
export class Grid extends BaseOption {
  @Prop() show?: boolean;
  @Prop() zlevel?: number;
  @Prop() z?: number;
  @Prop() left?: number | string;
  @Prop() top?: number | string;
  @Prop() right?: number | string;
  @Prop() bottom?: number | string;
  @Prop() width?: number | string;
  @Prop() height?: number | string;
  @Prop() containLabel?: boolean;
  @Prop() backgroundColor?: string;
  @Prop() borderColor?: string;
  @Prop() borderWidth?: number;
  @Prop() shadowBlur?: number;
  @Prop() shadowColor?: string;
  @Prop() shadowOffsetX?: number;
  @Prop() shadowOffsetY?: number;
  @Prop() tooltip?: EChartOption.Tooltip;

  optionKey = "grid";
}

@Component
export class Title extends BaseOption {
  @Prop() show?: boolean;
  @Prop() text?: string;
  @Prop() link?: string;
  @Prop() target?: string;
  @Prop() textStyle?: EChartOption.TextStyleWithRich;
  @Prop() subtext?: string;
  @Prop() sublink?: string;
  @Prop() subtarget?: string;
  @Prop() subtextStyle?: EChartOption.TextStyleWithRich;
  @Prop() textAlign?: string;
  @Prop() textVerticalAlign?: string;
  @Prop() triggerEvent?: boolean;
  @Prop() padding?: number;
  @Prop() itemGap?: number;
  @Prop() zlevel?: number;
  @Prop() z?: number;
  @Prop() left?: string | number;
  @Prop() top?: string | number;
  @Prop() right?: string | number;
  @Prop() bottom?: string | number;
  @Prop() backgroundColor?: string;
  @Prop() borderColor?: string;
  @Prop() borderWidth?: number;
  @Prop() borderRadius?: number | number[];
  @Prop() shadowBlur?: number;
  @Prop() shadowColor?: number;
  @Prop() shadowOffsetX?: number;
  @Prop() shadowOffsetY?: number;

  optionKey = "title";
}

@Component
export class DataZoomInside extends BaseOption {
  @Prop() type?: string;
  @Prop() id?: string;
  @Prop() disabled?: boolean;
  @Prop() xAxisIndex?: number | number[];
  @Prop() yAxisIndex?: number | number[];
  @Prop() radiusAxisIndex?: number | number[];
  @Prop() angleAxisIndex?: number | number[];
  @Prop() singleAxisIndex?: number | number[];
  @Prop() filterMode?: "filter" | "weakFilter" | "empty" | "none";
  @Prop() start?: number;
  @Prop() end?: number;
  @Prop() startValue?: number | string | Date;
  @Prop() endValue?: number | string | Date;
  @Prop() minSpan?: number;
  @Prop() maxSpan?: number;
  @Prop() minValueSpan?: number | string | Date;
  @Prop() maxValueSpan?: number | string | Date;
  @Prop() orient?: string;
  @Prop() zoomLock?: boolean;
  @Prop() throttle?: number;
  @Prop() rangeMode?: string[];
  @Prop() zoomOnMouseWheel?: boolean;
  @Prop() moveOnMouseMove?: boolean;
  @Prop() moveOnMouseWheel?: boolean;
  @Prop() preventDefaultMouseMove?: boolean;

  optionKey = "dataZoom";
}

@Component
export class DataZoomSlider extends BaseOption {
  @Prop() type?: string;
  @Prop() id?: string;
  @Prop() show?: boolean;
  @Prop() backgroundColor?: string;
  @Prop() dataBackground?: object;
  @Prop() fillerColor?: string;
  @Prop() borderColor?: string;
  @Prop() handleIcon?: string;
  @Prop() handleSize?: number | string;
  @Prop() handleStyle?: object;
  @Prop() labelPrecision?: number;
  @Prop() labelFormatter?: string | Function;
  @Prop() showDetail?: boolean;
  @Prop() showDataShadow?: string;
  @Prop() realtime?: boolean;
  @Prop() textStyle?: EChartOption.BaseTextStyle;
  @Prop() xAxisIndex?: number | number[];
  @Prop() yAxisIndex?: number | number[];
  @Prop() radiusAxisIndex?: number | number[];
  @Prop() angleAxisIndex?: number | number[];
  @Prop() singleAxisIndex?: number | number[];
  @Prop() filterMode?: "filter" | "weakFilter" | "empty" | "none";
  @Prop() start?: number;
  @Prop() end?: number;
  @Prop() startValue?: number | string | Date;
  @Prop() endValue?: number | string | Date;
  @Prop() minSpan?: number;
  @Prop() maxSpan?: number;
  @Prop() minValueSpan?: number | string | Date;
  @Prop() maxValueSpan?: number | string | Date;
  @Prop() orient?: "vertical" | "horizontal";
  @Prop() zoomLock?: boolean;
  @Prop() throttle?: number;
  @Prop() rangeMode?: string[];
  @Prop() zlevel?: number;
  @Prop() z?: number;
  @Prop() left?: string | number;
  @Prop() top?: string | number;
  @Prop() right?: string | number;
  @Prop() bottom?: string | number;

  optionKey = "dataZoom";
}

@Component
export class VisualMapContinuous extends BaseOption {
  @Prop() type?: "continuous";
  @Prop() id?: string;
  @Prop() min?: number;
  @Prop() max?: number;
  @Prop() range?: number[];
  @Prop() calculable?: boolean;
  @Prop() realtime?: boolean;
  @Prop() inverse?: boolean;
  @Prop() precision?: number;
  @Prop() itemWidth?: number;
  @Prop() itemHeight?: number;
  @Prop() align?: "auto" | "left" | "right" | "top" | "bottom";
  @Prop() text?: string[];
  @Prop() textGap?: number;
  @Prop() show?: boolean;
  @Prop() dimension?: string | number;
  @Prop() seriesIndex?: number | number[];
  @Prop() hoverLink?: boolean;
  @Prop() @Prop() outOfRange?: VisualMap.RangeObject;
  @Prop() controller?: {
    inRange?: VisualMap.RangeObject;
    outOfRange?: VisualMap.RangeObject;
  };
  @Prop() zlevel?: number;
  @Prop() z?: number;
  @Prop() left?: number | string;
  @Prop() top?: number | string;
  @Prop() right?: number | string;
  @Prop() bottom?: number | string;
  @Prop() orient?: "vertical" | "horizontal";
  @Prop() padding?: number | number[];
  @Prop() backgroundColor?: string;
  @Prop() borderColor?: string;
  @Prop() borderWidth?: number;
  @Prop() color?: string[];
  @Prop() textStyle?: EChartOption.BaseTextStyleWithRich;
  @Prop() formatter?: string | Function;

  optionKey = "visualMap";
}

@Component
export class VisualMapPiecewise extends BaseOption {
  @Prop() type?: "piecewise";
  @Prop() id?: string;
  @Prop() splitNumber?: number;
  @Prop() pieces?: VisualMap.PiecesObject[];
  @Prop() categories?: string[];
  @Prop() min?: number;
  @Prop() max?: number;
  @Prop() minOpen?: boolean;
  @Prop() maxOpen?: boolean;
  @Prop() selectedMode?: "multiple" | "single";
  @Prop() inverse?: boolean;
  @Prop() precision?: number;
  @Prop() itemWidth?: number;
  @Prop() itemHeight?: number;
  @Prop() align?: "auto" | "left" | "right";
  @Prop() text?: string[];
  @Prop() textGap?: number | number[];
  @Prop() showLabel?: boolean;
  @Prop() itemGap?: number;
  @Prop() itemSymbol?: string;
  @Prop() show?: boolean;
  @Prop() dimension?: string | number;
  @Prop() seriesIndex?: number | number[];
  @Prop() hoverLink?: boolean;
  @Prop() inRange?: VisualMap.RangeObject;
  @Prop() outOfRange?: VisualMap.RangeObject;
  @Prop() controller?: {
    inRange?: VisualMap.RangeObject;
    outOfRange?: VisualMap.RangeObject;
  };
  @Prop() zlevel?: number;
  @Prop() z?: number;
  @Prop() left?: number | string;
  @Prop() top?: number | string;
  @Prop() right?: number | string;
  @Prop() bottom?: number | string;
  @Prop() orient?: "vertical" | "horizontal";
  @Prop() padding?: number | number[];
  @Prop() backgroundColor?: string;
  @Prop() @Prop() borderWidth?: number;
  @Prop() color?: string[];
  @Prop() textStyle?: EChartOption.TextStyle;
  @Prop() formatter?: string | Function;

  optionKey = "visualMap";
}

@Component
export class Calendar extends BaseOption {
  //base
  @Prop() show?: boolean;
  @Prop() type?: "line" | "shadow" | "none";
  @Prop() snap?: boolean;
  @Prop() z?: number;
  @Prop() label?: EChartOption.BasicComponents.CartesianAxis.PointerLabel;
  @Prop() lineStyle?: EChartOption.LineStyle;
  @Prop() shadowStyle?: {
    color?: string;
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    opacity?: number;
  };
  @Prop() triggerTooltip?: boolean;
  @Prop() value?: number;
  @Prop() status?: boolean;
  @Prop() handle?: {
    show?: boolean;
    icon?: any;
    size?: number | number[];
    margin?: number;
    color?: string;
    throttle?: number;
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
  };
  //cur
  @Prop() link?: object[];
  @Prop() triggerOn?: "mousemove" | "click" | "mousemove|click" | "none";

  optionKey = "axisPointer";
}

@Component
export class AxisPointer extends BaseOption {
  @Prop() zlevel?: number;
  @Prop() z?: number;
  @Prop() left?: number | string;
  @Prop() top?: number | string;
  @Prop() right?: number | string;
  @Prop() bottom?: number | string;
  @Prop() width?: number | string;
  @Prop() height?: number | string;
  @Prop() range?: number | string | number[] | string[];
  @Prop() cellSize?: number | "auto" | ("auto" | number)[];
  @Prop() orient?: "horizontal" | "vertical";
  @Prop() splitLine?: {
    show?: boolean;
    lineStyle?: EChartOption.LineStyle;
  };
  @Prop() itemStyle?: {
    color?: string;
    borderColor?: string;
    borderWidth?: number;
    borderType?: "solid" | "dashed" | "dotted";
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    opacity?: number;
  };
  @Prop() dayLabel?: EChartOption.Calendar.DayLabel;
  @Prop() monthLabel?: EChartOption.Calendar.MonthLabel;
  @Prop() yearLabel?: EChartOption.Calendar.YearLabel;
  @Prop() silent?: boolean;

  optionKey = "calendar";
}

@Component
export class TextStyle extends BaseOption {
  //base
  @Prop() color?: string;
  @Prop() fontStyle?: "normal" | "italic" | "oblique";
  @Prop() fontWeight?: "normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400";
  @Prop() fontFamily?: string;
  @Prop() fontSize?: number;
  @Prop() lineHeight?: number;
  @Prop() width?: number | string;
  @Prop() height?: number | string;
  @Prop() textBorderColor?: string;
  @Prop() textBorderWidth?: number;
  @Prop() textShadowColor?: string;
  @Prop() textShadowBlur?: number;
  @Prop() textShadowOffsetX?: number;
  @Prop() textShadowOffsetY?: number;
  //cur
  @Prop() align?: string;
  @Prop() verticalAlign?: string;
  @Prop() backgroundColor?: string | object;
  @Prop() borderColor?: string;
  @Prop() borderWidth?: number;
  @Prop() borderRadius?: number;
  @Prop() padding?: number | number[];
  @Prop() shadowColor?: string;
  @Prop() shadowBlur?: number;
  @Prop() shadowOffsetX?: number;
  @Prop() shadowOffsetY?: number;

  optionKey = "textStyle";
}

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

@Component
export class ExtraProps extends Vue {
  @Prop() color?: string[];
  @Prop() backgroundColor?: string;
  @Prop() animation?: boolean;
  @Prop() animationThreshold?: number;
  @Prop() animationDuration?: number;
  @Prop() animationEasing?: string;
  @Prop() animationDelay?: number | Function;
  @Prop() animationDurationUpdate?: number | Function;
  @Prop() animationEasingUpdate?: string;
  @Prop() animationDelayUpdate?: number | Function;
  @Prop() progressive?: number;
  @Prop() progressiveThreshold?: number;
  @Prop() blendMode?: string;
  @Prop() hoverLayerThreshold?: number;
  @Prop() useUTC?: boolean;
}

@Component
export class Extra extends mixins(BaseOption, ExtraProps) {
  optionKey = "extra";
}
