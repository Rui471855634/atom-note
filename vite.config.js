import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pugPlugin from "vite-plugin-pug";
import ElementPlus from 'unplugin-element-plus/vite'
import path from "path";

const resolve = (pathStr) => {
  return path.join(__dirname, pathStr)
}

const options = { pretty: true }; // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pugPlugin(options, locals),
    ElementPlus()
  ],
  resolve: {
    alias: [{
      find: '@',
      replacement: resolve('src')
    }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/style/element-overrides.scss';`,
      }
    }
  }
});
