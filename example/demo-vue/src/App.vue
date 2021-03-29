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
import { defineComponent, ref } from "vue";
import BasicDemo from "./components/BasicDemo.vue";
import DatasetDemo from "./components/DatasetDemo.vue";
export default defineComponent({
  name: "App",
  components: {
    BasicDemo,
    DatasetDemo,
  },
  setup: () => {
    const current = ref("BasicDemo");

    const onMenuClick = (c: string) => {
      current.value = c;
    };

    return {
      current,
      onMenuClick,
    };
  },
});
</script>

<style scoped></style>
