import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pugPlugin from "vite-plugin-pug";
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from 'unplugin-element-plus/vite'
import { resolve } from "path";

const options = { pretty: true }; // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pugPlugin(options, locals),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    ElementPlus()
  ],
  resolve: {
    alias: [{
      find: '@',
      replacement: resolve(__dirname, 'src')
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
