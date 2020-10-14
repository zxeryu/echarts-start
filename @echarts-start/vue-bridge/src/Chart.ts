import { Component, Prop, Provide, Ref, Vue } from "vue-property-decorator";
import { CreateElement, VNode } from "vue";
import { EChartOption, ECharts as IEChart } from "echarts";
import { assign, forEach, get, has, isArray, keys, map, omit, size, some } from "lodash";
import { getECharts } from "./util";

@Component
export class BaseChart extends Vue {
  @Prop() theme?: object | string;
  @Prop() opts?: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
  };
  @Prop() chartRef?: (chartRef: IEChart) => void;

  @Ref("chartDiv") chartDiv!: HTMLDivElement;

  private xAxis: EChartOption | undefined;
  private yAxis: EChartOption | undefined;
  private list: EChartOption[] = [];

  @Provide("chart") chart: IEChart | undefined = undefined;
  @Provide("updateOption") updateOption: (option: EChartOption) => void = this.updateOptions;

  data(): object {
    return {
      chart: null,
    };
  }

  mounted(): void {
    this.chart = getECharts().init(this.chartDiv, this.theme, this.opts);
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
    const oldOption = this.chart.getOption();
    if (!has(oldOption, "xAxis") || !has(oldOption, "yAxis")) {
      if (!this.xAxis && has(option, "xAxis")) {
        //保存第一个xAxis
        this.xAxis = option;
      } else if (!this.yAxis && has(option, "yAxis")) {
        //保存第一个yAxis
        this.yAxis = option;
      } else {
        //保存option
        this.list.push(option);
      }
      if (this.xAxis && this.yAxis) {
        this.chart.setOption(assign(this.xAxis, this.yAxis));
        forEach(this.list, (item) => {
          this.chart && this.setOption(this.chart, item);
        });
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
