const path = require('path')

const resolve = (pathStr) => {
  return path.join(__dirname, pathStr)
}

module.exports = {
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