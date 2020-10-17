import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import vue from "rollup-plugin-vue";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        entryFileNames: "[name].es.js",
        chunkFileNames: "[name]-[hash].es.js",
      },
    ],
    plugins: [
      resolve({
        extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx", ".vue"],
      }),
      vue(),
      babel({
        configFile: "../../babel.config.json",
        babelHelpers: "bundled",
        extensions: [".ts", ".tsx", ".mjs", ".js", ".jsx", ".vue"],
      }),
    ],
    external: ["lodash", "vue"],
  },
  {
    input: "../../.tmp/@echarts-start/vue-bridge/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
