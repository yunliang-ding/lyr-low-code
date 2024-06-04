import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import less from "rollup-plugin-less";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import replace from "rollup-plugin-replace";

const env = process.env.NODE_ENV;

export default defineConfig({
  input: "./src/index.ts",
  output: [
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "lyrLowCode",
      globals: {
        react: "React",
        html2canvas: "html2canvas",
        jszip: "JSZip",
        "axios": 'axios',
        "react-dom": "ReactDOM",
        '@arco-design/web-react': 'arco',
        '@arco-design/web-react/icon': 'arcoicon',
        "react/jsx-runtime": "jsxRuntime",
        "lyr-component": "lyr",
        "lyr-code-editor": "lyrCodeEditor",
      },
    },
  ],
  plugins: [
    json(),
    resolve(),
    external(),
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
    less({
      insert: true,
      output: "dist/index.min.css",
      option: {
        compress: true,
      },
    }),
    terser(),
    typescript({
      compilerOptions: {
        lib: ["es6", "dom", "es2021"],
        target: "es2016",
        module: "esnext",
        esModuleInterop: true,
        moduleResolution: "node",
        declaration: true,
        jsx: "react-jsx",
        strict: false,
        sourceMap: false,
        skipLibCheck: true,
        outDir: "./dist",
      },
      include: ["src/**/*"],
      exclude: ["node_modules/**/*"],
    }),
  ],
});