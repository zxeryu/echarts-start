import React, { useState } from "react";
import { map, get } from "lodash";
import { BasicDemo } from "./component/BasicDemo";
import { DatasetDemo } from "./component/DatasetDemo";

const ViewMap = {
  BasicDemo: BasicDemo,
  DatasetDemo: DatasetDemo,
};

const Menu = ({ current, setCurrent }: { current: string; setCurrent: (c: string) => void }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid #ccc", height: "100vh" }}>
      {map(ViewMap, (_, k) => {
        return (
          <div
            key={k}
            style={{
              cursor: "pointer",
              color: k === current ? "blue" : "#333",
              padding: ".2em 1em",
            }}
            onClick={() => {
              setCurrent(k);
            }}>
            {k}
          </div>
        );
      })}
    </div>
  );
};

const Content = ({ current }: { current: string }) => {
  const V = get(ViewMap, current);
  return <div style={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>{V ? <V /> : null}</div>;
};

export const ChartDemo = () => {
  const [current, setCurrent] = useState<string>("BasicDemo");
  return (
    <div style={{ display: "flex" }}>
      <Menu current={current} setCurrent={setCurrent} />
      <Content current={current} />
    </div>
  );
};
