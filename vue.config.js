const path = require("path");

const resolve = (pathStr) => {
  return path.join(__dirname, pathStr);
};

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(js|mjs)$/,
          loader: "babel-loader",
          include: [resolve("src"), resolve("node_modules/element-plus")],
        },
      ],
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("svg-sprite-loader").loader("svg-sprite-loader").options({
      symbolId: "icon-[name]",
    });
  },
  pluginOptions: {
    electronBuilder: {
      preload: resolve("./server/preload.ts"),
      builderOptions: {
        extraResources: [
          {
            from: "./server/",
            to: "server/",
          },
          {
            from: "./constants/",
            to: "constants/",
          },
        ],
      },
    },
  },
};
