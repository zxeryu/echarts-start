import { ECharts as IEChart, EChartsLoadingOption, EChartsResizeOption } from "echarts";
import { debounce, get } from "lodash";
import { defineComponent, onMounted, onBeforeUnmount, inject, Ref, watchEffect } from "vue";

interface IResizeProps {
  resize?: boolean | EChartsResizeOption;
}

export const MethodResize = defineComponent({
  props: {
    resize: Boolean || Object,
  },
  setup: (props: IResizeProps, context) => {
    const chart = inject<Ref<IEChart>>("chart")!;

    const resize = get({ ...context.attrs, ...props }, "resize");

    const handleResize = debounce(() => {
      if (!resize) return;
      if (typeof resize === "boolean") {
        chart.value.resize();
      } else {
        chart.value.resize(resize);
      }
    }, 300);

    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });
  },
});

interface ILoadingProps {
  loading?: boolean | EChartsLoadingOption;
}

export const MethodLoading = defineComponent({
  props: {
    loading: Boolean || Object,
  },
  setup: (props: ILoadingProps) => {
    const chart = inject<Ref<IEChart>>("chart")!;

    watchEffect(() => {
      const loading = props.loading;
      if (typeof loading === "undefined") return;
      if (typeof loading === "boolean") {
        loading ? chart.value.showLoading("default", { text: "", lineWidth: 2 }) : chart.value.hideLoading();
        return;
      }
      loading ? chart.value.showLoading("default", loading) : chart.value.hideLoading();
    });
  },
});
