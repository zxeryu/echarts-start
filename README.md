基于 echarts 的 react, vue 桥接库.

> 集成各种 options；各种事件；以及 loading，resize 方法；(并不是一个完整的图表解决方案，仅仅桥接写法)

## Usage

### react

```
1、dependence
yarn add @echarts-start/react-bridge
2、use
<Chart
  style={{ width: "100%", height: 400 }}
  resize
  loading={loading}
  onChartClick={(e) => {
    console.log("click events=", e);
  }}>
  <XAxis type={"category"} />
  <YAxis />
  <Tooltip trigger={"axis"} />
  <Legend />
  <Series type={"line"} />
  <Series type={"line"} />
  <Series type={"line"} />
  <Dataset dimensions={dimensions} source={datasetData} />
</Chart>
```

[详细说明](https://github.com/zxeryu/echarts-start/tree/master/%40echarts-start/react-bridge)

### vue

```
1、dependence
yarn add @echarts-start/vue-bridge
2、use
<Chart
  style="width: 100%; height: 400px"
  backgroundColor="rgba(0,0,0,0.1)"
  :loading="loading"
  :resize="true"
  :onChartClick="handleChartClick"
>
  <XAxis type="category" />
  <YAxis />
  <Dataset :source="chartData" :dimensions="dimensions" />
  <Series type="line" />
  <Series type="line" />
  <Series type="line" />
  <Tooltip trigger="axis" />
  <Legend />
</Chart>
```

[详细说明](https://github.com/zxeryu/echarts-start/tree/master/%40echarts-start/vue-bridge)

## Demo (vue and react)

```shell script
$ git clone https://github.com/zxeryu/echarts-start
$ cd echarts-start
$ yarn install
//react demo
$yarn start
//vue demo
$yarn start-v
```
