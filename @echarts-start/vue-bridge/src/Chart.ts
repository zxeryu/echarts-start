import ECharts, { EChartOption, ECharts as IEChart } from "echarts";
import { assign, forEach, get, has, isArray, keys, map, omit, size, some, pick } from "lodash";
import { defineComponent, h, ref, provide, isRef, onMounted, toRaw } from "vue";
import { MethodLoading, MethodResize } from "./Method";
import { Extra, ExtraKeys } from "./Options";

let globalEcharts: typeof ECharts | undefined = undefined;

export const setECharts = (echarts: typeof ECharts) => {
  globalEcharts = echarts;
};

export const getECharts = (): typeof ECharts => {
  return globalEcharts || window.echarts;
};

const setOption = (chart: IEChart, option: EChartOption) => {
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
};

export const BaseChart = defineComponent((props, context) => {
  const divRef = ref<HTMLDivElement>();
  const chart = ref<IEChart>();
  //变量
  const calData: {
    xAxis: EChartOption[];
    yAxis: EChartOption[];
    grid: EChartOption[];
    isHaveGrid: boolean;
    list: EChartOption[];
  } = {
    xAxis: [],
    yAxis: [],
    grid: [],
    isHaveGrid: false,
    list: [],
  };

  const chartRef = get({ ...context.attrs, ...props }, "chartRef");

  onMounted(() => {
    const theme: any = get(context.attrs, "theme");
    const opts: any = get(context.attrs, "opts");
    chart.value = getECharts().init(divRef.value!, theme, opts);

    if (chartRef) {
      isRef(chartRef) && (chartRef.value = toRaw(chart.value));
      typeof chartRef === "function" && chartRef(toRaw(chart.value));
    }
  });

  const updateOptions = (option: EChartOption) => {
    const c = toRaw<IEChart>(chart.value!);

    if (get(context.attrs, "noCoordinate")) {
      setOption(c, option);
      return;
    }
    const oldOption = c.getOption();
    if (!has(oldOption, "xAxis") || !has(oldOption, "yAxis")) {
      if (has(option, "xAxis")) {
        //保存xAxis
        calData.xAxis.push(option);
        calData.isHaveGrid = calData.isHaveGrid || has(option, ["xAxis", "gridIndex"]);
      } else if (has(option, "yAxis")) {
        //保存第yAxis
        calData.yAxis.push(option);
        calData.isHaveGrid = calData.isHaveGrid || has(option, ["yAxis", "gridIndex"]);
      } else if (has(option, "grid")) {
        calData.grid.push(option);
      } else {
        //保存option
        calData.list.push(option);
      }

      let isPrepared = false;
      if (calData.isHaveGrid) {
        const xSize = size(calData.xAxis);
        if (xSize > 0 && xSize === size(calData.yAxis) && xSize === size(calData.grid)) {
          forEach(calData.xAxis, (_, i) => {
            c.setOption(assign({}, calData.xAxis[i], calData.yAxis[i], calData.grid[i]));
          });
          isPrepared = true;
        }
      } else {
        const xSize = size(calData.xAxis);
        if (xSize > 0 && xSize === size(calData.yAxis)) {
          forEach(calData.xAxis, (_, i) => {
            c.setOption(assign({}, calData.xAxis[i], calData.yAxis[i]));
          });
          isPrepared = true;
        }
      }

      if (isPrepared) {
        forEach(calData.list, (item) => {
          setOption(c, item);
        });
        calData.xAxis = [];
        calData.yAxis = [];
        calData.grid = [];
        calData.list = [];
      }
    } else {
      //更新options
      setOption(c, option);
    }
  };

  provide("updateOption", updateOptions);
  provide("chart", chart);

  return () => {
    return h("div", { ref: divRef }, chart.value && context.slots.default ? context.slots.default() : undefined);
  };
});

export const Chart = defineComponent({
  props: {
    loading: Boolean || Object,
    resize: Boolean || Object,
  },
  setup: (props, context) => {
    return () => {
      return h(BaseChart, { ...props, ...context.attrs }, [
        h(MethodResize, { resize: props.resize }),
        h(MethodLoading, { loading: props.loading }),
        h(Extra, { ...pick(context.attrs || [], ExtraKeys) }),
        context.slots.default ? context.slots.default() : undefined,
      ]);
    };
  },
});
