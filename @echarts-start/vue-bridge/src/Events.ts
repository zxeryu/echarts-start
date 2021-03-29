import { ECharts as IEChart } from "echarts";
import { defineComponent, onMounted, onBeforeUnmount, inject, Ref } from "vue";
import { get } from "lodash";

export const Event = defineComponent((props, context) => {
  const chart = inject<Ref<IEChart>>("chart")!;

  const eventName = get({ ...props, ...context.attrs }, "eventName");
  const query = get({ ...props, ...context.attrs }, "query");
  const handler: Function | undefined = get({ ...props, ...context.attrs }, "handler");

  const handleEvent = (e: any) => {
    handler && handler(e);
  };

  onMounted(() => {
    if (eventName) {
      if (query) {
        chart.value.on(eventName, query, handleEvent);
      } else {
        chart.value.on(eventName, handleEvent);
      }
    }
  });
  onBeforeUnmount(() => {
    eventName && chart.value.off(eventName, handleEvent);
  });
});
