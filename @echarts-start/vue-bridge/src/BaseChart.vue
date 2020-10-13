<template>
  <div ref="chartElement">BaseChart</div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { ECharts as IEChart } from "echarts";

@Component
export default class BaseChart extends Vue {
  @Prop() theme?: object | string;
  @Prop() opts?: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
  };
  @Prop() chartRef?: (chartRef: IEChart) => void;

  @Ref("chartElement")
  private readonly divRef!: HTMLDivElement;

  data(): { chart: IEChart | undefined } {
    return {
      chart: undefined,
    };
  }

  mounted() {
    console.log("@@@@@@@@@@@@@@mounted", this.divRef, this.theme, this.opts);
  }
}
</script>
