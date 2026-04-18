
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import wasm from "vite-plugin-wasm"; // Import the wasm plugin

export default defineConfig({
  vite: {
    plugins: [
      wasm(), // Add the wasm plugin here
    ],
  },
});
