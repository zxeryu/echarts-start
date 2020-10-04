import { EChartsLoadingOption, EChartsResizeOption } from "echarts";
import React, { useEffect } from "react";
import { useChartContext } from "./Chart";
import { debounce } from "lodash";

export const MethodResize = ({ resize }: { resize?: IChartMethodProps["resize"] }) => {
  const { chart } = useChartContext();
  useEffect(() => {
    const handler = debounce(() => {
      if (resize) {
        if (typeof resize === "boolean") {
          chart.resize();
        } else {
          chart.resize(resize);
        }
      }
    }, 300);

    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [chart, resize]);

  return null;
};

export const MethodLoading = ({ loading }: { loading?: IChartMethodProps["loading"] }) => {
  const { chart } = useChartContext();
  useEffect(() => {
    if (typeof loading === "boolean") {
      loading
        ? chart.showLoading("default", {
            text: "",
            lineWidth: 2,
          } as any)
        : chart.hideLoading();
      return;
    }
    loading ? chart.showLoading("default", loading) : chart.hideLoading();
  }, [chart, loading]);
  return null;
};

export interface IChartMethodProps {
  resize?: boolean | EChartsResizeOption;
  loading?: boolean | EChartsLoadingOption;
}

export const ChartMethods = ({ resize, loading }: IChartMethodProps) => {
  return (
    <>
      {resize && <MethodResize resize={resize} />}
      <MethodLoading loading={loading} />
    </>
  );
};
