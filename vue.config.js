const path = require('path')

const resolve = (pathStr) => {
  return path.join(__dirname, pathStr)
}

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        { 
          test: /\.(js|mjs)$/, loader: "babel-loader", include: [resolve('src'), resolve('node_modules/element-plus')]
        }
      ]
    }
  },
  pluginOptions: {
    electronBuilder: {
      preload: resolve('./server/preload.ts'),
      builderOptions: {
        extraResources: [{
          from: './server/',
          to: 'server/'
        }, {
          from: './constants/',
          to: 'constants/'
        }]
      }
    }
  }
}