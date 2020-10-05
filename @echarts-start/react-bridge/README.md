# `react-bridge`

> 集成各种 options；各种事件；以及 loading，resize 方法；

## Demo1

> 基础使用

```
const data = [
  { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
  { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
  { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
  { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
];

const Demo1 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div style={{ textAlign: "center" }}>
      <a href={"#"} onClick={() => setLoading((prevState) => !prevState)}>
        toggle loading
      </a>
      <Chart
        style={{ width: "100%", height: 400 }}
        resize
        loading={loading}
        onChartClick={(e) => {
          console.log("click event=", e);
        }}>
        <XAxis type={"category"} />
        <YAxis />
        <Tooltip trigger={"axis"} />
        <Legend />
        <Series type={"line"} />
        <Series type={"line"} />
        <Series type={"line"} />
        <Dataset dimensions={dimensions} source={data} />
      </Chart>
    </div>
  );
};
```

## Demo2

> 操作 chart 对象

```$xslt
const Demo2 = () => {
  return (
    <Chart
      style={{ width: "100%", height: 400 }}
      chartRef={(chart) => {
        chart.setOption({
          legend: {},
          tooltip: { trigger: "axis" },
          xAxis: { type: "category" },
          yAxis: {},
          series: [{ type: "line" }, { type: "line" }, { type: "line" }],
          dataset: { dimensions, source: data },
        });
      }}
    />
  );
};
```
