import { useChartContext } from "./Chart";
import { useEffect } from "react";

export interface IChartMouseEvent {
  // 当前点击的图形元素所属的组件名称，
  // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
  componentType: string;
  // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
  seriesType?: string;
  // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
  seriesIndex?: number;
  // 系列名称。当 componentType 为 'series' 时有意义。
  seriesName?: string;
  // 数据名，类目名
  name: string;
  // 数据在传入的 data 数组中的 index
  dataIndex: number;
  // 传入的原始数据项
  data: object;
  // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
  // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
  // 其他大部分图表中只有一种 data，dataType 无意义。
  dataType: string;
  // 传入的数据值
  value: number | number[];
  // 数据图形的颜色。当 componentType 为 'series' 时有意义。
  color: string;
  // 用户自定义的数据。只在 graphic component 和自定义系列（custom series）
  // 中生效，如果节点定义上设置了如：{type: 'circle', info: {some: 123}}。
  info: any;
}

export interface ILegendEvent {
  type: string;
  // 切换的图例名称
  name?: string;
  // 所有图例的选中状态表
  selected: object;
}

export interface IDataZoomEvent {
  type: "datazoom";
  // 缩放的开始位置的百分比，0 - 100
  start: number;
  // 缩放的结束位置的百分比，0 - 100
  end: number;
  // 缩放的开始位置的数值，只有在工具栏的缩放行为的事件中存在。
  startValue?: number;
  // 缩放的结束位置的数值，只有在工具栏的缩放行为的事件中存在。
  endValue?: number;
}

export interface ISeriesEvent {
  type: string;
  // 系列 ID，可以在 option 中传入
  seriesId: string;
  // 数据名称
  name: string;
  // 所有数据的选中状态表。
  selected: object;
}

export interface IChartEvent {
  //mouse
  click: IChartMouseEvent;
  dblclick: IChartMouseEvent;
  mousedown: IChartMouseEvent;
  mousemove: IChartMouseEvent;
  mouseup: IChartMouseEvent;
  mouseover: IChartMouseEvent;
  mouseout: IChartMouseEvent;
  globalout: IChartMouseEvent;
  contextmenu: IChartMouseEvent;
  //legend
  legendselectchanged: ILegendEvent;
  legendselected: ILegendEvent;
  legendunselected: ILegendEvent;
  legendselectall: ILegendEvent;
  legendinverseselect: ILegendEvent;
  legendscroll: { type: ILegendEvent["type"]; scrollDataIndex: number; legendId: string };

  datazoom: IDataZoomEvent;
  datarangeselected: { type: "datarangeselected"; selected: object | object[] };
  timelinechanged: {
    type: "timelinechanged";
    // 时间点的 index
    currentIndex: number;
  };
  timelineplaychanged: {
    type: "timelineplaychanged";
    // 播放状态，true 为自动播放
    playState: boolean;
  };
  restore: { type: "restore" };
  dataviewchanged: { type: "dataviewchanged" };
  magictypechanged: {
    type: "magictypechanged";
    // 点击切换的当前类型，同 echarts 2.x 中的 type 属性
    currentType: string;
  };
  geoselectchanged: ISeriesEvent;
  geoselected: ISeriesEvent;
  geounselected: ISeriesEvent;
  pieselectchanged: ISeriesEvent;
  pieselected: ISeriesEvent;
  pieunselected: ISeriesEvent;
  mapselectchanged: ISeriesEvent;
  mapselected: ISeriesEvent;
  mapunselected: ISeriesEvent;

  axisareaselected: undefined;
  focusnodeadjacency: undefined;
  unfocusnodeadjacency: undefined;
  brush: undefined;
  brushEnd: undefined;
  brushselected: any;
  globalcursortaken: undefined;
  rendered: undefined;
  finished: undefined;
}

export const Event = <T extends keyof IChartEvent>({
  eventName,
  eventHandler,
}: {
  eventName: T;
  eventHandler?: (_: IChartEvent[T]) => void;
}) => {
  const { chart } = useChartContext();
  useEffect(() => {
    const handler = (e: any) => {
      eventHandler && eventHandler(e);
    };
    chart.on(eventName, handler);
    return () => {
      chart.off(eventName, handler);
    };
  }, [chart]);
  return null;
};
