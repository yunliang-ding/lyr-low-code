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
      file: "dist/index.esm.js",
      format: "esm",
    },
    {
      file: "dist/index.js",
      format: "cjs",
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
