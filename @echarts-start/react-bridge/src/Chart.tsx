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

/**
 * 获取原始echarts对象
 * 现只兼容<script>标签引入方式
 */
export const getECharts = (): typeof ECharts => {
  return window.echarts;
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
}

export const BaseChart = ({
  chartRef,
  //echarts init func
  theme,
  opts,
  //
  children,
  //div
  ...otherProps
}: IBaseChart) => {
  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<{
    //为了解决options不存在xAxis或yAxis时侯的报错问题
    xAxis: EChartOption | undefined; //存储添加的第一个xAxis
    yAxis: EChartOption | undefined; //存储添加的第一个yAxis
    list: EChartOption[]; //存储在未添加xAxis和yAxis时的其他options
    options: EChartOption; //真正的options对象， form chart.getOption
  }>({
    xAxis: undefined,
    yAxis: undefined,
    list: [],
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
      const oldOption = chart.getOption();
      if (!has(oldOption, "xAxis") || !has(oldOption, "yAxis")) {
        if (!optionsRef.current.xAxis && has(option, "xAxis")) {
          //保存第一个xAxis
          optionsRef.current.xAxis = option;
        } else if (!optionsRef.current.yAxis && has(option, "yAxis")) {
          //保存第一个yAxis
          optionsRef.current.yAxis = option;
        } else {
          //保存option
          optionsRef.current.list.push(option);
        }
        if (optionsRef.current.xAxis && optionsRef.current.yAxis) {
          chart.setOption(assign(optionsRef.current.xAxis, optionsRef.current.yAxis));
          forEach(optionsRef.current.list, (item) => {
            setOption(chart, item);
          });
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
