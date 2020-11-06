import { Component, Prop, Provide, ProvideReactive, Ref, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { CreateElement, VNode } from "vue";
import { EChartOption, ECharts as IEChart } from "echarts";
import { assign, forEach, get, has, isArray, keys, map, omit, size, some, pick } from "lodash";
import { getECharts } from "./util";
import { ChartMethodProps, ChartMethods } from "./Method";
import { Extra, ExtraKeys, ExtraProps } from "./Options";
import { COLOR_PLATE_24 } from "./theme";

@Component
class BaseChartProps extends Vue {
  @Prop() theme?: object | string;
  @Prop() opts?: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
  };
  @Prop() chartRef?: (chartRef: IEChart) => void;
  @Prop() noCoordinate?: boolean; //是否需要坐标轴
}

@Component
export class BaseChart extends BaseChartProps {
  @Ref("chartDiv") chartDiv!: HTMLDivElement;

  private xAxis: EChartOption[] = [];
  private yAxis: EChartOption[] = [];
  private grid: EChartOption[] = [];
  private isHaveGrid = false;
  private list: EChartOption[] = [];

  @ProvideReactive("chart") chart: IEChart | undefined = undefined;
  @Provide("updateOption") updateOption: (option: EChartOption) => void = this.updateOptions;

  data(): object {
    return {
      chart: null,
    };
  }

  mounted(): void {
    this.chart = getECharts().init(this.chartDiv, this.theme, this.opts);
    this.chartRef && this.chartRef(this.chart);
  }

  setOption(chart: IEChart, option: EChartOption) {
    if (size(keys(option)) > 1) {
      chart.setOption(option);
      return;
    }
    const oldOption = chart.getOption();
    forEach(option, (v, k) => {
      const id = get(v, "id");
      const oldV = get(oldOption, k);
      if (id && typeof oldV === "object") {
        if (isArray(oldV)) {
          //仅判断默认的添加或更新
          const isChange = some(oldV, (item) => !get(item, "id") || get(item, "uniqueId") === id);
          if (isChange) {
            const o = map(oldV, (item) => {
              //默认属性
              if (!get(item, "id") || get(item, "uniqueId") === id) {
                return assign(item, omit(v as object, "id"), { uniqueId: id });
              }
              return item;
            });
            chart.setOption({ [k]: o });
            return;
          }
        } else {
          if (!get(oldV, "id") || get(oldV, "uniqueId") === id) {
            chart.setOption({ [k]: assign(oldV, omit(v as object, "id"), { uniqueId: id }) });
            return;
          }
        }
      }
      chart.setOption(option);
    });
  }

  updateOptions(option: EChartOption) {
    if (!this.chart) {
      return;
    }

    if (this.noCoordinate) {
      console.log("###################", option);
      this.setOption(this.chart, option);
      return;
    }
    const oldOption = this.chart.getOption();
    if (!has(oldOption, "xAxis") || !has(oldOption, "yAxis")) {
      if (has(option, "xAxis")) {
        //保存xAxis
        this.xAxis.push(option);
        this.isHaveGrid = this.isHaveGrid || has(option, ["xAxis", "gridIndex"]);
      } else if (has(option, "yAxis")) {
        //保存第yAxis
        this.yAxis.push(option);
        this.isHaveGrid = this.isHaveGrid || has(option, ["yAxis", "gridIndex"]);
      } else if (has(option, "grid")) {
        this.grid.push(option);
      } else {
        //保存option
        this.list.push(option);
      }

      let isPrepared = false;
      if (this.isHaveGrid) {
        const xSize = size(this.xAxis);
        if (xSize > 0 && xSize === size(this.yAxis) && xSize === size(this.grid)) {
          forEach(this.xAxis, (_, i) => {
            this.chart?.setOption(assign({}, this.xAxis[i], this.yAxis[i], this.grid[i]));
          });
          isPrepared = true;
        }
      } else {
        const xSize = size(this.xAxis);
        if (xSize > 0 && xSize === size(this.yAxis)) {
          forEach(this.xAxis, (_, i) => {
            this.chart?.setOption(assign({}, this.xAxis[i], this.yAxis[i]));
          });
          isPrepared = true;
        }
      }

      if (isPrepared) {
        forEach(this.list, (item) => {
          this.chart && this.setOption(this.chart, item);
        });
        this.xAxis = [];
        this.yAxis = [];
        this.grid = [];
        this.list = [];
      }
    } else {
      //更新options
      this.setOption(this.chart, option);
    }
  }

  render(createElement: CreateElement): VNode {
    return createElement("div", { ref: "chartDiv" }, this.chart ? this.$slots.default : []);
  }
}

@Component
export class Chart extends mixins(BaseChartProps, ChartMethodProps, ExtraProps) {
  render(createElement: CreateElement): VNode {
    return createElement(
      BaseChart,
      {
        props: pick(this.$options.propsData, ["theme", "opts", "chartRef", "noCoordinate"]),
      },
      [
        createElement(ChartMethods, { props: pick(this.$options.propsData, ["resize", "loading"]) }),
        createElement(Extra, { props: { color: COLOR_PLATE_24, ...pick(this.$options.propsData, ExtraKeys) } }),
        this.$slots.default,
      ],
    );
  }
}
