
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  vite: {
    // Add topLevelAwait support for the wasm plugin
    build: {
      target: "esnext",
    },
    plugins: [
      wasm(),
    ],
  },
});

