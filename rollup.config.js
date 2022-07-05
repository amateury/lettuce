import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external'
import pkg from "./package.json";

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      resolve(),
      typescript(),
      commonjs({ extensions: ['.js', '.ts'] })
    ]
  },
  {
    input: './src/index.cjs.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      }
    ],
    plugins: [
      external(),
      resolve(),
      typescript(),
      commonjs({ extensions: ['.js', '.ts'] })
    ]
  }
]