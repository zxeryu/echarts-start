import { Component, InjectReactive, Prop, Vue } from "vue-property-decorator";
import { CreateElement, VNode } from "vue";
import { ECharts as IEChart } from "echarts";
import { map } from "lodash";

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

@Component
export class Event extends Vue {
  @InjectReactive() chart!: IEChart;

  @Prop() eventName!: keyof IChartEvent;
  @Prop() eventHandler?: (_: any) => void;

  mounted(): void {
    this.chart.on(this.eventName, this.handleEvent);
  }

  beforeDestroy(): void {
    this.chart.off(this.eventName, this.handleEvent);
  }

  handleEvent(e: any) {
    this.eventHandler && this.eventHandler(e);
  }

  render(createElement: CreateElement): VNode {
    return createElement("");
  }
}

export const EventFuncKeyMap = {
  onChartClick: "click",
  onChartDbClick: "dblclick",
  onChartMouseDown: "mousedown",
  onChartMouseMove: "mousemove",
  onChartMouseUp: "mouseup",
  onChartMouseOver: "mouseover",
  onChartMouseOut: "mouseout",
  onChartGlobalOut: "globalout",
  onChartContextMenu: "contextmenu",
  onLegendSelectChanged: "legendselectchanged",
  onLegendSelected: "legendselected",
  onLegendUnSelected: "legendunselected",
  onLegendSelectAll: "legendselectall",
  onLegendInverseSelect: "legendinverseselect",
  onLegendScroll: "legendscroll",
  onDataZoom: "datazoom",
  onDataRangeSelected: "datarangeselected",
  onTimelineChanged: "timelinechanged",
  onTimelinePlayChanged: "timelineplaychanged",
  onRestore: "restore",
  onDataViewChanged: "dataviewchanged",
  onMagicTypeChanged: "magictypechanged",
  onGeoSelectChanged: "geoselectchanged",
  onGeoSelected: "geoselected",
  onGeoUnSelected: "geounselected",
  onPieSelectChanged: "pieselectchanged",
  onPieSelected: "pieselected",
  onPieUnSelected: "pieunselected",
  onMapSelectChanged: "mapselectchanged",
  onMapSelected: "mapselected",
  onMapUnSelected: "mapunselected",
  onAxisAreaSelected: "axisareaselected",
  onFocusNodeAdjacency: "focusnodeadjacency",
  onUnFocusNodeAdjacency: "unfocusnodeadjacency",
  onBrush: "brush",
  onBrushEnd: "brushEnd",
  onBrushSelected: "brushselected",
  onGlobalCursorTaken: "globalcursortaken",
  onRendered: "rendered",
  onFinished: "finished",
};

export const EventFuncKeys = map(EventFuncKeyMap, (_, k) => k);

@Component
export class ChartEventsProps extends Vue {
  //mouse
  @Prop() onChartClick?: (e: IChartMouseEvent) => void;
  @Prop() onChartDbClick?: (e: IChartMouseEvent) => void;
  @Prop() onChartMouseDown?: (e: IChartMouseEvent) => void;
  @Prop() onChartMouseMove?: (e: IChartMouseEvent) => void;
  @Prop() onChartMouseUp?: (e: IChartMouseEvent) => void;
  @Prop() onChartMouseOver?: (e: IChartMouseEvent) => void;
  @Prop() onChartMouseOut?: (e: IChartMouseEvent) => void;
  @Prop() onChartGlobalOut?: (e: IChartMouseEvent) => void;
  @Prop() onChartContextMenu?: (e: IChartMouseEvent) => void;
  //
  @Prop() onLegendSelectChanged?: (e: ILegendEvent) => void;
  @Prop() onLegendSelected?: (e: ILegendEvent) => void;
  @Prop() onLegendUnSelected?: (e: ILegendEvent) => void;
  @Prop() onLegendSelectAll?: (e: ILegendEvent) => void;
  @Prop() onLegendInverseSelect?: (e: ILegendEvent) => void;
  @Prop() onLegendScroll?: (e: IChartEvent["legendscroll"]) => void;
  //
  @Prop() onDataZoom?: (e: IDataZoomEvent) => void;
  @Prop() onDataRangeSelected?: (e: IChartEvent["datarangeselected"]) => void;
  @Prop() onTimelineChanged?: (e: IChartEvent["timelinechanged"]) => void;
  @Prop() onTimelinePlayChanged?: (e: IChartEvent["timelineplaychanged"]) => void;
  @Prop() onRestore?: (e: IChartEvent["restore"]) => void;
  @Prop() onDataViewChanged?: (e: IChartEvent["dataviewchanged"]) => void;
  @Prop() onMagicTypeChanged?: (e: IChartEvent["magictypechanged"]) => void;
  //
  @Prop() onGeoSelectChanged?: (e: ISeriesEvent) => void;
  @Prop() onGeoSelected?: (e: ISeriesEvent) => void;
  @Prop() onGeoUnSelected?: (e: ISeriesEvent) => void;
  @Prop() onPieSelectChanged?: (e: ISeriesEvent) => void;
  @Prop() onPieSelected?: (e: ISeriesEvent) => void;
  @Prop() onPieUnSelected?: (e: ISeriesEvent) => void;
  @Prop() onMapSelectChanged?: (e: ISeriesEvent) => void;
  @Prop() onMapSelected?: (e: ISeriesEvent) => void;
  @Prop() onMapUnSelected?: (e: ISeriesEvent) => void;
  //
  @Prop() onAxisAreaSelected?: () => void;
  @Prop() onFocusNodeAdjacency?: () => void;
  @Prop() onUnFocusNodeAdjacency?: () => void;
  @Prop() onBrush?: () => void;
  @Prop() onBrushEnd?: () => void;
  @Prop() onBrushSelected?: (e: any) => void;
  @Prop() onGlobalCursorTaken?: (e: any) => void;
  @Prop() onRendered?: () => void;
  @Prop() onFinished?: () => void;
}
