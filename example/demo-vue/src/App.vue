<template>
  <div>
    content
    <ChartDemo />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartDemo from "./ChartDemo.vue";
@Component({
  components: { ChartDemo },
})
export default class App extends Vue {}
</script>

<style scoped></style>
