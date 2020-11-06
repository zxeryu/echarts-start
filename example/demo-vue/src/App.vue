<template>
  <div style="display: flex">
    <div style="display: flex; flex-direction: column; border-right: 1px solid #ccc; height: 100vh">
      <div style="cursor: pointer; padding: 0.2em 1em" @click="onMenuClick('BasicDemo')">BasicDemo</div>
      <div style="cursor: pointer; padding: 0.2em 1em" @click="onMenuClick('DatasetDemo')">DatasetDemo</div>
    </div>
    <div style="flex-grow: 1; height: 100vh; overflow: auto">
      <BasicDemo v-if="current === 'BasicDemo'" />
      <DatasetDemo v-if="current === 'DatasetDemo'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicDemo from "./component/BasicDemo.vue";
import DatasetDemo from "./component/DatasetDemo.vue";
@Component({
  components: { BasicDemo, DatasetDemo },
})
export default class App extends Vue {
  private current: string = "BasicDemo";

  data(): object {
    return {
      current: "BasicDemo",
    };
  }

  onMenuClick(key) {
    this.current = key;
  }
}
</script>
