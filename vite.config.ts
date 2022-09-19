import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

export default defineConfig({
  resolve: {
    alias: {
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      util: "rollup-plugin-node-polyfills/polyfills/util",
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      stream: "vite-compatible-readable-stream",
      _stream_duplex: "vite-compatible-readable-stream/lib/_stream_uplex",
      _stream_passthrough:
        "vite-compatible-readable-stream/lib/_stream_passthrough",
      _stream_readable: "vite-compatible-readable-stream/lib/_stream_readable",
      _stream_writable: "vite-compatible-readable-stream/lib/_stream_writable",
      _stream_transform:
        "vite-compatible-readable-stream/lib/_stream_transform",
    },
  },
  plugins: [
    peerDepsExternal(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ooui",
      formats: ["es", "umd"],
      fileName: (format) => `ooui.${format}.js`,
    },
    rollupOptions: {
      external: ["moment"],
      plugins: [rollupNodePolyFill() as any],
    },
  },
});
