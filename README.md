# Minimal reproducible Webpack 5 breakage

Flip the switch between `hot: true` and `hot: false` in `webpack.config.js`’ `devServer` options;

- `true` yields “Uncaught (in promise) TypeError: Cannot read property 'call' of undefined”
- `false` yields “Uncaught (in promise) TypeError: __webpack_modules__[moduleId] is not a function”

## Try it for yourself

1. `yarn`
1. `yarn dev`