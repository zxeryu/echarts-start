import { Component, InjectReactive, Prop, Vue, Watch } from "vue-property-decorator";
import { CreateElement, VNode } from "vue";
import { ECharts as IEChart, EChartsLoadingOption, EChartsResizeOption } from "echarts";
import { debounce } from "lodash";

export interface IChartMethodProps {
  resize?: boolean | EChartsResizeOption;
  loading?: boolean | EChartsLoadingOption;
}

@Component
class BaseMethod extends Vue {
  render(createElement: CreateElement): VNode {
    return createElement("");
  }
}

@Component
export class MethodResize extends BaseMethod {
  @InjectReactive() chart!: IEChart;

  @Prop() resize?: IChartMethodProps["resize"];

  mounted(): void {
    window.addEventListener("resize", this.handleResize);
  }

  beforeDestroy(): void {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = debounce(this.resizeOperate, 300);

  resizeOperate() {
    if (this.resize) {
      if (typeof this.resize === "boolean") {
        this.chart.resize();
      } else {
        this.chart.resize(this.resize);
      }
    }
  }
}

@Component
export class MethodLoading extends BaseMethod {
  @InjectReactive() chart!: IEChart;

  @Prop() loading?: IChartMethodProps["loading"];

  mounted(): void {
    this.onLoadingChange();
  }

  @Watch("loading")
  onLoadingChange() {
    if (typeof this.loading === "boolean") {
      this.loading
        ? this.chart.showLoading("default", {
            text: "",
            lineWidth: 2,
          } as any)
        : this.chart.hideLoading();
      return;
    }
    this.loading ? this.chart.showLoading("default", this.loading) : this.chart.hideLoading();
  }
}
