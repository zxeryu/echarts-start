<template>
  <div>
    ChartDemo123
    <BaseChart />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseChart } from "@echarts-start/vue-bridge";

@Component({
  components: { BaseChart },
})
export default class ChartDemo extends Vue {}
</script>

<style scoped></style>
