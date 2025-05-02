import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteStaticCopy } from "vite-plugin-static-copy";
import fs from "node:fs";
import path from "node:path";

export default defineConfig(({ mode }) => {
  // .env 読み込み
  const env = loadEnv(mode, path.resolve(__dirname, "."));
  const JIRA_DOMAIN = env.VITE_JIRA_DOMAIN;
  if (!JIRA_DOMAIN) throw new Error("VITE_JIRA_DOMAIN is not set in .env");

  // manifest テンプレートを読み込んで埋め込む
  const manifestTemplate = fs.readFileSync("public/manifest.template.json", "utf8");
  const manifestContent = manifestTemplate.replace("{{JIRA_DOMAIN}}", JIRA_DOMAIN);
  fs.writeFileSync("public/manifest.json", manifestContent); // viteStaticCopy が拾えるように保存

  return {
    build: {
      outDir: "dist",
      rollupOptions: {
        input: { content: path.resolve(__dirname, "src/extension/content.ts") },
        output: {
          format: "iife",
          entryFileNames: "[name].js",
          assetFileNames: "[name].css",
        },
      },
      emptyOutDir: true,
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
    plugins: [
      solidPlugin(),
      viteStaticCopy({
        targets: [
          { src: "public/manifest.json", dest: "." },
          { src: "icons", dest: "." },
        ],
      }),
    ],
  };
});
