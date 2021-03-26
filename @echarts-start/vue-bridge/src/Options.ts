import { Component, Inject, Prop, Vue, Watch } from "vue-property-decorator";
import { EChartOption, EChartTitleOption } from "echarts";
import { CreateElement, VNode } from "vue";
import { get, omit } from "lodash";
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
    const target = get(propsData, this.optionKey);
    const mergeProps = { ...this.$attrs, ...propsData };
    if (this.optionKey === "extra") {
      this.updateOption({ ...mergeProps });
    } else {
      if (target) {
        this.updateOption({ [this.optionKey]: { ...omit(mergeProps, this.optionKey), ...target, id } });
      } else {
        this.updateOption({ [this.optionKey]: { ...mergeProps, id } });
      }
    }
  }

  render(createElement: CreateElement): VNode {
    return createElement("");
  }
}

@Component
export class XAxis extends BaseOption {
  //watch
  @Prop() xAxis?: EChartOption.XAxis;

  optionKey = "xAxis";

  @Watch("xAxis")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class YAxis extends BaseOption {
  //watch
  @Prop() yAxis?: EChartOption.YAxis;

  optionKey = "yAxis";

  @Watch("yAxis")
  onChange() {
    this.refreshOption();
  }
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
  //series 兼容方案
  @Prop() series?: EChartOption.Series;

  optionKey = "series";

  @Watch("series")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Tooltip extends BaseOption {
  //watch
  @Prop() tooltip?: EChartOption.Tooltip;

  optionKey = "tooltip";

  @Watch("tooltip")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Legend extends BaseOption {
  //watch
  @Prop() legend?: EChartOption.Legend;

  optionKey = "legend";

  @Watch("legend")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Grid extends BaseOption {
  //watch
  @Prop() grid?: EChartOption.Grid;

  optionKey = "grid";

  @Watch("grid")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Title extends BaseOption {
  //watch
  @Prop() title?: EChartTitleOption;

  optionKey = "title";

  @Watch("title")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class DataZoom extends BaseOption {
  //watch
  @Prop() dataZoom?: EChartOption.DataZoom;

  optionKey = "dataZoom";

  @Watch("dataZoom")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class VisualMap extends BaseOption {
  //watch
  @Prop() visualMap?: EChartOption.VisualMap;

  optionKey = "visualMap";

  @Watch("visualMap")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Calendar extends BaseOption {
  //watch
  @Prop() calendar?: EChartOption.Calendar;

  optionKey = "calendar";

  @Watch("calendar")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class AxisPointer extends BaseOption {
  //watch
  @Prop() axisPointer?: EChartOption.AxisPointer;

  optionKey = "axisPointer";

  @Watch("axisPointer")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class TextStyle extends BaseOption {
  //watch
  @Prop() textStyle?: EChartOption.TextStyle;

  optionKey = "textStyle";

  @Watch("textStyle")
  onChange() {
    this.refreshOption();
  }
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
export class Extra extends BaseOption {
  optionKey = "extra";
}

@Component
export class Toolbox extends BaseOption {
  @Prop() toolbox?: object;

  optionKey = "toolbox";

  @Watch("toolbox")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Brush extends BaseOption {
  @Prop() brush?: object;

  optionKey = "brush";

  @Watch("brush")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Geo extends BaseOption {
  @Prop() geo?: object;

  optionKey = "geo";

  @Watch("geo")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class SingleAxis extends BaseOption {
  @Prop() toolbox?: object;

  optionKey = "singleAxis";

  @Watch("toolbox")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Timeline extends BaseOption {
  @Prop() timeline?: object;

  optionKey = "timeline";

  @Watch("timeline")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Graphic extends BaseOption {
  @Prop() graphic?: object;

  optionKey = "graphic";

  @Watch("graphic")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Polar extends BaseOption {
  @Prop() polar?: object;

  optionKey = "polar";

  @Watch("polar")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class RadiusAxis extends BaseOption {
  @Prop() radiusAxis?: object;

  optionKey = "radiusAxis";

  @Watch("radiusAxis")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class AngleAxis extends BaseOption {
  @Prop() angleAxis?: object;

  optionKey = "angleAxis";

  @Watch("angleAxis")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Radar extends BaseOption {
  @Prop() radar?: object;

  optionKey = "radar";

  @Watch("radar")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class Parallel extends BaseOption {
  @Prop() parallel?: object;

  optionKey = "parallel";

  @Watch("parallel")
  onChange() {
    this.refreshOption();
  }
}

@Component
export class ParallelAxis extends BaseOption {
  @Prop() parallelAxis?: object;

  optionKey = "parallelAxis";

  @Watch("parallelAxis")
  onChange() {
    this.refreshOption();
  }
}
