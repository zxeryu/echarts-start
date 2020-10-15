import { Component, InjectReactive, Prop, Vue, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
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

// @Component
// export class ChartMethods extends Vue {
//   @Prop() resize?: IChartMethodProps["resize"];
//   @Prop() loading?: IChartMethodProps["loading"];
//
//   render(createElement: CreateElement): VNode {
//     return createElement("div", {}, [
//       createElement(MethodLoading, { props: { loading: this.loading } }),
//       createElement(MethodResize, { props: { resize: this.resize } }),
//     ]);
//   }
// }

@Component
export class ChartMethodProps extends Vue {
  @Prop() resize?: IChartMethodProps["resize"];
  @Prop() loading?: IChartMethodProps["loading"];
}

@Component
export class ChartMethods extends mixins(MethodResize, MethodLoading) {}
