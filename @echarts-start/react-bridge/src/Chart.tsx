import React, { createContext, HTMLAttributes, useCallback, useContext, useEffect, useRef, useState } from "react";
import ECharts, { ECharts as IEChart, EChartOption } from "echarts";
import { assign, has, forEach, noop, pick, omit, keys, size, get, isArray, some, map } from "lodash";
import { ChartMethods, IChartMethodProps } from "./Methods";
import { Extra, ExtraKeys, IExtraProps } from "./Options";
import { COLOR_PLATE_24 } from "./theme";

export interface IChartContext {
  chart: IEChart;
  updateOption: (option: EChartOption) => void;
}
const ChartContext = createContext<IChartContext>({
  chart: {} as any,
  updateOption: noop,
});

export const useChartContext = () => useContext(ChartContext);

let globalEcharts: typeof ECharts | undefined = undefined;

export const setECharts = (echarts: typeof ECharts) => {
  globalEcharts = echarts;
};

/**
 * 获取原始echarts对象
 * 现只兼容<script>标签引入方式
 */
export const getECharts = (): typeof ECharts => {
  return globalEcharts || window.echarts;
};

//fix color conflict
export interface IBaseChart extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  chartRef?: React.MutableRefObject<IEChart | undefined> | ((chartRef: IEChart) => void);
  //echarts init func
  theme?: object | string;
  opts?: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
  };
  noCoordinate?: boolean; //是否需要坐标轴
}

export const BaseChart = ({
  chartRef,
  //echarts init func
  theme,
  opts,
  noCoordinate = false,
  //
  children,
  //div
  ...otherProps
}: IBaseChart) => {
  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<{
    //初始options必须要有xAxis，yAxis（如果使用grid，那gird也是必须的）
    xAxis: EChartOption[]; //存储xAxis
    yAxis: EChartOption[]; //存储yAxis
    grid: EChartOption[]; //存储grid
    list: EChartOption[]; //存储在未添加xAxis，yAxis（grid）时的其他options
    isHaveGrid: boolean; //是否包含grid
    options: EChartOption; //真正的options对象， form chart.getOption
  }>({
    xAxis: [],
    yAxis: [],
    grid: [],
    list: [],
    isHaveGrid: false,
    options: {},
  });
  const [chart, setChart] = useState<IEChart>();

  useEffect(() => {
    if (ref.current && !chart) {
      const c = getECharts().init(ref.current, theme, opts);
      setChart(c);
      if (has(optionsRef.current.options, "xAxis") && has(optionsRef.current.options, "yAxis")) {
        c.setOption(optionsRef.current.options);
      }
    }
    return () => {
      if (chart) {
        optionsRef.current.options = chart.getOption();
        chart.clear();
      }
    };
  }, [ref, theme, opts]);

  useEffect(() => {
    if (!chart || !chartRef) {
      return;
    }
    if (typeof chartRef === "function") {
      chartRef(chart);
    }
    if (typeof chartRef !== "function") {
      chartRef.current = chart;
    }
  }, [chart]);

  /**
   * 如果内置了属性是没有id的；这时候根据uniqueId来区分；
   */
  const setOption = useCallback((chart: IEChart, option: EChartOption) => {
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
  }, []);

  /**
   * 借助每个option的‘id’属性通过setOption方法来merge options
   */
  const updateOption = useCallback(
    (option: EChartOption) => {
      if (!chart) {
        return;
      }
      //不需要坐标轴
      if (noCoordinate) {
        setOption(chart, option);
        return;
      }
      const oldOption = chart.getOption();
      if (!has(oldOption, "xAxis") || !has(oldOption, "yAxis")) {
        if (has(option, "xAxis")) {
          //保存xAxis
          optionsRef.current.xAxis.push(option);
          optionsRef.current.isHaveGrid = optionsRef.current.isHaveGrid || has(option, ["xAxis", "gridIndex"]);
        } else if (has(option, "yAxis")) {
          //保存第yAxis
          optionsRef.current.yAxis.push(option);
          optionsRef.current.isHaveGrid = optionsRef.current.isHaveGrid || has(option, ["yAxis", "gridIndex"]);
        } else if (has(option, "grid")) {
          optionsRef.current.grid.push(option);
        } else {
          //保存option
          optionsRef.current.list.push(option);
        }

        let isPrepared = false;

        if (optionsRef.current.isHaveGrid) {
          const xSize = size(optionsRef.current.xAxis);
          if (xSize > 0 && xSize === size(optionsRef.current.yAxis) && xSize === size(optionsRef.current.grid)) {
            forEach(optionsRef.current.xAxis, (_, i) => {
              chart.setOption(
                assign({}, optionsRef.current.xAxis[i], optionsRef.current.yAxis[i], optionsRef.current.grid[i]),
              );
            });
            isPrepared = true;
          }
        } else {
          const xSize = size(optionsRef.current.xAxis);
          if (xSize > 0 && xSize === size(optionsRef.current.yAxis)) {
            forEach(optionsRef.current.xAxis, (_, i) => {
              chart.setOption(assign({}, optionsRef.current.xAxis[i], optionsRef.current.yAxis[i]));
            });
            isPrepared = true;
          }
        }
        if (isPrepared) {
          forEach(optionsRef.current.list, (item) => {
            setOption(chart, item);
          });
          optionsRef.current.xAxis = [];
          optionsRef.current.yAxis = [];
          optionsRef.current.grid = [];
          optionsRef.current.list = [];
        }
      } else {
        //更新options
        setOption(chart, option);
      }

      // console.log("@@@@@@@@@@@@@@@", chart.getOption());
    },
    [chart],
  );

  return (
    <div ref={ref} {...otherProps}>
      {chart && <ChartContext.Provider value={{ chart, updateOption }}>{children}</ChartContext.Provider>}
    </div>
  );
};

export const Chart = ({
  //
  loading,
  resize,
  //
  children,
  //
  ...otherProps
}: IBaseChart & IChartMethodProps & IExtraProps) => {
  return (
    <BaseChart {...omit(otherProps, ExtraKeys)}>
      {children}
      <ChartMethods loading={loading} resize={resize} />
      <Extra color={COLOR_PLATE_24} {...pick(otherProps, ExtraKeys)} />
    </BaseChart>
  );
};
