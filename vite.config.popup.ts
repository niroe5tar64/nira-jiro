import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig(() => {
  return {
    build: {
      outDir: "dist",
      rollupOptions: {
        input: { popup: path.resolve(__dirname, "src/extension/popup.ts") },
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "[name].css",
        },
      },
      emptyOutDir: false,
      target: "esnext",
      polyfillDynamicImport: false,
    },
    css: {
      postcss: "./postcss.config.js",
    },
    resolve: {
      alias: {
        "~/components": path.resolve(__dirname, "./src/components"),
        "~/dom": path.resolve(__dirname, "./src/dom"),
        "~/features": path.resolve(__dirname, "./src/features"),
        "~/hooks": path.resolve(__dirname, "./src/components/hooks"),
        "~/types": path.resolve(__dirname, "./src/types"),
        "~/utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    plugins: [solidPlugin()],
  };
});
