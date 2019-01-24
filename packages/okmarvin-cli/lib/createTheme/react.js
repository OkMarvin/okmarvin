module.exports = function (name) {
  return `{
  "name": "${name}",
  "version": "1.0.0",
  "main": "build/manifest.json",
  "license": "MIT",
  "devDependencies": {
    "parcel-bundler": "^1.11.0",
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.2.3",
    "@babel/preset-react": "^7.0.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.2.0",
    "@babel/plugin-proposal-class-properties": "^7.2.3",
    "@okmarvin/markdown": "latest",
    "@okmarvin/okmarvin": "latest",
    "style-loader": "^0.23.0",
    "terser-webpack-plugin": "^1.2.0",
    "clean-webpack-plugin": "^1.0.0",
    "css-loader": "^2.0.2",
    "webpack": "^4.28.3",
    "webpack-cli": "^3.2.0",
    "webpack-manifest-plugin": "^2.0.4",
    "webpack-node-externals": "^1.6.0",
    "cssnano": "^4.1.0",
    "csso-webpack-plugin": "^1.0.0-beta.12",
    "autoprefixer": "^9.1.5",
    "postcss-loader": "^3.0.0",
    "mini-css-extract-plugin": "^0.5.0",
    "optimize-css-assets-webpack-plugin": "^5.0.1",
    "babel-loader": "^8.0.2",
    "chokidar": "^2.0.3",
    "connect-history-api-fallback": "^1.5.0",
    "express": "^4.16.4",
    "get-port": "^4.1.0"
  },
  "scripts": {
    "start": "node server.js",
    "build": "webpack --config webpack.prod.config.js"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ],
  "files": [
    "build"
  ]
}`
}
